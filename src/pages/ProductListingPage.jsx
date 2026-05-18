import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import FadeIn from "../components/FadeIn";
import { PRODUCTS } from "../data/flowers";
import { palette } from "../utils/constants";
import { SlidersHorizontal, X, Search, RotateCcw } from "lucide-react";

export default function ProductListingPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [selectedFlowerTypes, setSelectedFlowerTypes] = useState([]);
  const [selectedOccasions, setSelectedOccasions] = useState([]);
  const [selectedRelationships, setSelectedRelationships] = useState([]);
  const [selectedDeliveryTypes, setSelectedDeliveryTypes] = useState([]);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Sync Same-Day Delivery parameter from Navbar
  useEffect(() => {
    if (location.search.includes("filter=sameday")) {
      setSelectedDeliveryTypes(["Same-day"]);
      // Clear other filters when shifting to same-day landing
      setSelectedPriceRange("all");
      setSelectedFlowerTypes([]);
      setSelectedOccasions([]);
      setSelectedRelationships([]);
    } else {
      if (location.search === "") {
        setSelectedDeliveryTypes([]);
      }
    }
  }, [location.search]);

  // Utility toggler
  const toggleFilter = (list, setList, value) => {
    if (list.includes(value)) {
      setList(list.filter((x) => x !== value));
    } else {
      setList([...list, value]);
    }
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedPriceRange("all");
    setSelectedFlowerTypes([]);
    setSelectedOccasions([]);
    setSelectedRelationships([]);
    setSelectedDeliveryTypes([]);
    if (location.search.includes("filter=sameday")) {
      navigate("/shop");
    }
  };

  const activeFiltersCount = 
    (selectedPriceRange !== "all" ? 1 : 0) +
    selectedFlowerTypes.length +
    selectedOccasions.length +
    selectedRelationships.length +
    selectedDeliveryTypes.length +
    (searchQuery ? 1 : 0);

  // Advanced Natural Search & Faceted Filter matching
  const filtered = PRODUCTS.filter((p) => {
    // 1. Search Matching
    const query = searchQuery.toLowerCase().trim();
    let matchesSearch = true;
    if (query) {
      const matchesName = p.name.toLowerCase().includes(query);
      const matchesDesc = p.desc.toLowerCase().includes(query);
      const matchesCategory = p.category.toLowerCase().includes(query);
      const matchesFlowerType = p.flowerType && p.flowerType.toLowerCase().includes(query);
      
      // Synonym Parsers
      const isRoseSearch = query.includes("rose");
      const isRedSearch = query.includes("red");
      const isBirthdaySearch = query.includes("birthday") || query.includes("bday") || query.includes("birth");
      const isAnniversarySearch = query.includes("anniversary") || query.includes("gift") || query.includes("wedding") || query.includes("marriage");

      const matchBySynonym = 
        (isRoseSearch && p.flowerType === "Roses") ||
        (isRedSearch && p.desc.toLowerCase().includes("red")) ||
        (isBirthdaySearch && p.occasions && p.occasions.includes("Birthday")) ||
        (isAnniversarySearch && p.occasions && (p.occasions.includes("Anniversary") || p.occasions.includes("Wedding")));

      matchesSearch = matchesName || matchesDesc || matchesCategory || matchesFlowerType || matchBySynonym;
    }

    // 2. Price Matching
    let matchesPrice = true;
    if (selectedPriceRange === "500-1000") {
      matchesPrice = p.price >= 500 && p.price <= 1000;
    } else if (selectedPriceRange === "1000-3000") {
      matchesPrice = p.price >= 1000 && p.price <= 3000;
    } else if (selectedPriceRange === "3000+") {
      matchesPrice = p.price >= 3000;
    }

    // 3. Flower Type Matching (p.category maps directly here)
    const matchesFlower = 
      selectedFlowerTypes.length === 0 || 
      selectedFlowerTypes.includes(p.category);

    // 4. Occasion Matching
    const matchesOccasion = 
      selectedOccasions.length === 0 || 
      (p.occasions && p.occasions.some(o => selectedOccasions.includes(o)));

    // 5. Relationship Matching
    const matchesRelationship = 
      selectedRelationships.length === 0 || 
      (p.relationships && p.relationships.some(r => selectedRelationships.includes(r)));

    // 6. Delivery Type Matching
    const matchesDelivery = 
      selectedDeliveryTypes.length === 0 || 
      (p.deliveryTypes && p.deliveryTypes.some(d => selectedDeliveryTypes.includes(d)));

    return matchesSearch && matchesPrice && matchesFlower && matchesOccasion && matchesRelationship && matchesDelivery;
  });

  const isSameDayLanding = location.search.includes("filter=sameday");

  const renderFilterSections = () => {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        {/* Title */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1.5px solid rgba(158, 129, 214, 0.15)", paddingBottom: 10 }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: palette.text, display: "flex", alignItems: "center", gap: 8 }}>
            <SlidersHorizontal size={16} color={palette.blushMid} /> Filters
          </span>
          {activeFiltersCount > 0 && (
            <button 
              onClick={handleResetFilters} 
              style={{ background: "none", border: "none", color: palette.blushMid, fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: 4, textTransform: "uppercase", letterSpacing: 0.5 }}
            >
              Reset ({activeFiltersCount})
            </button>
          )}
        </div>

        {/* Search */}
        <div>
          <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10.5, fontWeight: 600, color: palette.textMuted, display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Search Collection</label>
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", display: "flex", alignItems: "center", opacity: 0.5 }}>
              <Search size={14} />
            </span>
            <input 
              type="text" 
              placeholder="e.g. Roses, Birthday, Red..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 32px 10px 34px",
                borderRadius: 10,
                border: "1.5px solid rgba(158, 129, 214, 0.18)",
                background: "#fff",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                color: palette.text,
                outline: "none",
                boxSizing: "border-box",
                transition: "border-color 0.2s ease"
              }}
              onFocus={(e) => e.target.style.borderColor = palette.blushMid}
              onBlur={(e) => e.target.style.borderColor = "rgba(158, 129, 214, 0.18)"}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", fontSize: 12, cursor: "pointer", color: palette.textMuted, display: "flex", alignItems: "center", padding: 0 }}
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Price filter */}
        <div>
          <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10.5, fontWeight: 600, color: palette.textMuted, display: "block", marginBottom: 10, textTransform: "uppercase", letterSpacing: 1 }}>Price Range</label>
          <div style={{ display: "flex", flexDirection: "column", gap: 7.5 }}>
            {[
              { label: "All Prices", value: "all" },
              { label: "₹500 – ₹1000", value: "500-1000" },
              { label: "₹1000 – ₹3000", value: "1000-3000" },
              { label: "₹3000+", value: "3000+" }
            ].map((pOpt) => {
              const isSelected = selectedPriceRange === pOpt.value;
              return (
                <label 
                  key={pOpt.value} 
                  style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: isSelected ? palette.text : palette.textMuted, cursor: "pointer", fontWeight: isSelected ? 500 : 400, userSelect: "none" }}
                >
                  <input 
                    type="radio" 
                    name="priceRange" 
                    checked={isSelected}
                    onChange={() => setSelectedPriceRange(pOpt.value)}
                    style={{ accentColor: palette.blushMid, cursor: "pointer", width: 14, height: 14 }}
                  />
                  {pOpt.label}
                </label>
              );
            })}
          </div>
        </div>

        {/* Flower Type */}
        <div>
          <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10.5, fontWeight: 600, color: palette.textMuted, display: "block", marginBottom: 10, textTransform: "uppercase", letterSpacing: 1 }}>Flower Type</label>
          <div style={{ display: "flex", flexDirection: "column", gap: 7.5 }}>
            {["Roses", "Lilies", "Orchids", "Carnations"].map((ft) => {
              const isChecked = selectedFlowerTypes.includes(ft);
              return (
                <label 
                  key={ft} 
                  style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: isChecked ? palette.text : palette.textMuted, cursor: "pointer", fontWeight: isChecked ? 500 : 400, userSelect: "none" }}
                >
                  <input 
                    type="checkbox" 
                    checked={isChecked}
                    onChange={() => toggleFilter(selectedFlowerTypes, setSelectedFlowerTypes, ft)}
                    style={{ accentColor: palette.blushMid, cursor: "pointer", width: 14, height: 14 }}
                  />
                  {ft}
                </label>
              );
            })}
          </div>
        </div>

        {/* Occasion */}
        <div>
          <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10.5, fontWeight: 600, color: palette.textMuted, display: "block", marginBottom: 10, textTransform: "uppercase", letterSpacing: 1 }}>Occasion</label>
          <div style={{ display: "flex", flexDirection: "column", gap: 7.5 }}>
            {["Birthday", "Wedding", "Anniversary"].map((occ) => {
              const isChecked = selectedOccasions.includes(occ);
              return (
                <label 
                  key={occ} 
                  style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: isChecked ? palette.text : palette.textMuted, cursor: "pointer", fontWeight: isChecked ? 500 : 400, userSelect: "none" }}
                >
                  <input 
                    type="checkbox" 
                    checked={isChecked}
                    onChange={() => toggleFilter(selectedOccasions, setSelectedOccasions, occ)}
                    style={{ accentColor: palette.blushMid, cursor: "pointer", width: 14, height: 14 }}
                  />
                  {occ}
                </label>
              );
            })}
          </div>
        </div>

        {/* Relationship */}
        <div>
          <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10.5, fontWeight: 600, color: palette.textMuted, display: "block", marginBottom: 10, textTransform: "uppercase", letterSpacing: 1 }}>Relationship</label>
          <div style={{ display: "flex", flexDirection: "column", gap: 7.5 }}>
            {["Friend", "Wife", "Husband", "Mother", "Sister"].map((rel) => {
              const isChecked = selectedRelationships.includes(rel);
              return (
                <label 
                  key={rel} 
                  style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: isChecked ? palette.text : palette.textMuted, cursor: "pointer", fontWeight: isChecked ? 500 : 400, userSelect: "none" }}
                >
                  <input 
                    type="checkbox" 
                    checked={isChecked}
                    onChange={() => toggleFilter(selectedRelationships, setSelectedRelationships, rel)}
                    style={{ accentColor: palette.blushMid, cursor: "pointer", width: 14, height: 14 }}
                  />
                  {rel}
                </label>
              );
            })}
          </div>
        </div>

        {/* Delivery Type */}
        <div>
          <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10.5, fontWeight: 600, color: palette.textMuted, display: "block", marginBottom: 10, textTransform: "uppercase", letterSpacing: 1 }}>Delivery Type</label>
          <div style={{ display: "flex", flexDirection: "column", gap: 7.5 }}>
            {["Same-day", "Midnight", "Express", "International"].map((del) => {
              const isChecked = selectedDeliveryTypes.includes(del);
              return (
                <label 
                  key={del} 
                  style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: isChecked ? palette.text : palette.textMuted, cursor: "pointer", fontWeight: isChecked ? 500 : 400, userSelect: "none" }}
                >
                  <input 
                    type="checkbox" 
                    checked={isChecked}
                    onChange={() => toggleFilter(selectedDeliveryTypes, setSelectedDeliveryTypes, del)}
                    style={{ accentColor: palette.blushMid, cursor: "pointer", width: 14, height: 14 }}
                  />
                  {del}
                </label>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ paddingTop: 72, minHeight: "100vh", background: palette.cream }}>
      {/* Dynamic Luxury Banner */}
      <div
        style={{
          background: `linear-gradient(135deg, ${palette.blushLight}40 0%, ${palette.lavenderLight}40 60%, ${palette.champagne || "#F5ECD7"}30 100%)`,
          padding: "clamp(32px, 5vw, 60px) clamp(16px, 4vw, 48px)",
          borderBottom: "1px solid rgba(158, 129, 214, 0.15)",
        }}
      >
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 11,
              fontWeight: 700,
              color: palette.blushMid,
              letterSpacing: 2.5,
              textTransform: "uppercase",
              display: "block",
              marginBottom: 10,
            }}
          >
            {isSameDayLanding ? "Express Curation" : "Handpicked with intention"}
          </span>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(30px, 4.5vw, 46px)",
              fontWeight: 600,
              color: palette.text,
              margin: "0 0 8px",
              letterSpacing: "-0.5px",
              lineHeight: 1.1,
            }}
          >
            {isSameDayLanding ? "Same-Day Delivery Collection" : "The Floradelic Catalog"}
          </h1>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14.5,
              color: palette.textMuted,
              margin: 0,
              fontWeight: 400,
            }}
          >
            {isSameDayLanding 
              ? "Speedy delivery options crafted to bring instant moments of joy and luxury." 
              : `${PRODUCTS.length} exceptionally crafted floral arrangements.`}
          </p>
        </div>
      </div>

      {/* Main Filter & Listing Content */}
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "32px clamp(16px, 4vw, 48px)" }}>
        {/* Mobile Sticky Action Bar */}
        <div
          style={{
            display: "none",
            justifyContent: "space-between",
            alignItems: "center",
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(12px)",
            padding: "12px 18px",
            borderRadius: 14,
            marginBottom: 24,
            border: "1px solid rgba(158, 129, 214, 0.2)",
            boxShadow: "0 8px 32px rgba(158, 129, 214, 0.06)",
          }}
          className="mobile-filter-bar"
        >
          <button
            onClick={() => setIsMobileFiltersOpen(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "none",
              border: "none",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13.5,
              fontWeight: 600,
              color: palette.text,
              cursor: "pointer",
            }}
          >
            <SlidersHorizontal size={15} color={palette.blushMid} />
            Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
          </button>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: palette.textMuted }}>
            {filtered.length} products
          </span>
        </div>

        {/* Core Layout Grid */}
        <div style={{ display: "flex", gap: 32, alignItems: "flex-start", position: "relative" }}>
          
          {/* DESKTOP SIDEBAR FILTERS (Sticky) */}
          <div
            data-lenis-prevent
            style={{
              width: 280,
              flexShrink: 0,
              background: "rgba(255, 255, 255, 0.7)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(158, 129, 214, 0.18)",
              borderRadius: 20,
              padding: "24px 20px",
              boxShadow: "0 10px 40px rgba(158, 129, 214, 0.04)",
              position: "sticky",
              top: 92,
              zIndex: 30,
              maxHeight: "calc(100vh - 120px)",
              overflowY: "auto",
              boxSizing: "border-box"
            }}
            className="desktop-sidebar"
          >
            {renderFilterSections()}
          </div>

          {/* RIGHT AREA: Active tags + Grid */}
          <div style={{ flex: 1 }}>
            
            {/* Active filter pill tags row */}
            {activeFiltersCount > 0 && (
              <div 
                style={{ 
                  display: "flex", 
                  gap: 8, 
                  flexWrap: "wrap", 
                  marginBottom: 20, 
                  alignItems: "center" 
                }}
              >
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11.5, fontWeight: 600, color: palette.textMuted, textTransform: "uppercase", letterSpacing: 0.5 }}>Active:</span>
                
                {searchQuery && (
                  <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 12px", borderRadius: 100, background: palette.blushLight, color: palette.text, fontSize: 12, fontFamily: "'DM Sans', sans-serif", border: "1px solid rgba(158,129,214,0.15)" }}>
                    Search: "{searchQuery}"
                    <button onClick={() => setSearchQuery("")} style={{ background: "none", border: "none", padding: 0, cursor: "pointer", display: "flex", alignItems: "center", color: palette.textMuted }}><X size={12} /></button>
                  </div>
                )}
                {selectedPriceRange !== "all" && (
                  <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 12px", borderRadius: 100, background: palette.blushLight, color: palette.text, fontSize: 12, fontFamily: "'DM Sans', sans-serif", border: "1px solid rgba(158,129,214,0.15)" }}>
                    Price: {selectedPriceRange === "3000+" ? "₹3000+" : `₹${selectedPriceRange.replace("-", "–₹")}`}
                    <button onClick={() => setSelectedPriceRange("all")} style={{ background: "none", border: "none", padding: 0, cursor: "pointer", display: "flex", alignItems: "center", color: palette.textMuted }}><X size={12} /></button>
                  </div>
                )}
                {selectedFlowerTypes.map((ft) => (
                  <div key={ft} style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 12px", borderRadius: 100, background: palette.blushLight, color: palette.text, fontSize: 12, fontFamily: "'DM Sans', sans-serif", border: "1px solid rgba(158,129,214,0.15)" }}>
                    Type: {ft}
                    <button onClick={() => toggleFilter(selectedFlowerTypes, setSelectedFlowerTypes, ft)} style={{ background: "none", border: "none", padding: 0, cursor: "pointer", display: "flex", alignItems: "center", color: palette.textMuted }}><X size={12} /></button>
                  </div>
                ))}
                {selectedOccasions.map((occ) => (
                  <div key={occ} style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 12px", borderRadius: 100, background: palette.blushLight, color: palette.text, fontSize: 12, fontFamily: "'DM Sans', sans-serif", border: "1px solid rgba(158,129,214,0.15)" }}>
                    Occasion: {occ}
                    <button onClick={() => toggleFilter(selectedOccasions, setSelectedOccasions, occ)} style={{ background: "none", border: "none", padding: 0, cursor: "pointer", display: "flex", alignItems: "center", color: palette.textMuted }}><X size={12} /></button>
                  </div>
                ))}
                {selectedRelationships.map((rel) => (
                  <div key={rel} style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 12px", borderRadius: 100, background: palette.blushLight, color: palette.text, fontSize: 12, fontFamily: "'DM Sans', sans-serif", border: "1px solid rgba(158,129,214,0.15)" }}>
                    For: {rel}
                    <button onClick={() => toggleFilter(selectedRelationships, setSelectedRelationships, rel)} style={{ background: "none", border: "none", padding: 0, cursor: "pointer", display: "flex", alignItems: "center", color: palette.textMuted }}><X size={12} /></button>
                  </div>
                ))}
                {selectedDeliveryTypes.map((del) => (
                  <div key={del} style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 12px", borderRadius: 100, background: palette.blushLight, color: palette.text, fontSize: 12, fontFamily: "'DM Sans', sans-serif", border: "1px solid rgba(158,129,214,0.15)" }}>
                    Delivery: {del}
                    <button onClick={() => toggleFilter(selectedDeliveryTypes, setSelectedDeliveryTypes, del)} style={{ background: "none", border: "none", padding: 0, cursor: "pointer", display: "flex", alignItems: "center", color: palette.textMuted }}><X size={12} /></button>
                  </div>
                ))}

                <button 
                  onClick={handleResetFilters}
                  style={{ background: "none", border: "none", color: palette.textMuted, fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5, padding: "4px 8px", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}
                >
                  <RotateCcw size={11} /> Clear All
                </button>
              </div>
            )}

            {/* Results Grid count banner */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: palette.textMuted }}>
                Showing <b>{filtered.length}</b> of {PRODUCTS.length} curated luxury items
              </span>
            </div>

            {/* Product grid */}
            {filtered.length > 0 ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                  gap: 24,
                }}
              >
                {filtered.map((p, i) => (
                  <FadeIn key={p.id} delay={Math.min(i * 0.04, 0.3)}>
                    <ProductCard product={p} />
                  </FadeIn>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ 
                  textAlign: "center", 
                  padding: "80px 24px",
                  background: "rgba(255,255,255,0.6)",
                  borderRadius: 20,
                  border: "1px dashed rgba(158,129,214,0.25)"
                }}
              >
                <div style={{ fontSize: 52, marginBottom: 16, userSelect: "none" }}>🌸</div>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 26,
                    color: palette.text,
                    marginBottom: 8,
                  }}
                >
                  No match found in our garden
                </h3>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 14,
                    color: palette.textMuted,
                    marginBottom: 24,
                    maxWidth: 360,
                    margin: "0 auto 24px"
                  }}
                >
                  We couldn't find any flower arrangements matching your active filters. Try resetting to view all luxury options.
                </p>
                <button
                  onClick={handleResetFilters}
                  style={{
                    background: `linear-gradient(135deg, ${palette.blushMid}, ${palette.blushDeep || "#D0788A"})`,
                    color: "#fff",
                    border: "none",
                    borderRadius: 100,
                    padding: "12px 28px",
                    fontSize: 13.5,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    boxShadow: "0 6px 20px rgba(158,129,214,0.35)",
                  }}
                >
                  Clear Active Filters
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER FILTERS (Left slide-in overlay) */}
      <AnimatePresence>
        {isMobileFiltersOpen && (
          <>
            {/* Backdrop blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFiltersOpen(false)}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(45, 31, 40, 0.4)",
                backdropFilter: "blur(4px)",
                zIndex: 999,
              }}
            />

            {/* Sliding Panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "min(320px, 85vw)",
                height: "100%",
                background: palette.cream,
                zIndex: 1000,
                boxShadow: "10px 0 40px rgba(0,0,0,0.15)",
                padding: "24px 20px",
                display: "flex",
                flexDirection: "column",
                boxSizing: "border-box",
              }}
            >
              {/* Header inside Mobile Drawer */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 600, color: palette.text }}>Filters</span>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  style={{
                    background: "none",
                    border: "none",
                    padding: 4,
                    cursor: "pointer",
                    color: palette.text,
                    display: "flex",
                    alignItems: "center"
                  }}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Scrollable mobile filter options */}
              <div data-lenis-prevent style={{ flex: 1, overflowY: "auto", paddingRight: 4 }}>
                {renderFilterSections()}
              </div>

              {/* View results action CTA */}
              <div style={{ borderTop: "1px solid rgba(158,129,214,0.15)", paddingTop: 16, marginTop: 16 }}>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  style={{
                    width: "100%",
                    background: `linear-gradient(135deg, ${palette.blushMid}, ${palette.blushDeep || "#D0788A"})`,
                    color: "#fff",
                    border: "none",
                    borderRadius: 12,
                    padding: "12px",
                    fontSize: 14,
                    fontWeight: 600,
                    fontFamily: "'DM Sans', sans-serif",
                    cursor: "pointer",
                    boxShadow: "0 6px 20px rgba(158,129,214,0.3)"
                  }}
                >
                  Apply & View Results ({filtered.length})
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* CSS Styles for responsive media queries */}
      <style>{`
        @media (max-width: 1024px) {
          .desktop-sidebar {
            display: none !important;
          }
          .mobile-filter-bar {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
}
