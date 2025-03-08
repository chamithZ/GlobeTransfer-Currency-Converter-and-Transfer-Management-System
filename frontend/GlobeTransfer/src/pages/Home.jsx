import CurrencyConverter from "../components/CurrencyConverter";
import TransferHistory from "../components/TransferHistory";
import { useState } from "react";

export default function Home() {
  const [transfers, setTransfers] = useState([]);

  const addTransfer = (transfer) => {
    setTransfers([...transfers, transfer]);
  };

  const removeTransfer = (id) => {
    setTransfers(transfers.filter((t) => t.id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 shadow-lg rounded-2xl mt-10 space-y-6">
      <h1 className="text-2xl md:text-3xl font-semibold text-center text-gray-800">🌍 Globe Transfer</h1>
      <CurrencyConverter onTransfer={addTransfer} />
      <TransferHistory transfers={transfers} onRemove={removeTransfer} />
    </div>
  );
}
