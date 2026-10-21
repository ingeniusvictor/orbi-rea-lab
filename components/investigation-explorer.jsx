"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { categories, filterInvestigations } from "../lib/demo-investigations.mjs";

export default function InvestigationExplorer({ compact = false }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todos");
  const matches = useMemo(() => filterInvestigations({ query, category }), [query, category]);

  return (
    <section className="explorer" aria-label="Investigaciones de demostración">
      <div className="section-title-row">
        <div><div className="eyebrow">BIBLIOTECA DE ANÁLISIS</div><h2>Investigaciones <span>demo</span></h2></div>
        <span className="counter">{matches.length} / 3 casos</span>
      </div>
      <div className="toolbar">
        <label className="search-box">
          <span aria-hidden="true">⌕</span>
          <span className="sr-only">Buscar investigaciones</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar por nombre, archivo o tecnología…" type="search" />
        </label>
        <div className="filters" role="group" aria-label="Filtrar por categoría">
          {categories.map((value) => (
            <button key={value} type="button" className={category === value ? "filter active" : "filter"}
              aria-pressed={category === value} onClick={() => setCategory(value)}>{value}</button>
          ))}
        </div>
      </div>
      <div className="investigation-grid">
        {matches.map((item) => (
          <Link href={`/investigations/${item.id}`} key={item.id} className="investigation-card">
            <div className="card-top"><span className="case-icon">{item.icon}</span><span className="demo-tag">SINTÉTICO</span></div>
            <div className="card-meta">{item.category} <span>·</span> {item.date}</div>
            <h3>{item.title}</h3><p>{item.subtitle}</p>
            <div className="card-target"><span>OBJETIVO</span><code>{item.target}</code></div>
            <div className="card-link">Explorar ficha <span aria-hidden="true">↗</span></div>
          </Link>
        ))}
        {matches.length === 0 && (
          <div className="empty-state" role="status">No hay demostraciones que coincidan con la búsqueda. Prueba otra categoría o término.</div>
        )}
      </div>
      {!compact && <p className="safe-note">Todos los casos de esta pantalla son ficticios o ilustrativos. No se han cargado resultados de REA.</p>}
    </section>
  );
}
