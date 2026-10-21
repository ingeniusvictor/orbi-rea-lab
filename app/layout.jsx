import "./globals.css";
import DashboardShell from "../components/dashboard-shell.jsx";

export const metadata = {
  title: "ORBI REA LAB | Plataforma de investigación",
  description: "Prototipo sintético de la plataforma de ingeniería inversa autorizada ORBI REA LAB.",
  robots: { index: false, follow: false }
};

export default function RootLayout({ children }) {
  return <html lang="es"><body><DashboardShell>{children}</DashboardShell></body></html>;
}
