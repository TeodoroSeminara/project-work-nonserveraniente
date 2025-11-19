import { useState, useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const utilityOptions = [
    { label: "Utilità 1", value: 1 },
    { label: "Utilità 2", value: 2 },
    { label: "Utilità 3", value: 3 },
    { label: "Utilità 4", value: 4 },
    { label: "Utilità 5", value: 5 }
];

export default function ProductFilters({ categoriesFromDb, onFilter }) {
    const [search, setSearch] = useState("");
    const [priceRange, setPriceRange] = useState([0, 100]); // adatta al tuo range prodotti!
    const [utilities, setUtilities] = useState([]);
    const [categories, setCategories] = useState([]);
    const [latest, setLatest] = useState(false);

    useEffect(() => {
        // caricamento categories dal padre/props
        setCategories([]); // di default nessuno selezionato
    }, [categoriesFromDb]);

    // Utility (valori int)
    const handleChangeUtility = (val) => {
        setUtilities(utilities.includes(val)
            ? utilities.filter(u => u !== val)
            : [...utilities, val]);
    };

    // Categories (id int)
    const handleChangeCategory = (val) => {
        setCategories(categories.includes(val)
            ? categories.filter(c => c !== val)
            : [...categories, val]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onFilter({
            name: search,
            price_min: priceRange[0],
            price_max: priceRange[1],
            utility: utilities.length > 0 ? utilities : undefined,
            category: categories.length > 0 ? categories : undefined,
            sort: latest ? "id_desc" : "",
        });
        // NON resettare lo stato!
    };

    return (
        <form className="products-filter-sidebar" onSubmit={handleSubmit}>
            <div>
                <input
                    type="text"
                    placeholder="Cerca per nome..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>
            <div style={{ margin: "0.5em 0" }}>
                <label>Prezzo:</label>
                <Slider
                    range
                    min={0}
                    max={500}
                    defaultValue={priceRange}
                    value={priceRange}
                    allowCross={false}
                    onChange={setPriceRange}
                    marks={{
                        0: "0€",
                        500: "500€"
                    }}
                />
                <span>
                    {priceRange[0]} € – {priceRange[1]} €
                </span>
            </div>
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
            <div>
                <span style={{ fontWeight: 600 }}>Categorie:</span>
                {categoriesFromDb && categoriesFromDb.map(cat => (
                    <label key={cat.id} style={{ display: "block" }}>
                        <input
                            type="checkbox"
                            checked={categories.includes(cat.id)}
                            onChange={() => handleChangeCategory(cat.id)}
                        />
                        {cat.name}
                    </label>
                ))}
            </div>
            <div>
                <label>
                    <input
                        type="checkbox"
                        checked={latest}
                        onChange={(e) => setLatest(e.target.checked)}
                    />
                    Ordina per ultimi arrivi
                </label>
            </div>
            <button type="submit">Applica</button>
        </form>
    );
}
