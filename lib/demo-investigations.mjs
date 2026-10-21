/** Synthetic display data only. No real REA Evidence is imported or published. */
export const investigations = Object.freeze([
  {
    id: "demo-solar-quote",
    title: "Cotizador solar — fixture",
    subtitle: "Ejemplo educativo del flujo de módulos JS",
    category: "JavaScript",
    target: "fixtures/solar-quote-demo",
    method: "Análisis estático simulado en la interfaz",
    status: "Demostración",
    date: "2026-10-21",
    icon: "☀",
    summary: "Ejemplo sintético inspirado en el fixture del repositorio. No representa la evidencia MCP privada ni un análisis nuevo.",
    modules: ["src/index.js", "src/quote.js", "src/energy.js"],
    relations: [["src/index.js", "src/quote.js"], ["src/quote.js", "src/energy.js"]],
    notes: ["Datos de demostración, sin archivos cargados", "Los enlaces del grafo representan una muestra didáctica", "La evidencia CLI/MCP real permanece únicamente en el equipo del operador"]
  },
  {
    id: "demo-web-journey",
    title: "Inspección de recorrido web",
    subtitle: "Escenario ficticio de observación pasiva",
    category: "Web",
    target: "https://demo.invalid (ficticio)",
    method: "Captura web ilustrativa, no ejecutada",
    status: "Demostración",
    date: "2026-10-21",
    icon: "◎",
    summary: "Escenario sintético de una futura investigación autorizada de interfaz web; sin captura ni acceso a Internet.",
    modules: ["Página de entrada (simulada)", "Formulario (simulado)", "Resultado (simulado)"],
    relations: [["Página de entrada (simulada)", "Formulario (simulado)"], ["Formulario (simulado)", "Resultado (simulado)"]],
    notes: ["No se ha conectado Chrome DevTools Protocol", "No hay tráfico ni datos de usuarios", "No hay automatizaciones de navegación"]
  },
  {
    id: "demo-android-audit",
    title: "Auditoría Android — ejemplo",
    subtitle: "Plan de verificación de un APK propio",
    category: "Android",
    target: "sample-own-app.apk (ficticio)",
    method: "Plan ilustrativo, sin descompilación",
    status: "Demostración",
    date: "2026-10-21",
    icon: "◇",
    summary: "Caso sintético para mostrar el flujo futuro. JADX, ADB y Apktool no están conectados al dashboard.",
    modules: ["Manifest (simulado)", "Permisos (simulados)", "Clases (simuladas)"],
    relations: [["Manifest (simulado)", "Permisos (simulados)"], ["Manifest (simulado)", "Clases (simuladas)"]],
    notes: ["No se ha procesado ningún APK", "La instalación de JADX/ADB requerirá otra fase", "Las futuras investigaciones deben tener autorización explícita"]
  }
]);

export const categories = Object.freeze(["Todos", "JavaScript", "Web", "Android"]);

export function getInvestigation(id) {
  return investigations.find((item) => item.id === id) ?? null;
}

function normalizeSearch(value) {
  return String(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("es").trim();
}

export function filterInvestigations({ query = "", category = "Todos" } = {}) {
  const term = normalizeSearch(query);
  return investigations.filter((item) => {
    if (category !== "Todos" && item.category !== category) return false;
    if (!term) return true;
    return [item.title, item.subtitle, item.target, item.category]
      .join(" ").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("es").includes(term);
  });
}

export function getSummary() {
  return {
    demonstrations: investigations.length,
    realUploaded: 0,
    connectedWorkers: 0,
    categories: new Set(investigations.map((item) => item.category)).size
  };
}
