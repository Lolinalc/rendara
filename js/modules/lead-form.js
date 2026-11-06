const WA = "529992393493";

// Mensaje de WhatsApp según el idioma de la página (<html lang="...">)
const MSG = {
  es: (d) =>
    `Hola, soy ${d.nombre} (${d.perfil.toLowerCase()}). Me interesa: ${d.servicio}. ` +
    `Tengo un(a) ${d.tipo.toLowerCase()} en ${d.zona}, ¿rentado?: ${d.rentado}, ` +
    `renta aprox. ${d.renta}. Vivo: ${d.vive}. ` +
    `¿Me pueden dar más información?`,
  en: (d) =>
    `Hi, I'm ${d.nombre} (${d.perfil.toLowerCase()}). Interested in: ${d.servicio}. ` +
    `I have a ${d.tipo.toLowerCase()} in ${d.zona}. Currently rented: ${d.rentado}. ` +
    `Approx. rent: ${d.renta}${/\d/.test(d.renta) ? " MXN" : ""}. Where I live: ${d.vive}. ` +
    `Could you send me more information?`,
};

export function init() {
  const form = document.getElementById("lead-form");
  if (!form) return;
  const lang = document.documentElement.lang.startsWith("en") ? "en" : "es";
  const owner = document.getElementById("owner-fields");
  const alertBusco = document.getElementById("alert-busco");
  const alertMin = document.getElementById("alert-minimo");
  const alertOcupada = document.getElementById("alert-ocupada");
  const submit = document.getElementById("lead-submit");

  const update = () => {
    const d = new FormData(form);
    const busco = d.get("perfil") === "busco";
    // El mínimo de renta aplica a la administración; la gestión de mantenimiento no depende de la renta
    const bajoMinimo =
      d.get("renta") === "menos15" && d.get("tipo") !== "building" && d.get("servicio") !== "mant";
    // La gestión de mantenimiento es solo para casas desocupadas
    const ocupada = d.get("rentado") === "si" && ["mant", "ambos"].includes(d.get("servicio"));
    const soloMantOcupada = ocupada && d.get("servicio") === "mant";
    alertBusco.hidden = !busco;
    owner.hidden = busco;
    alertMin.hidden = busco || !bajoMinimo;
    alertOcupada.hidden = busco || !ocupada;
    submit.disabled = busco || bajoMinimo || soloMantOcupada;
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

  // Botones "Cotizar mantenimiento": llevan al formulario con ese servicio marcado
  document.querySelectorAll("[data-servicio]").forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const perfil = form.querySelector('input[name="perfil"]:checked');
      if (!perfil || perfil.value === "busco") form.querySelector('input[name="perfil"]').checked = true;
      const s = form.querySelector(`input[name="servicio"][value="${a.dataset.servicio === "mantenimiento" ? "mant" : "admin"}"]`);
      if (s) s.checked = true;
      update();
      form.scrollIntoView({ behavior: "smooth", block: "start" });
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
    ["perfil", "servicio", "tipo", "rentado", "renta", "zona", "vive", "nombre"].forEach((k) => (d[k] = texto(k)));
    const msg = MSG[lang](d);
    // GA4 (cuando esté instalado): lead calificado
    if (window.gtag) {
      const f = new FormData(form);
      window.gtag("event", "generate_lead", {
        idioma: lang,
        perfil: f.get("perfil"),
        servicio: f.get("servicio"),
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
