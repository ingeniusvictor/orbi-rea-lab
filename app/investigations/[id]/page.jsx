import Link from "next/link";
import { notFound } from "next/navigation";
import { investigations, getInvestigation } from "../../../lib/demo-investigations.mjs";

export function generateStaticParams() {
  return investigations.map(({ id }) => ({ id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const item = getInvestigation(id);
  return { title: item ? `${item.title} | ORBI REA LAB` : "Caso no encontrado | ORBI REA LAB" };
}

export default async function InvestigationDetail({ params }) {
  const { id } = await params;
  const item = getInvestigation(id);
  if (!item) notFound();
  return (
    <article>
      <Link className="back-link" href="/investigations">← Volver a investigaciones</Link>
      <div className="detail-heading">
        <div><div className="eyebrow">{item.category.toUpperCase()} / CASO SINTÉTICO</div><h1>{item.title}</h1><p>{item.summary}</p></div>
        <span className="demo-tag large">NO REAL · DEMO</span>
      </div>
      <div className="detail-grid">
        <div className="panel">
          <div className="eyebrow">ALCANCE ILUSTRATIVO</div>
          <h2>Ficha técnica</h2>
          <dl className="facts"><div><dt>Objetivo</dt><dd><code>{item.target}</code></dd></div><div><dt>Método</dt><dd>{item.method}</dd></div><div><dt>Estado</dt><dd>{item.status}</dd></div><div><dt>Evidence ID real</dt><dd>No existe en este dashboard</dd></div></dl>
        </div>
        <div className="panel">
          <div className="eyebrow">INVENTARIO DE MUESTRA</div><h2>Nodos ilustrativos</h2>
          <ul className="module-list">{item.modules.map((m)=><li key={m}><span aria-hidden="true">◇</span><code>{m}</code></li>)}</ul>
        </div>
        <div className="panel full">
          <div className="eyebrow">GRAFO DEMOSTRATIVO</div><h2>Relaciones de ejemplo</h2>
          <p className="muted">Las conexiones son contenido sintético del frontend; no son inferencias generadas en vivo por REA.</p>
          <div className="relations">{item.relations.map(([from,to])=><div className="relation" key={from+to}><code>{from}</code><span aria-label="relación de muestra">⟶</span><code>{to}</code></div>)}</div>
        </div>
        <div className="panel full">
          <div className="eyebrow">RESTRICCIONES</div><h2>Qué no demuestra este caso</h2><ul className="limitations">{item.notes.map((n)=><li key={n}>{n}</li>)}</ul>
        </div>
      </div>
    </article>
  );
}
