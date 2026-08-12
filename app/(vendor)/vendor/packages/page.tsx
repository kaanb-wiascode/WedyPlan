import React from 'react';
import { requireVendorId } from "@/lib/auth/require-ids";
import VendorPackagesClient from '@/components/vendor/packages/VendorPackagesClient';
import { getVendorPackages } from '@/lib/actions/vendor-packages';

export default async function VendorPackagesPage() {
  const vendorId = await requireVendorId();
  const { packages } = await getVendorPackages(vendorId);

  return <VendorPackagesClient initialPackages={packages || []} />;
}