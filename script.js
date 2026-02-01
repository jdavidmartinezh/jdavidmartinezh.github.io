(() => {
  const lastUpdated = document.querySelector("#last-updated");
  if (lastUpdated) {
    const modified = new Date(document.lastModified);
    if (!Number.isNaN(modified.getTime())) {
      lastUpdated.textContent = modified.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
  }

  const copyButton = document.querySelector("[data-copy-email]");
  const status = document.querySelector("#copy-status");
  if (!copyButton || !status) return;

  const email = copyButton.dataset.copyEmail;

  copyButton.addEventListener("click", async () => {
    if (!email) return;
    try {
      if (!navigator.clipboard) {
        status.textContent = "Clipboard unavailable. Use the mailto link.";
        return;
      }
      await navigator.clipboard.writeText(email);
      copyButton.textContent = "Copied";
      status.textContent = "Email copied.";
      window.setTimeout(() => {
        copyButton.textContent = "Copy email";
        status.textContent = "";
      }, 2000);
    } catch (error) {
      status.textContent = "Copy failed. Use the mailto link.";
    }
  });
})();
