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
    document.querySelectorAll(".pin").forEach((pin) => {
      pin.classList.toggle("is-dim", filter !== "all" && !pin.dataset.topics.split(" ").includes(filter));
    });
  });
});

const atlas = document.querySelector(".atlas");
if (atlas) {
  const tip = atlas.querySelector(".tip");
  const show = (pin) => {
    const title = document.createElement("b");
    title.textContent = pin.dataset.jug;
    tip.replaceChildren(title, document.createElement("br"), `${pin.dataset.city} · ${pin.dataset.detail}`);
    tip.hidden = false;
    const width = tip.parentElement.clientWidth;
    const x = (parseFloat(pin.dataset.left) / 100) * width - tip.offsetWidth / 2;
    tip.style.left = `${Math.min(Math.max(x, 4), width - tip.offsetWidth - 4)}px`;
    tip.style.top = `${pin.dataset.top}%`;
  };
  const hide = () => (tip.hidden = true);
  const select = (pin) => {
    show(pin);
    const stamps = [...document.querySelectorAll(`.stamp[data-jug="${CSS.escape(pin.dataset.jug)}"]`)];
    if (stamps.some((s) => s.hidden)) document.querySelector('.chip[data-filter="all"]')?.click();
    document.querySelectorAll(".stamp.is-highlight").forEach((s) => s.classList.remove("is-highlight"));
    stamps.forEach((s) => s.classList.add("is-highlight"));
    stamps[0]?.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => stamps.forEach((s) => s.classList.remove("is-highlight")), 2500);
  };
  atlas.querySelectorAll(".pin").forEach((pin) => {
    pin.addEventListener("mouseenter", () => show(pin));
    pin.addEventListener("mouseleave", hide);
    pin.addEventListener("focus", () => show(pin));
    pin.addEventListener("blur", hide);
    pin.addEventListener("click", () => select(pin));
    pin.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        select(pin);
      }
    });
  });
}
