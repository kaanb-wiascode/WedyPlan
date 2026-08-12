import React from 'react';
import { VendorLeadsClient } from '@/components/vendor/leads/VendorLeadsClient';
import { getVendorLeads } from '@/lib/actions/vendor-leads';

export default async function VendorLeadsPage() {
  const { leads } = await getVendorLeads();

  return <VendorLeadsClient initialLeads={leads || []} />;
}