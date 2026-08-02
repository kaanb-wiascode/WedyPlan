import React from 'react';
import VendorFinanceClient from '@/components/vendor/finance/VendorFinanceClient';
import { getVendorFinanceData } from '@/lib/actions/vendor-finance';

export default async function VendorFinancePage() {
  const { summary, transactions } = await getVendorFinanceData("vendor_default");

  return (
    <VendorFinanceClient 
      initialSummary={summary || { totalRevenue: 0, collectedRevenue: 0, pendingRevenue: 0, overdueAmount: 0, currency: "EUR" }} 
      initialTransactions={transactions || []} 
    />
  );
}