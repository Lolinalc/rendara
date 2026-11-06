const WA = "529992393493";

// Mensaje de WhatsApp según el idioma de la página (<html lang="...">)
const MSG = {
  es: (d) =>
    `Hola, soy ${d.nombre} (${d.perfil.toLowerCase()}). ` +
    `Tengo un(a) ${d.tipo.toLowerCase()} en ${d.zona}, ¿rentado?: ${d.rentado}, ` +
    `renta aprox. ${d.renta}. Vivo: ${d.vive}. ` +
    `Me interesa la administración de Rendara.`,
  en: (d) =>
    `Hi, I'm ${d.nombre} (${d.perfil.toLowerCase()}). ` +
    `I have a ${d.tipo.toLowerCase()} in ${d.zona}. Currently rented: ${d.rentado}. ` +
    `Approx. rent: ${d.renta} MXN. Where I live: ${d.vive}. ` +
    `I'm interested in Rendara's property management.`,
};

export function init() {
  const form = document.getElementById("lead-form");
  if (!form) return;
  const lang = document.documentElement.lang.startsWith("en") ? "en" : "es";
  const owner = document.getElementById("owner-fields");
  const alertBusco = document.getElementById("alert-busco");
  const alertMin = document.getElementById("alert-minimo");
  const submit = document.getElementById("lead-submit");

  const update = () => {
    const d = new FormData(form);
    const busco = d.get("perfil") === "busco";
    const bajoMinimo = d.get("renta") === "menos15" && d.get("tipo") !== "building";
    alertBusco.hidden = !busco;
    owner.hidden = busco;
    alertMin.hidden = busco || !bajoMinimo;
    submit.disabled = busco || bajoMinimo;
  };
  form.addEventListener("change", update);

  // Enlaces "inmobiliarias aliadas": llevan al formulario con "Busco rentar o comprar" marcado
  document.querySelectorAll("[data-busco]").forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      form.querySelector('input[name="perfil"][value="busco"]').checked = true;
      update();
      alertBusco.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });

  // Texto visible de cada respuesta (para que el mensaje salga en el idioma de la página)
  const texto = (name) => {
    const el = form.elements[name];
    if (el instanceof HTMLSelectElement) return el.selectedOptions[0].text.trim();
    if (el instanceof RadioNodeList) {
      const r = form.querySelector(`input[name="${name}"]:checked`);
      return r ? r.closest("label").textContent.trim() : "";
    }
    return el.value.trim();
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    update();
    if (submit.disabled || !form.reportValidity()) return;
    const d = {};
    ["perfil", "tipo", "rentado", "renta", "zona", "vive", "nombre"].forEach((k) => (d[k] = texto(k)));
    const msg = MSG[lang](d);
    // GA4 (cuando esté instalado): lead calificado
    if (window.gtag) {
      const f = new FormData(form);
      window.gtag("event", "generate_lead", {
        idioma: lang,
        perfil: f.get("perfil"),
        tipo_inmueble: f.get("tipo"),
        rango_renta: f.get("renta"),
        vive: f.get("vive"),
        calificado: "si",
      });
    }
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
  });
  update();
}
