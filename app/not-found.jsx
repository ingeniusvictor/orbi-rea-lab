import Link from "next/link";
export default function NotFound() {
  return <section className="page-heading"><div className="eyebrow">404 / ORBI REA LAB</div><h1>No encontramos esta ficha</h1><p>Solo se publican los escenarios sintéticos del laboratorio.</p><Link href="/investigations" className="btn-primary">Ver casos disponibles →</Link></section>;
}
