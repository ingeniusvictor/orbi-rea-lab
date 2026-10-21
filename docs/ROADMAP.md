# Roadmap por puertas de verificación

## P0 — base e integración (validado por operador)
- [x] REA 6.7.0 instalado en Windows x64
- [x] Codex MCP y `binary_session({})` invocados
- [x] `doctor --client codex` y `doctor --skill`: healthy

## P1 — evidencia real (validado localmente por operador)
- [x] Fixture propio en ruta de usuario
- [x] Cuatro pruebas unitarias OK
- [x] Smoke CLI con Evidence local y resumen (script v0.1.2)
- [x] `analyze_javascript_application` desde Codex MCP
- [x] Inventario MCP de 18/18 entradas y 10 relaciones alineadas con CLI
- [x] Informe privado `reports/ORBI_REA_MCP_VALIDATION.md` (excluido del repositorio)

## P2 — control de versiones y CI
- [x] Primer commit remoto `075a30f` (15 archivos)
- [x] GitHub Actions `fixture-unit-tests` en verde
- [ ] Configurar protecciones/revisiones de `main`
- [ ] Revisar la visibilidad pública actual; mantener solo contenido demostrativo

## P3 — producto web
- [x] Implementación inicial del dashboard estático en rama de desarrollo, con casos sintéticos y pruebas
- [x] CI de build y pruebas en verde; PR #1 fusionado a `main` (`9ca91ba`)
- [ ] Añadir lockfile npm y política de dependencias
- [x] Proyecto Vercel ORBI conectado; primer despliegue de demo estática en READY (protegido con Vercel Authentication)
- [ ] Verificar UX y accesibilidad mediante Browser QA
- [ ] Diseñar API autenticada y worker aislado (no implementados)
- [ ] Aprobación de controles de seguridad antes de procesar archivos reales

## P4 — proveedores opcionales
- [ ] Ghidra/JDK y primer PE nativo autorizado
- [ ] JADX/JDK y primer APK propio autorizado
- [ ] Prototipo cliente Android para consultar informes
