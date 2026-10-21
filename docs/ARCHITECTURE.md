# Arquitectura inicial

```text
Codex (agente) --MCP stdio--> REA 6.7.0 (instalación global)
                                |
                                +-- análisis estático de directorio propio
                                +-- resultados Evidence / vistas
                                |
ORBI REA LAB (este repositorio) <- informes y pruebas revisadas
  fixtures/solar-quote-demo
  scripts/smoke-rea.ps1
  evidence/local/  [excluido de Git]
```

## Frontera de confianza

La configuración MCP de usuario permite descubrir REA desde Codex, pero no crea una sandbox. Los objetivos no confiables deben investigarse en VM/usuario de sistema dedicado con mínimo acceso y sin credenciales. En esta fase no se analizan objetivos externos.

## Ruta futura a producto

Interfaz Next.js en Vercel -> API autenticada y cola de trabajos -> worker privado en entorno aislado -> Evidence cifrada con retención limitada -> informes verificados. La API no expondrá un shell ni un puerto de depuración directamente.

No afirmar que el worker ya existe ni que los futuros flujos Vercel/Android están implementados.
