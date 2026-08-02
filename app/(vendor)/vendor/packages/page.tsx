import React from 'react';
import VendorPackagesClient from '@/components/vendor/packages/VendorPackagesClient';
import { getVendorPackages } from '@/lib/actions/vendor-packages';

export default async function VendorPackagesPage() {
  const { packages } = await getVendorPackages("vendor_default");

  return <VendorPackagesClient initialPackages={packages || []} />;
}