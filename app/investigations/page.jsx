import InvestigationExplorer from "../../components/investigation-explorer.jsx";

export const metadata = { title: "Investigaciones demo | ORBI REA LAB" };

export default function InvestigationsPage() {
  return <><section className="page-heading"><div className="eyebrow">ORBI REA LAB / EXPLORADOR</div><h1>Biblioteca de investigaciones</h1><p>Explora casos sintéticos para evaluar el diseño del laboratorio. Ninguna ficha representa una captura real.</p></section><InvestigationExplorer /></>;
}
