import { useState } from "react";
import "rc-slider/assets/index.css";
import "../../styles/ProductFilters.css";
import { LuCannabis } from "react-icons/lu";
import { Switch } from "pretty-checkbox-react";
import "pretty-checkbox/dist/pretty-checkbox.min.css";
import { VscSettings } from "react-icons/vsc";
import { BiAccessibility } from "react-icons/bi";
import { FaHome, FaTshirt, FaGift } from "react-icons/fa";
import { FaMicrochip, FaKitchenSet } from "react-icons/fa6";
import { MdSportsBasketball } from "react-icons/md";
import { PiOfficeChairFill } from "react-icons/pi";

// Opzioni per la "utilità" con icone e valori da 1 a 5
const utilityOptions = [
  { label: <BiAccessibility />, value: 1 },
  {
    label: (
      <>
        <BiAccessibility />
        <BiAccessibility />
      </>
    ),
    value: 2,
  },
  {
    label: (
      <>
        <BiAccessibility />
        <BiAccessibility />
        <BiAccessibility />
      </>
    ),
    value: 3,
  },
  {
    label: (
      <>
        <BiAccessibility />
        <BiAccessibility />
        <BiAccessibility />
        <BiAccessibility />
      </>
    ),
    value: 4,
  },
  {
    label: (
      <>
        <BiAccessibility />
        <BiAccessibility />
        <BiAccessibility />
        <BiAccessibility />
        <BiAccessibility />
      </>
    ),
    value: 5,
  },
];

// Opzioni delle categorie con icona e valore numerico
const categoryOptions = [
  {
    label: (
      <>
        Casa e Arredo <FaHome />
      </>
    ),
    value: 1,
  },
  {
    label: (
      <>
        Tecnologia Inutile <FaMicrochip />
      </>
    ),
    value: 2,
  },
  {
    label: (
      <>
        Accessori e Moda <FaTshirt />
      </>
    ),
    value: 3,
  },
  {
    label: (
      <>
        Cucina e Tavola <FaKitchenSet />
      </>
    ),
    value: 4,
  },
  {
    label: (
      <>
        Tempo libero & Regali <FaGift />
      </>
    ),
    value: 5,
  },
  {
    label: (
      <>
        Sport Outdoor <MdSportsBasketball />
      </>
    ),
    value: 6,
  },
  {
    label: (
      <>
        Ufficio & Studio <PiOfficeChairFill />
      </>
    ),
    value: 7,
  },
];

export default function ProductFilters({ onFilter }) {
  // Stato per apertura sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // Stato per la ricerca testuale
  const [search, setSearch] = useState("");

  // Stato per il range prezzo effettivo inviato al backend
  const [priceRange, setPriceRange] = useState([0, 500]);

  // Stato degli input di testo del prezzo: min e max
  const [minPriceInput, setMinPriceInput] = useState("");
  const [maxPriceInput, setMaxPriceInput] = useState("");

  // Stato errori prezzo (per gestione errore UX)
  const [priceError, setPriceError] = useState(null);

  // Stato per filtri utilità e categoria
  const [utilities, setUtilities] = useState([]);
  const [categories, setCategories] = useState([]);
  // Stato ordinamento prodotto (default: id crescente)
  const [sortOrder, setSortOrder] = useState("id_asc");

  // Funzione per inviare i filtri attuali al parent
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

  // Aggiungi o rimuovi un valore utility dal filtro
  const toggleUtility = (value) => {
    const updated = utilities.includes(value)
      ? utilities.filter((u) => u !== value)
      : [...utilities, value];
    setUtilities(updated);
    triggerFilter({ newUtilities: updated });
  };

  // Aggiungi o rimuovi un valore categoria dal filtro
  const toggleCategory = (value) => {
    const updated = categories.includes(value)
      ? categories.filter((c) => c !== value)
      : [...categories, value];
    setCategories(updated);
    triggerFilter({ newCategories: updated });
  };

  // Gestisce input prezzo minimo (ammessi solo numeri e vuoto)
  const handleMinPriceChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) setMinPriceInput(value);
  };
  // Gestisce input prezzo massimo (ammessi solo numeri e vuoto)
  const handleMaxPriceChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) setMaxPriceInput(value);
  };

  // Quando confermo/bluro/applico filtro prezzo
  const applyPriceFilter = () => {
    // Converto input di testo in numeri
    const min = minPriceInput === "" ? 0 : Number(minPriceInput);
    const max = maxPriceInput === "" ? 999999 : Number(maxPriceInput);

    // Se massimo < minimo, mostro errore e non filtro
    if (max < min) {
      setPriceError(
        "Il prezzo massimo deve essere maggiore o uguale al minimo"
      );
      return;
    }
    setPriceError(null); // reset dell'errore

    // Cambio range di prezzo e invio nuovo filtro
    const newRange = [min, max];
    setPriceRange(newRange);
    triggerFilter({ newPriceRange: newRange });
  };

  // Filtro prezzo anche se premi ENTER
  const onPriceKeyDown = (e) => {
    if (e.key === "Enter") applyPriceFilter();
  };

  return (
    <>
      {/* Bottone apri filtri sulla sidebar */}
      <button
        className="filters-toggle-btn"
        onClick={() => setSidebarOpen(true)}
      >
        <VscSettings />
      </button>

      {/* Overlay per chiudere la sidebar */}
      <div
        className={`filters-overlay ${sidebarOpen ? "open" : ""}`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Sidebar filtri */}
      <aside
        className={`products-filter-sidebar-collapsible ${
          sidebarOpen ? "open" : ""
        }`}
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
          {/* Campo ricerca testuale */}
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

          {/* Filtri prezzo */}
          <div className="filter-block">
            <label>Prezzo:</label>
            <div className="price-inputs">
              {/* Input prezzo minimo */}
              <input
                type="number"
                placeholder="Min"
                value={minPriceInput}
                max={maxPriceInput || undefined} // Blocca min > max (se max è valorizzato)
                onChange={handleMinPriceChange}
                onBlur={applyPriceFilter}
                onKeyDown={onPriceKeyDown}
              />
              {/* Input prezzo massimo */}
              <input
                type="number"
                placeholder="Max"
                value={maxPriceInput}
                min={minPriceInput || 0} // Blocca max < min
                onChange={handleMaxPriceChange}
                onBlur={applyPriceFilter}
                onKeyDown={onPriceKeyDown}
              />
            </div>
            {/* Messaggio di errore se max < min */}
            {priceError && (
              <div
                className="input-error"
                style={{ color: "red", marginTop: 4 }}
              >
                {priceError}
              </div>
            )}
          </div>

          {/* Filtra per utilità */}
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

          {/* Filtra per categoria */}
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
