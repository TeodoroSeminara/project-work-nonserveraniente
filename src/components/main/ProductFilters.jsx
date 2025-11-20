import { useState } from "react";
import "rc-slider/assets/index.css";
import "../../styles/ProductFilters.css";
import { LuCannabis } from "react-icons/lu";
import { Switch } from "pretty-checkbox-react";
import "pretty-checkbox/dist/pretty-checkbox.min.css";
import { VscSettings } from "react-icons/vsc";

const utilityOptions = [
    { label: "♿️", value: 1 },
    { label: "♿️♿️", value: 2 },
    { label: "♿️♿️♿️", value: 3 },
    { label: "♿️♿️♿️♿️", value: 4 },
    { label: "♿️♿️♿️♿️♿️", value: 5 },
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
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [search, setSearch] = useState("");

    // Range effettivo che invii al backend
    const [priceRange, setPriceRange] = useState([0, 500]);

    // Input testuali "liberi" per stile Amazon
    const [minPriceInput, setMinPriceInput] = useState("");
    const [maxPriceInput, setMaxPriceInput] = useState("");

    const [utilities, setUtilities] = useState([]);
    const [categories, setCategories] = useState([]);
    const [sortOrder, setSortOrder] = useState("id_asc");

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
            utility: newUtilities.length ? newUtilities.join(",") : undefined,
            category: newCategories.length ? newCategories.join(",") : undefined,
            sort: newSortOrder,
        });
    };

    const toggleUtility = (value) => {
        const updated = utilities.includes(value)
            ? utilities.filter((u) => u !== value)
            : [...utilities, value];
        setUtilities(updated);
        triggerFilter({ newUtilities: updated });
    };

    const toggleCategory = (value) => {
        const updated = categories.includes(value)
            ? categories.filter((c) => c !== value)
            : [...categories, value];
        setCategories(updated);
        triggerFilter({ newCategories: updated });
    };

    const handleMinPriceChange = (e) => {
        const value = e.target.value;
        // Permetti input vuoto o numeri SENZA formattazioni strane
        if (/^\d*$/.test(value)) setMinPriceInput(value);
    };

    const handleMaxPriceChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) setMaxPriceInput(value);
    };

    const applyPriceFilter = () => {
        const min = minPriceInput === "" ? 0 : Number(minPriceInput);
        const max = maxPriceInput === "" ? 999999 : Number(maxPriceInput);

        const newRange = [min, max];
        setPriceRange(newRange);
        triggerFilter({ newPriceRange: newRange });
    };

    const onPriceKeyDown = (e) => {
        if (e.key === "Enter") applyPriceFilter();
    };

    return (
        <>
            {/* Bottone per aprire i filtri */}
            <button
                className="filters-toggle-btn"
                onClick={() => setSidebarOpen(true)}
            >
                <VscSettings />
            </button>

            {/* Overlay */}
            <div
                className={`filters-overlay ${sidebarOpen ? "open" : ""}`}
                onClick={() => setSidebarOpen(false)}
            ></div>

            {/* Sidebar */}
            <aside
                className={`products-filter-sidebar-collapsible ${sidebarOpen ? "open" : ""}`}
            >
                <div className="filters-header">
                    <h3>Filtri</h3>
                    <button
                        className="filters-close-btn"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <LuCannabis />
                    </button>
                </div>

                <div className="filters-body">

                    {/* Ricerca */}
                    <input
                        type="text"
                        placeholder="Cerca per nome..."
                        value={search}
                        onChange={(e) => {
                            const v = e.target.value;
                            setSearch(v);
                            triggerFilter({ newSearch: v });
                        }}
                    />

                    {/* Prezzo */}
                    <div className="filter-block">
                        <label>Prezzo:</label>

                        <div className="price-inputs">
                            <input
                                type="number"
                                placeholder="Min"
                                value={minPriceInput}
                                onChange={handleMinPriceChange}
                                onBlur={applyPriceFilter}
                                onKeyDown={onPriceKeyDown}
                            />

                            <input
                                type="number"
                                placeholder="Max"
                                value={maxPriceInput}
                                onChange={handleMaxPriceChange}
                                onBlur={applyPriceFilter}
                                onKeyDown={onPriceKeyDown}
                            />
                        </div>
                    </div>

                    {/* Utilità */}
                    <div className="filter-block">
                        <h4>Utilità:</h4>
                        {utilityOptions.map((opt) => (
                            <label key={opt.value} className="filter-switch">
                                <Switch
                                    animation="smooth"
                                    checked={utilities.includes(opt.value)}
                                    onChange={() => toggleUtility(opt.value)}
                                />
                                {opt.label}
                            </label>


                        ))}
                    </div>

                    {/* Categorie */}
                    <div className="filter-block">
                        <h4>Categorie:</h4>
                        {categoryOptions.map((opt) => (
                            <label key={opt.value} className="filter-switch">
                                <Switch
                                    animation="smooth"
                                    checked={categories.includes(opt.value)}
                                    onChange={() => toggleCategory(opt.value)}
                                />
                                {opt.label}
                            </label>
                        ))}
                    </div>

                    {/* Ordinamento */}
                    <div className="filter-block">
                        <label>Ordina per:</label>
                        <select
                            value={sortOrder}
                            onChange={(e) => {
                                setSortOrder(e.target.value);
                                triggerFilter({ newSortOrder: e.target.value });
                            }}
                        >
                            <option value="id_desc">Più Recenti</option>
                            <option value="id_asc">Meno Recenti</option>
                            <option value="price_asc">Prezzo Crescente</option>
                            <option value="price_desc">Prezzo Decrescente</option>
                        </select>
                    </div>

                </div>
            </aside>
        </>
    );
}
