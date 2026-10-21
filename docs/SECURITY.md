# Normas de investigación y manejo de datos

1. Trabajar solo con software de ORBI o con autorización expresa, acotada y documentada.
2. La disponibilidad pública de un sitio no autoriza eludir autenticación, controles ni extraer código propietario.
3. Empezar por lectura estática pasiva en una muestra local sin secretos.
4. Mantener `evidence/local/` fuera de Git. Nunca publicar tokens, cookies, cabeceras privadas, HAR con datos de usuarios, binarios ajenos, capturas internas o claves.
5. Archivos desconocidos: VM aislada, usuario sin privilegios, sin acceso a redes corporativas, disco personal ni credenciales.
6. Cada informe incluirá hash SHA-256 del objetivo, método, versión REA, hechos, incertidumbres, limitaciones y autorización.
7. Licencia MIT de REA: el motor se obtiene de `morluto/rea` o npm oficial. No hay concesión automática sobre materiales de terceros.
