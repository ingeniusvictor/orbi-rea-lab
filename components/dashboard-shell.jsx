import Link from "next/link";

const nav = [
  { href: "/", label: "Vista general", icon: "◫" },
  { href: "/investigations", label: "Investigaciones", icon: "⌕" },
  { href: "/about", label: "Arquitectura", icon: "⬡" }
];

export default function DashboardShell({ children }) {
  return (
    <div className="workspace">
      <aside className="sidebar">
        <Link href="/" className="brand" aria-label="ORBI REA LAB, inicio">
          <span className="brand-mark">O<span>·</span></span>
          <span className="brand-copy"><strong>ORBI</strong><small>REA LAB</small></span>
        </Link>
        <div className="side-label">LABORATORIO</div>
        <nav className="nav" aria-label="Navegación principal">
          {nav.map((entry) => (
            <Link key={entry.href} className="nav-link" href={entry.href}>
              <span className="nav-icon" aria-hidden="true">{entry.icon}</span>{entry.label}
            </Link>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="safe-chip"><span className="status-dot"/> MODO DEMO</div>
          <p>Sin conexión al motor nativo. Evidencias privadas fuera de la web.</p>
          <a href="https://github.com/ingeniusvictor/orbi-rea-lab" target="_blank" rel="noopener noreferrer" className="repo-link">Repositorio GitHub ↗</a>
        </div>
      </aside>
      <div className="main-column">
        <header className="topbar">
          <div className="breadcrumb">ORBI ECOSYSTEM <span>/</span> RESEARCH PLATFORM</div>
          <span className="topbar-pill">P3 · INTERFAZ SINTÉTICA</span>
        </header>
        <main className="main-content">{children}</main>
        <footer className="footer">ORBI REA LAB · Prototipo local de interfaz · Sin recolección de datos</footer>
      </div>
    </div>
  );
}
