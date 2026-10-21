# P3 — Dashboard ORBI REA LAB (prototipo sintético)

## Qué hace

- Next.js App Router con exportación estática (`output: "export"`).
- Inicio, explorador con búsqueda y filtros y fichas con nodos/relaciones ficticias.
- Casos contenidos en `lib/demo-investigations.mjs`, validados con pruebas Node nativas.
- Sin APIs, rutas de servidor, subida de archivos, autenticación, SaaS, base de datos, ejecución de REA o conectividad MCP.

## Desarrollo

Requiere Node.js 22+ y acceso al registro de npm.

```bash
npm ci
npm test
npm run dev
# http://localhost:3000
npm run build
node scripts/verify-static-export.mjs
# salida estática en out/
```

Esta demostración no exige REA ni lee evidencias locales. El repositorio incluye `package-lock.json` (npm lockfile v3), generado por GitHub Actions y versionado. Para instalaciones reproducibles usar `npm ci`; CI valida nueve pruebas Node, compilación y seis rutas HTML estáticas. Esto no sustituye las pruebas E2E en navegador.

## Puerta de seguridad

Ninguna evidencia real o archivo privado debe subirse a `app/`, `public/` ni `lib/`. Los identificadores de los casos demo no son Evidence IDs reales. El banner indica expresamente que el motor de análisis está desconectado.

Antes de incluir una API y worker aislado se requiere: autenticación y permisos, separación por usuario/tenant, cola con jobs firmados y validados, limitación de rutas y tamaño, auditoría, aislamiento de procesos, cuotas, cifrado en reposo, retención y borrado de evidencias, protección contra SSRF, y consentimiento para analizar cada objetivo.

## Vercel

El sitio **estático** se desplegó desde la raíz del repositorio en Vercel ORBI (`orbi-rea-lab.vercel.app`). Estado inicial READY, commit `9ca91ba`, Git conectado. Vercel lo clasificó como producción; su protección de acceso está configurada con Vercel Authentication. La experiencia completa de navegador y accesibilidad todavía no están verificadas. No se deben configurar secretos del REA worker ni abrir puertos de depuración. Un eventual worker local requiere integración privada diferente y autorización explícita.
