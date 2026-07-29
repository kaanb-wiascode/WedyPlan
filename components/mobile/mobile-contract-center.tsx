"use client";

import React, { useState, useEffect } from "react";
import { ShieldCheck } from "lucide-react";
import { MobileContractEngine, MobileContractData, ContractClause } from "@/lib/mobile/mobile-contract-engine";

export const MobileContractCenter: React.FC = () => {
  const [contract, setContract] = useState<MobileContractData | null>(null);

  useEffect(() => {
    MobileContractEngine.getContract().then((data: MobileContractData) => setContract(data));
  }, []);

  if (!contract) return null;

  return (
    <div className="p-4 space-y-4 font-sans text-xs">
      <div className="bg-[#111111] text-white p-6 rounded-3xl space-y-2">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
          Mobil E-İmza & Sözleşme Merkezi
        </h3>
        <p className="text-[11px] text-gray-300">
          Sözleşme ID: {contract.contractId} • {contract.partnerName} • {contract.isEsigned ? "E-İmzalı" : "İmza Bekliyor"}
        </p>
      </div>

      <div className="space-y-2">
        {contract.clauses.map((clause: ContractClause) => (
          <div key={clause.id} className="p-3 bg-gray-100 dark:bg-black/20 rounded-2xl">
            <span className="font-bold block">{clause.title}</span>
            <p className="text-[11px] text-gray-600">{clause.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
};