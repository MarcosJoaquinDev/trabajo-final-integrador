export default function CategorySidebar({
  categories,
  selectedIndex,
  scrollRef,
  activeButtonRef,
  onSelect,
}) {
  return (
    <aside className="admin-category-list" aria-label="Categorías del menú">
      <p className="admin-sidebar-label">Categorías</p>

      <div className="admin-category-scroll" ref={scrollRef}>
        {categories.map((category, index) => (
          <button
            ref={index === selectedIndex ? activeButtonRef : null}
            className={
              index === selectedIndex
                ? "admin-category-item is-active"
                : "admin-category-item"
            }
            key={index}
            type="button"
            onClick={() => onSelect(index)}
          >
            <span className="admin-category-name">
              {category.categoria || "Sin nombre"}
            </span>
            <span className="admin-category-count">
              {category.items?.length ?? 0}
            </span>
          </button>
        ))}

        {categories.length === 0 && (
          <p className="admin-empty">Todavía no hay categorías.</p>
        )}
      </div>
    </aside>
  );
}
