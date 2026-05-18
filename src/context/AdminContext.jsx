import { createContext, useState, useEffect } from "react";

export const AdminContext = createContext();

// Mock data
const MOCK_ORDERS = [
  { id: "PK-102938", customer: "Aarav Sharma", total: 2499, status: "Pending", type: "Midnight", date: "2026-05-18", items: 2 },
  { id: "PK-293847", customer: "Priya Patel", total: 1299, status: "Preparing", type: "Standard", date: "2026-05-18", items: 1 },
  { id: "PK-384756", customer: "Rohan Gupta", total: 3499, status: "Out for Delivery", type: "Express", date: "2026-05-18", items: 3 },
  { id: "PK-475665", customer: "Sneha Reddy", total: 899, status: "Delivered", type: "Standard", date: "2026-05-17", items: 1 },
  { id: "PK-566574", customer: "Karan Singh", total: 1899, status: "Cancelled", type: "Standard", date: "2026-05-17", items: 1 },
];

const MOCK_RIDERS = [
  { id: "R1", name: "Vikram", status: "Active", deliveries: 4, location: "Connaught Place" },
  { id: "R2", name: "Rahul", status: "Available", deliveries: 0, location: "Saket" },
  { id: "R3", name: "Amit", status: "Active", deliveries: 2, location: "Vasant Kunj" },
  { id: "R4", name: "Suresh", status: "Offline", deliveries: 8, location: "Dwarka" },
];

const MOCK_SLOTS = [
  { id: "S1", label: "6 AM – 9 AM", type: "Standard", capacity: 50, booked: 48, active: true },
  { id: "S2", label: "9 AM – 12 PM", type: "Standard", capacity: 100, booked: 75, active: true },
  { id: "S3", label: "12 PM – 3 PM", type: "Standard", capacity: 100, booked: 90, active: true },
  { id: "S4", label: "3 PM – 6 PM", type: "Standard", capacity: 80, booked: 80, active: false },
  { id: "S5", label: "6 PM – 9 PM", type: "Standard", capacity: 100, booked: 30, active: true },
  { id: "S6", label: "Midnight (11:30 PM - 12:30 AM)", type: "Midnight", capacity: 30, booked: 12, active: true },
  { id: "S7", label: "2-Hour Express", type: "Express", capacity: 20, booked: 5, active: true },
];

export function AdminProvider({ children }) {
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [riders, setRiders] = useState(MOCK_RIDERS);
  const [slots, setSlots] = useState(MOCK_SLOTS);
  const [pricingRules, setPricingRules] = useState({
    expressFee: 250,
    midnightFee: 350,
    freeDeliveryThreshold: 2000,
  });

  const toggleSlotStatus = (id) => {
    setSlots((prev) =>
      prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s))
    );
  };

  const updatePricingRule = (key, value) => {
    setPricingRules((prev) => ({ ...prev, [key]: value }));
  };

  const updateOrderStatus = (id, status) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o))
    );
  };

  return (
    <AdminContext.Provider
      value={{
        orders,
        riders,
        slots,
        pricingRules,
        toggleSlotStatus,
        updatePricingRule,
        updateOrderStatus,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}
