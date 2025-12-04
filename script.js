// Tudo dentro de um IIFE para evitar conflitos
(function () {
  // ---- Troca de idioma ----
  const langButtons = document.querySelectorAll(".lang-btn");
  const langElements = document.querySelectorAll(".lang");

  function setLanguage(lang) {
    // botões
    langButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === lang);
    });

    // elementos com texto
    langElements.forEach((el) => {
      if (el.dataset.lang === lang) {
        // blocos (p, h1, h2, div, etc) vão como block, o resto inline
        const blockTags = ["P", "H1", "H2", "H3", "DIV", "SECTION", "ARTICLE"];
        el.style.display = blockTags.includes(el.tagName) ? "block" : "inline";
      } else {
        el.style.display = "none";
      }
    });
  }

  langButtons.forEach((btn) => {
    btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
  });

  // idioma padrão: PT
  setLanguage("pt");

  // ---- M-Pesa: mostrar / copiar número ----
  const mpesaParts = ["+258", "845", "919", "637"];
  const fullNumber = mpesaParts.join(" ");

  const showPt = document.getElementById("showMpesa");
  const showEn = document.getElementById("showMpesaEn");
  const mpesaFullLine = document.getElementById("mpesaFull");
  const mpesaSpan = document.getElementById("mpesaNumber");
  const copyPt = document.getElementById("copyMpesa");
  const copyEn = document.getElementById("copyMpesaEn");

  function revealNumber() {
    if (!mpesaSpan || !mpesaFullLine) return;
    mpesaSpan.textContent = fullNumber;
    mpesaFullLine.style.display = "block";
    if (showPt) showPt.style.display = "none";
    if (showEn) showEn.style.display = "none";
  }

  if (showPt) showPt.addEventListener("click", revealNumber);
  if (showEn) showEn.addEventListener("click", revealNumber);

  async function copyNumber(btn, copiedLabel, defaultLabel) {
    try {
      await navigator.clipboard.writeText(fullNumber);
      btn.textContent = copiedLabel;
      setTimeout(() => (btn.textContent = defaultLabel), 1500);
    } catch (e) {
      alert("Copie manualmente: " + fullNumber);
    }
  }

  if (copyPt) {
    copyPt.addEventListener("click", () =>
      copyNumber(copyPt, "Copiado!", "Copiar")
    );
  }
  if (copyEn) {
    copyEn.addEventListener("click", () =>
      copyNumber(copyEn, "Copied!", "Copy")
    );
  }

  // ---- Ano no rodapé ----
  const year = new Date().getFullYear();
  const yPt = document.getElementById("year");
  const yEn = document.getElementById("year_en");
  if (yPt) yPt.textContent = year;
  if (yEn) yEn.textContent = year;
})();
