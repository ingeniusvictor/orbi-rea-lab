# Roadmap por puertas de verificación

## P0 — base e integración (confirmada por operador)

- [x] REA 6.7.0 instalado en Windows x64
- [x] Codex MCP habilitado y `binary_session({})` invocado
- [x] `doctor --client codex` y `doctor --skill`: healthy

## P1 — evidencia real (pendiente de ejecutar en equipo local)

- [ ] Descomprimir este starter en ruta de usuario
- [ ] Pasar pruebas unitarias del fixture
- [ ] Ejecutar smoke CLI de JavaScript y conservar Evidence local
- [ ] Ejecutar `analyze_javascript_application` desde Codex MCP
- [ ] Comparar resultados de CLI/MCP y redactar primer informe

## P2 — repositorio privado

- [ ] Verificar exclusiones de `.gitignore` y revisar `git status`
- [ ] Crear repo privado en GitHub de forma autorizada
- [ ] Configurar revisión mediante PR y CI de pruebas del fixture

## P3 — producto

- [ ] Interfaz de investigaciones en Vercel
- [ ] API y worker aislado; roles, trazabilidad, almacenamiento cifrado
- [ ] Análisis web controlado y flujo de reportes

## P4 — proveedores opcionales

- [ ] Ghidra/JDK y primer PE nativo autorizado
- [ ] JADX/JDK y primer APK propio autorizado
- [ ] Prototipo cliente Android para consultar informes
