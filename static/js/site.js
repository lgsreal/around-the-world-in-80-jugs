document.querySelectorAll(".copy-btn").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const text = document.getElementById(btn.dataset.copy)?.textContent.trim();
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      btn.textContent = "Copied!";
    } catch {
      btn.textContent = "Select & copy manually";
    }
    setTimeout(() => (btn.textContent = "Copy abstract"), 2000);
  });
});

const chips = document.querySelectorAll(".chip");
chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    const filter = chip.dataset.filter;
    chips.forEach((c) => {
      const active = c === chip;
      c.classList.toggle("is-active", active);
      c.setAttribute("aria-pressed", String(active));
    });
    document.querySelectorAll(".stamp").forEach((stamp) => {
      const topic = stamp.dataset.topic;
      stamp.hidden = !(filter === "all" || topic === filter || topic === "open");
    });
  });
});
