# ORBI REA LAB

Laboratorio de ingeniería inversa **autorizada** de ORBI Ecosystem.

Este repositorio utiliza [REA / `rea-agents`](https://github.com/morluto/rea) como herramienta CLI/MCP instalada **fuera del repositorio**; no copia ni distribuye el motor original. Licencia de REA: MIT, con condiciones y licencias de terceros independientes.

## Estado verificado

- **REA 6.7.0**: operador confirmó instalación Windows x64, `doctor` en verde y `binary_session({})` mediante Codex MCP.
- **Fixture solar**: 4 pruebas Node aprobadas. Smoke CLI y resumen de Evidence finalizados localmente con `scripts/smoke-rea.ps1` v0.1.2.
- **Validación MCP**: 18/18 entradas y 10 relaciones seleccionadas coincidentes con CLI; relaciones inferidas estáticamente, no observaciones de ejecución.
- **GitHub**: primer commit `075a30f`; pruebas sintéticas de CI aprobadas.
- **P3**: dashboard Next.js **estático y sintético**. No contiene casos reales, no accede a Evidence local y no está conectado a ningún worker REA.

## Dashboard (prototipo P3)

Requiere Node.js 22 o superior:

```powershell
cd "$HOME\orbi-projects\orbi-rea-lab"
git pull --ff-only origin main
npm ci
npm test
npm run dev
# abrir http://localhost:3000
```

Para comprobar el artefacto estático ejecuta `npm run build
node scripts/verify-static-export.mjs`; la carpeta `out/` no se incluye en Git. Consulta [docs/DASHBOARD.md](docs/DASHBOARD.md).

**Importante:** los tres casos del dashboard son demostraciones escritas a mano, no resultados extraídos de REA. El prototipo no ofrece subida de archivos, endpoints de análisis, ejecución de código, autenticación ni conexión MCP.

## Smoke test REA local (Windows)

```powershell
node --test .\fixtures\solar-quote-demo\test\quote.test.js
.\scripts\smoke-rea.ps1
```

La evidencia completa, el resumen y los archivos de diagnóstico se guardan en `evidence/local/`, excluido de Git. El informe local `reports/ORBI_REA_MCP_VALIDATION.md` también está excluido. No subir APK, binarios ajenos, HAR, cookies, tokens, contraseñas ni capturas internas.

## Arquitectura y límites

- `app/`, `components/`, `lib/`: frontend de demostración exportado a HTML estático.
- `fixtures/`, `tests/`: pruebas sin datos privados.
- `scripts/`: análisis REA CLI en la estación del operador.
- `docs/`: arquitectura, roadmap y seguridad.
- `evidence/local/`: archivos privados que **no** se versionan.

Antes de conectar una API, un worker REA o datos reales se requieren autorización del objetivo, aislamiento de procesos, autenticación y autorización, protección de secretos, auditoría, controles de red y política de retención. **Nunca exponer puertos CDP/MCP o una terminal al Internet público.**

El repositorio GitHub se encuentra públicamente visible mientras no se cambie su configuración. Solo se incluyen ejemplos sintéticos y código revisado. Véase [docs/SECURITY.md](docs/SECURITY.md).

## Despliegue de demostración

El proyecto Vercel `orbi-rea-lab` está conectado a `ingeniusvictor/orbi-rea-lab` en el equipo ORBI (`orbi4`). El primer despliegue del commit `9ca91ba` terminó en estado `READY` el 21 de octubre de 2026, en el objetivo que Vercel clasificó como **production**.

- URL: https://orbi-rea-lab.vercel.app
- Protección observada del proyecto: Vercel Authentication habilitada (`all_except_custom_domains`). La accesibilidad concreta debe comprobarse desde el navegador de un usuario autorizado.
- Contenido: únicamente una exportación estática Next.js y casos sintéticos; sin worker REA ni API.
- No confundir un despliegue READY con pruebas de interfaz E2E. Falta realizar Browser QA y fijar dependencias transitivas con lockfile.
