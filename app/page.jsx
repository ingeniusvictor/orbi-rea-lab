import Link from "next/link";
import InvestigationExplorer from "../components/investigation-explorer.jsx";
import { getSummary } from "../lib/demo-investigations.mjs";

export default function HomePage() {
  const stats = getSummary();
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span className="status-dot" /> ORBI ECOSYSTEM / RESEARCH</div>
          <h1>Ingeniería inversa, <em>con evidencia.</em></h1>
          <p>Un espacio para estudiar software autorizado, documentar hallazgos y separar hechos, inferencias y límites de observación.</p>
          <div className="hero-actions"><Link className="btn-primary" href="/investigations">Ver investigaciones <span aria-hidden="true">↗</span></Link><Link className="btn-outline" href="/about">Cómo funciona</Link></div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="orb orb-one"/><div className="orb orb-two"/><div className="orb orb-three"/>
          <div className="diagram-node node-a">ANALIZAR</div><div className="diagram-node node-b">EVIDENCIA</div><div className="diagram-node node-c">VERIFICAR</div>
        </div>
      </section>
      <div className="security-banner"><span className="security-icon">◈</span><div><strong>Entorno de visualización seguro</strong><p>Este dashboard solo muestra datos sintéticos. No dispone de carga de archivos, autenticación, API de análisis ni conexión con REA.</p></div><span className="banner-state">LECTURA · DEMO</span></div>
      <section className="metrics" aria-label="Indicadores demostrativos">
        <div className="metric"><span>CASOS DE DEMOSTRACIÓN</span><strong>{String(stats.demonstrations).padStart(2, "0")}</strong><small>Datos sintéticos</small></div>
        <div className="metric"><span>EVIDENCIAS REALES EN WEB</span><strong>{String(stats.realUploaded).padStart(2, "0")}</strong><small>Ningún dato privado</small></div>
        <div className="metric"><span>WORKERS CONECTADOS</span><strong>{String(stats.connectedWorkers).padStart(2, "0")}</strong><small>Procesamiento offline</small></div>
        <div className="metric"><span>CATEGORÍAS DEMO</span><strong>{String(stats.categories).padStart(2, "0")}</strong><small>JavaScript · Web · Android</small></div>
      </section>
      <InvestigationExplorer compact />
      <section className="process-section">
        <div className="eyebrow">METODOLOGÍA PROPUESTA</div><h2>Del objetivo a la conclusión</h2>
        <div className="process-grid">
          {[["01","Autorizar","Definir titularidad, consentimiento y alcance."],["02","Inspeccionar","Recoger hechos y evidencias verificables."],["03","Contrastar","Separar observación, inferencia y desconocido."],["04","Documentar","Emitir informe con hashes y limitaciones."]].map(([n,t,d])=><div className="process-step" key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></div>)}
        </div>
      </section>
    </>
  );
}
