# ORBI REA LAB — Contrato de agentes

## Misión

Investigar software que ORBI posee o cuyo análisis haya sido expresamente autorizado. Separar en el informe hechos observados, inferencias y resultados desconocidos. Priorizar reproducibilidad y evidencia.

## Alcance inicial

- Trabajar únicamente dentro de este repositorio con el fixture `fixtures/solar-quote-demo`.
- REA MCP: `analyze_javascript_application` (`input_path` absoluto, `format: directory`, `integrity_policy: fail`, `detail: summary`), seguido de `inspect_analysis_view` con el ID retornado.
- REA CLI local: `rea analyze-javascript-application <directorio> --json`, guardando el JSON en `evidence/local/`.
- La prueba debe ser **pasiva**: no ejecutar el objetivo ni abrir procesos externos.

## Prohibiciones hasta autorización expresa

- No inspeccionar sitios, programas, APK o redes de terceros.
- No iniciar capturas CDP, proxies, interceptación, instrumentación, Frida o automatización de acciones sobre una web.
- No recolectar cookies, tokens, passwords, claves API, identidades de clientes o información privada.
- No instalar herramientas ni modificar configuraciones de Codex, sistemas, otros repositorios o servicios cloud.
- No hacer commits, push, crear repositorios ni publicar evidencias sin autorización del operador.
- No confundir `available: true` con ejecución comprobada; no afirmar equivalencia de código ni lógica del servidor si solo se observó el cliente.

## Criterios de aceptación de la primera investigación

1. Las pruebas unitarias del fixture pasan.
2. El MCP ejecuta realmente `analyze_javascript_application` sobre el directorio exacto.
3. Se obtiene `evidence_id`/`parent_evidence_id` y una vista con módulos identificados.
4. El informe dice con precisión qué observó REA, qué no pudo inspeccionar y qué se infirió.
5. Ningún archivo externo al directorio del proyecto cambia y ninguna credencial se guarda.
