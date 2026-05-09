const searchInput = document.querySelector("[data-search]");
const visibleCount = document.querySelector("[data-visible-count]");
const cards = [...document.querySelectorAll("[data-flag-card]")];

function updateVisibleFlags() {
  const query = searchInput.value.trim().toLowerCase();
  let count = 0;

  for (const card of cards) {
    const haystack = `${card.dataset.code} ${card.dataset.name}`;
    const visible = haystack.includes(query);

    card.hidden = !visible;
    if (visible) {
      count += 1;
    }
  }

  visibleCount.textContent = String(count);
}

if (searchInput && visibleCount) {
  searchInput.addEventListener("input", updateVisibleFlags);
  updateVisibleFlags();
}
