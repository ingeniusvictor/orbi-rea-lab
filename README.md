# ORBI REA LAB

Laboratorio de ingeniería inversa **autorizada** para ORBI Ecosystem. Este repositorio no es un fork de REA ni incluye su código fuente; utiliza una instalación independiente de [`rea-agents`](https://github.com/morluto/rea) (MIT, © autores originales) a través de CLI/MCP.

## Estado inicial

- Plataforma comprobada por el operador: Windows x64, Node 26.7.0, REA 6.7.0, Codex MCP y skill configurados.
- `binary_session({})`: invocación confirmada por el operador.
- Pendiente: primer análisis real de aplicación. Este starter aporta una aplicación JavaScript propia, pruebas y una rutina de evidencia. **El starter no demuestra por sí solo que REA haya analizado correctamente el archivo en tu máquina.**
- El motor REA es una dependencia local externa; **no lo publiques ni lo copies** en este repositorio.

## Inicio en Windows PowerShell

Descomprime este directorio fuera de `C:\Windows`, preferiblemente bajo `%USERPROFILE%\orbi-projects\orbi-rea-lab`.

```powershell
cd "$HOME\orbi-projects\orbi-rea-lab"
node --version
rea --help
node --test .\fixtures\solar-quote-demo\test\quote.test.js
.\scripts\smoke-rea.ps1
```

Si la política de ejecución bloquea **este script local que has revisado**, ejecuta de forma puntual `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\smoke-rea.ps1`; no cambies la política global.

## Qué hace la prueba

1. Ejecuta pruebas unitarias Node sobre cálculos **demostrativos** de un sistema solar (no válidos para cotizaciones reales).
2. Inspecciona **solo** el directorio local `fixtures/solar-quote-demo` con `rea analyze-javascript-application --json`, sin ejecutar la aplicación objetivo.
3. Guarda el Evidence original y una proyección de resumen bajo `evidence/local/`, excluidos de Git.
4. Muestra identificador Evidence, tamaño y huella SHA-256. Comprueba el resultado y sus limitaciones antes de usarlo como conclusión.

En caso de error en CLI, el script detiene el proceso y no declara éxito.

## Primer trabajo desde Codex

Abrir este proyecto en Codex. Solicitar la herramienta `analyze_javascript_application` con `input_path` absoluto al directorio `fixtures/solar-quote-demo`, `format: "directory"`, `integrity_policy: "fail"`, `detail: "summary"`. Después solicitar `inspect_analysis_view` usando el `parent_evidence_id` devuelto; registrar módulos, rutas y limitaciones realmente observadas. No afirmar haber usado MCP si solo se empleó CLI.

## Carpetas

- `fixtures/`: material propio y seguro de prueba.
- `scripts/`: diagnóstico y smoke test local.
- `evidence/`: resultados brutos **privados** y excluidos de Git.
- `reports/`: informes manualmente revisados, sin secretos ni datos privados.
- `docs/`: arquitectura, seguridad y plan de integración.
- `AGENTS.md`: instrucciones y límites para agentes.

## Publicación privada en GitHub

El directorio entregado es un **starter local**, no un repositorio GitHub creado. Después de revisar los archivos y confirmar las pruebas, se puede publicar en privado:

```powershell
git init -b main
git add .
git commit -m "chore: bootstrap ORBI REA LAB"
gh repo create ingeniusvictor/orbi-rea-lab --private --source . --remote origin --push
```

No publiques evidencias generadas, APK de terceros, cookies, credenciales, archivos `.env` ni datos internos. Antes de crear el repositorio, comprueba con `git status --short` qué se va a incluir. Si el repositorio ya existe, no repitas el comando de creación.

## Dependencias futuras

- **Web/JavaScript:** ya anunciado en REA y listo para probar con la muestra local.
- **Android:** JADX MCP 0.7.1, Apktool/ADB según operación, Java verificado.
- **PE nativo Windows:** Ghidra 12.1.x + JDK compatible, instalación aislada.
- **Vercel:** en una fase posterior alojará interfaz/API; los procesos nativos de análisis seguirán en un worker local controlado.

La documentación de REA se actualiza: https://github.com/morluto/rea/blob/main/docs/installation.md
