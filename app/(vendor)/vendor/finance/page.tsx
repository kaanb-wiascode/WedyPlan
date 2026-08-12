import React from 'react';
import { requireVendorId } from "@/lib/auth/require-ids";
import VendorFinanceClient from '@/components/vendor/finance/VendorFinanceClient';
import { getVendorFinanceData } from '@/lib/actions/vendor-finance';

export default async function VendorFinancePage() {
  const vendorId = await requireVendorId();
  const { summary, transactions } = await getVendorFinanceData(vendorId);

  return (
    <VendorFinanceClient 
      initialSummary={summary || { totalRevenue: 0, collectedRevenue: 0, pendingRevenue: 0, overdueAmount: 0, currency: "EUR" }} 
      initialTransactions={transactions || []} 
    />
  );
}