import { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

// Opzioni "utility" e "category" statiche
const utilityOptions = [
    { label: "Utilità 1", value: 1 },
    { label: "Utilità 2", value: 2 },
    { label: "Utilità 3", value: 3 },
    { label: "Utilità 4", value: 4 },
    { label: "Utilità 5", value: 5 },
];

const categoryOptions = [
    { label: "Casa & Arredo", value: 1 },
    { label: "Tecnologia Inutile", value: 2 },
    { label: "Accessori e Moda", value: 3 },
    { label: "Cucina e Tavola", value: 4 },
    { label: "Tempo libero & Regali", value: 5 },
    { label: "Sport Outdoor", value: 6 },
    { label: "Ufficio & Studio", value: 7 },
];

export default function ProductFilters({ onFilter }) {
    const [search, setSearch] = useState("");
    const [priceRange, setPriceRange] = useState([0, 500]);
    const [utilities, setUtilities] = useState([]);
    const [categories, setCategories] = useState([]);
    const [sortOrder, setSortOrder] = useState("id_desc"); // "id_asc" / "id_desc"

    // Callback centrale: aggiorna filtri e chiama la prop
    const triggerFilter = ({
        newSearch = search,
        newPriceRange = priceRange,
        newUtilities = utilities,
        newCategories = categories,
        newSortOrder = sortOrder,
    } = {}) => {
        onFilter({
            name: newSearch || undefined,
            price_min: newPriceRange[0],
            price_max: newPriceRange[1],
            utility: newUtilities.length > 0 ? newUtilities.join(",") : undefined,
            category: newCategories.length > 0 ? newCategories.join(",") : undefined,
            sort: newSortOrder,
        });
    };

    // Handlers per filtri live (solo su interazione!)
    const handleChangeSearch = (e) => {
        const value = e.target.value;
        setSearch(value);
        triggerFilter({ newSearch: value });
    };
    const handleChangePrice = (range) => {
        setPriceRange(range);
        triggerFilter({ newPriceRange: range });
    };
    const handleChangeUtility = (val) => {
        const updated = utilities.includes(val)
            ? utilities.filter(u => u !== val)
            : [...utilities, val];
        setUtilities(updated);
        triggerFilter({ newUtilities: updated });
    };
    const handleChangeCategory = (val) => {
        const updated = categories.includes(val)
            ? categories.filter(c => c !== val)
            : [...categories, val];
        setCategories(updated);
        triggerFilter({ newCategories: updated });
    };
    const handleToggleSortOrder = () => {
        const newOrder = sortOrder === "id_desc" ? "id_asc" : "id_desc";
        setSortOrder(newOrder);
        triggerFilter({ newSortOrder: newOrder });
    };

    return (
        <div className="products-filter-sidebar">
            {/* Input testo */}
            <div>
                <input
                    type="text"
                    placeholder="Cerca per nome..."
                    value={search}
                    onChange={handleChangeSearch}
                />
            </div>
            {/* Slider prezzo */}
            <div style={{ margin: "0.7em 0" }}>
                <label>Prezzo:</label>
                <Slider
                    range
                    min={0}
                    max={500}
                    value={priceRange}
                    allowCross={false}
                    onChange={handleChangePrice}
                    marks={{ 0: "0€", 500: "500€" }}
                />
                <span>
                    {priceRange[0]} € – {priceRange[1]} €
                </span>
            </div>
            {/* Utility checkbox */}
            <div>
                <span style={{ fontWeight: 600 }}>Utilità:</span>
                {utilityOptions.map(util => (
                    <label key={util.value} style={{ display: "block" }}>
                        <input
                            type="checkbox"
                            checked={utilities.includes(util.value)}
                            onChange={() => handleChangeUtility(util.value)}
                        />
                        {util.label}
                    </label>
                ))}
            </div>
            {/* Categoria checkbox */}
            <div>
                <span style={{ fontWeight: 600 }}>Categorie:</span>
                {categoryOptions.map(cat => (
                    <label key={cat.value} style={{ display: "block" }}>
                        <input
                            type="checkbox"
                            checked={categories.includes(cat.value)}
                            onChange={() => handleChangeCategory(cat.value)}
                        />
                        {cat.label}
                    </label>
                ))}
            </div>
            {/* Ordine "Ultimi Arrivi" con freccetta-toggle */}
            <div style={{ margin: "1em 0" }}>
                <span style={{ fontWeight: 600 }}>Ordine per Arrivi:</span>
                <button
                    type="button"
                    onClick={handleToggleSortOrder}
                    style={{
                        background: "none",
                        border: "none",
                        marginLeft: "8px",
                        cursor: "pointer",
                        fontSize: "1.2em"
                    }}
                    aria-label="Toggle Ordine"
                >
                    {sortOrder === "id_desc" ? "⬇️" : "⬆️"}
                </button>
                <span style={{ marginLeft: "7px" }}>
                    {sortOrder === "id_desc" ? "Dal più nuovo" : "Dal più vecchio"}
                </span>
            </div>
        </div>
    );
}
