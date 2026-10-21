#requires -Version 5.1
[CmdletBinding()]
param(
  [switch]$Reanalyze
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$fixture = Join-Path $root 'fixtures\solar-quote-demo'
$outDir = Join-Path $root 'evidence\local'
$evidenceFile = Join-Path $outDir 'solar-quote-demo.evidence.json'
$requestFile = Join-Path $outDir 'solar-quote-demo.summary-request.json'
$summaryFile = Join-Path $outDir 'solar-quote-demo.summary.json'
$analysisErrorFile = Join-Path $outDir 'solar-quote-demo.analysis.stderr.log'
$summaryErrorFile = Join-Path $outDir 'solar-quote-demo.summary.stderr.log'
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

if (-not (Test-Path -LiteralPath $fixture -PathType Container)) {
  throw "Missing OWN test fixture: $fixture"
}

$nodeCmd = Get-Command node.exe -ErrorAction SilentlyContinue
if (-not $nodeCmd) { throw 'Node.js is not available in PATH.' }
$npmRoot = (& npm root -g | Select-Object -First 1).Trim()
$reaEntry = Join-Path $npmRoot 'rea-agents\scripts\rea.mjs'
if (-not (Test-Path -LiteralPath $reaEntry -PathType Leaf)) {
  throw "REA entrypoint not found: $reaEntry. Check npm global installation."
}

New-Item -ItemType Directory -Force -Path $outDir | Out-Null

# Capture stdout/stderr AS FILE BYTES, not through the Windows PowerShell 5.1
# text pipeline; non-ASCII Evidence may otherwise be transcoded and fail its hash.
function Invoke-ReaToFiles {
  param(
    [Parameter(Mandatory=$true)][string[]]$ReaArgs,
    [Parameter(Mandatory=$true)][string]$OutPath,
    [Parameter(Mandatory=$true)][string]$ErrPath
  )
  $quoted = @($reaEntry) + $ReaArgs | ForEach-Object {
    '"' + $_.Replace('"', '\"') + '"'
  }
  $argLine = $quoted -join ' '
  $process = Start-Process -FilePath $nodeCmd.Source -ArgumentList $argLine `
    -Wait -PassThru -NoNewWindow `
    -RedirectStandardOutput $OutPath -RedirectStandardError $ErrPath

  if ($process.ExitCode -ne 0) {
    Write-Host "[ORBI] REA failed with exit code: $($process.ExitCode)" -ForegroundColor Red
    Write-Host "[ORBI] stdout: $OutPath"
    Write-Host "[ORBI] stderr: $ErrPath"
    if (Test-Path -LiteralPath $OutPath) {
      Write-Host '[ORBI] Last stdout lines:'
      Get-Content -LiteralPath $OutPath -Encoding UTF8 -Tail 25 | ForEach-Object { Write-Host $_ }
    }
    if (Test-Path -LiteralPath $ErrPath) {
      Write-Host '[ORBI] Last stderr lines:'
      Get-Content -LiteralPath $ErrPath -Encoding UTF8 -Tail 25 | ForEach-Object { Write-Host $_ }
    }
    throw "REA command failed (exit $($process.ExitCode)); see diagnostic files above."
  }
}

if ($Reanalyze -or -not (Test-Path -LiteralPath $evidenceFile -PathType Leaf)) {
  Write-Host "[ORBI] Static analysis of OWN fixture only: $fixture"
  Invoke-ReaToFiles -ReaArgs @('analyze-javascript-application', $fixture, '--json') `
    -OutPath $evidenceFile -ErrPath $analysisErrorFile
} else {
  Write-Host "[ORBI] Reusing existing Evidence (no reanalysis): $evidenceFile"
}
if (-not (Test-Path -LiteralPath $evidenceFile -PathType Leaf)) {
  throw 'REA did not create an Evidence document.'
}
$evidenceText = [System.IO.File]::ReadAllText($evidenceFile, [Text.Encoding]::UTF8)
$evidence = $evidenceText | ConvertFrom-Json
if (-not $evidence.evidence_id) {
  throw "Evidence missing evidence_id. Examine $evidenceFile before asserting success."
}
Write-Host "[ORBI] Full Evidence saved: $evidenceFile"
Write-Host "[ORBI] Evidence ID: $($evidence.evidence_id)"

# IMPORTANT: rea-agents 6.7.0 accepts only "inline" and "retained-evidence"
# source.kind values for inspect-analysis-view. The newer "evidence-file" type
# is NOT in the 6.7.0 release (it exists in newer upstream code).
# Preserve the canonical Evidence JSON without PowerShell object reserialization.
# This is suitable for our small, owned fixture. Large production Evidence
# should be projected through MCP session retention or a compatible REA release.
$request = '{"source":{"kind":"inline","evidence":' + $evidenceText.Trim() + '},"view":{"kind":"summary"}}'
[System.IO.File]::WriteAllText($requestFile, $request, $utf8NoBom)

Write-Host '[ORBI] Projecting summary from saved Evidence ...'
Invoke-ReaToFiles -ReaArgs @('inspect-analysis-view', $requestFile, '--json') `
  -OutPath $summaryFile -ErrPath $summaryErrorFile
$summaryText = [System.IO.File]::ReadAllText($summaryFile, [Text.Encoding]::UTF8)
if ([string]::IsNullOrWhiteSpace($summaryText)) {
  throw "REA returned empty summary. Inspect $summaryErrorFile"
}
$summary = $summaryText | ConvertFrom-Json
if ($summary.PSObject.Properties.Name -contains 'error') {
  throw "REA returned a summary error: $($summary.error). Inspect $summaryFile"
}
if ($summary.PSObject.Properties.Name -notcontains 'evidence_id') {
  Write-Warning 'Summary parsed but did not include evidence_id: review schema before certifying it.'
}
Write-Host "[ORBI] Summary saved: $summaryFile" -ForegroundColor Green
Write-Host "[ORBI] Evidence SHA256: $((Get-FileHash -LiteralPath $evidenceFile -Algorithm SHA256).Hash)"
Write-Host '[ORBI] REA 6.7.0 CLI analysis and summary succeeded. MCP application analysis requires independent verification.'
