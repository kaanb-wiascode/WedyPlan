'use client';

import React, { useState } from 'react';
import { INITIAL_CONTRACTS } from '@/lib/vendor-contracts-constants';
import { Contract } from '@/types/vendor-contracts';
import { ContractCard } from '@/components/vendor/molecules/ContractCard';

export const ContractList: React.FC = () => {
  const [contracts] = useState<Contract[]>(INITIAL_CONTRACTS);

  return (
    <div className="space-y-4">
      {contracts.map((contract) => (
        <ContractCard key={contract.id} contract={contract} />
      ))}
    </div>
  );
};