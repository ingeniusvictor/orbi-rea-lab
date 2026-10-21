export const metadata = { title: "Arquitectura y seguridad | ORBI REA LAB" };

export default function AboutPage() {
  return (
    <article>
      <section className="page-heading"><div className="eyebrow">DISEÑO TÉCNICO / P3</div><h1>Arquitectura por capas</h1><p>Esta versión es una vitrina estática, sin backend ni acceso al REA instalado en Windows.</p></section>
      <div className="architecture-panel">
        <div className="arch-layer"><span>01 · PRESENTACIÓN</span><strong>Next.js — exportación estática</strong><p>Búsqueda y fichas basadas exclusivamente en datos demostrativos públicos del repositorio.</p></div>
        <div className="arch-arrow">↓</div>
        <div className="arch-layer dim"><span>02 · FUTURO</span><strong>API privada + autorización</strong><p>No implementada. Requerirá autenticación, permisos, cuotas y registro auditable.</p></div>
        <div className="arch-arrow">↓</div>
        <div className="arch-layer dim"><span>03 · FUTURO</span><strong>REA Worker aislado</strong><p>No conectado. Nunca exponer REA MCP stdio, una terminal ni CDP públicamente.</p></div>
      </div>
      <div className="panel about-panel"><div className="eyebrow">LÍMITE DE CONFIANZA</div><h2>Separar demostración y evidencia</h2><p>Las verificaciones CLI y MCP existentes se hicieron localmente con un fixture propio. Sus archivos completos y los informes privados se conservan fuera de Git mediante <code>evidence/local/</code>. Ningún hash, captura, binario o archivo personal es expuesto por el dashboard.</p><p>Las funciones de carga de archivos, almacenamiento y ejecución de tareas requieren un diseño de seguridad separado antes de implementarse.</p></div>
    </article>
  );
}
