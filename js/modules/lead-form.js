const WA = "529992393493";

export function init() {
  const form = document.getElementById("lead-form");
  if (!form) return;
  const owner = document.getElementById("owner-fields");
  const alertBusco = document.getElementById("alert-busco");
  const alertMin = document.getElementById("alert-minimo");
  const submit = document.getElementById("lead-submit");

  const update = () => {
    const d = new FormData(form);
    const busco = d.get("perfil") === "busco";
    const bajoMinimo = d.get("renta") === "menos15" && d.get("tipo") !== "Edificio o conjunto";
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

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    update();
    if (submit.disabled || !form.reportValidity()) return;
    const d = new FormData(form);
    const msg =
      `Hola, soy ${d.get("nombre")} (${d.get("perfil").toLowerCase()}). ` +
      `Tengo un(a) ${d.get("tipo").toLowerCase()} en ${d.get("zona")}, ` +
      `¿rentado?: ${d.get("rentado")}, renta aprox. ${d.get("renta")}. ` +
      `Vivo ${d.get("vive").toLowerCase()}. Me interesa la administración de Rendara.`;
    // GA4 (cuando esté instalado): lead calificado
    if (window.gtag) {
      window.gtag("event", "generate_lead", {
        perfil: d.get("perfil"), tipo_inmueble: d.get("tipo"),
        rango_renta: d.get("renta"), vive: d.get("vive"), calificado: "si",
      });
    }
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
  });
  update();
}
