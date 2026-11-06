// Configuración de Eleventy para rendaramx.com
// - La home (index.html) y los assets se copian tal cual (no se procesan como plantilla).
// - El blog se escribe en Markdown dentro de blog/posts/ y se genera en /blog/<slug>/.
// - El sitemap.xml se genera solo con la home + todos los artículos publicados.

export default function (eleventyConfig) {
  // Archivos estáticos que se publican sin cambios
  [
    "index.html",
    "css",
    "js",
    "images",
    "robots.txt",
    "googlec78bcb04f43c121d.html",
  ].forEach((p) => eleventyConfig.addPassthroughCopy(p));

  // Artículos publicados (los que tienen draft: true no se publican), más recientes primero
  eleventyConfig.addCollection("posts", (api) =>
    api
      .getFilteredByGlob("blog/posts/*.md")
      .filter((p) => !p.data.draft)
      .sort((a, b) => b.date - a.date)
  );

  // No generar páginas para borradores
  eleventyConfig.addPreprocessor("drafts", "md", (data) => {
    if (data.draft) return false;
  });

  // Fechas
  eleventyConfig.addFilter("isoDate", (d) => new Date(d).toISOString().slice(0, 10));
  eleventyConfig.addFilter("fechaLarga", (d) =>
    new Date(d).toLocaleDateString("es-MX", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    })
  );
  eleventyConfig.addFilter("minutosLectura", (html) => {
    const palabras = String(html).replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(palabras / 200));
  });
  eleventyConfig.addFilter("json", (v) => JSON.stringify(v));

  return {
    dir: { input: ".", includes: "_includes", output: "_site" },
    templateFormats: ["md", "njk"],
    markdownTemplateEngine: "njk",
  };
}
