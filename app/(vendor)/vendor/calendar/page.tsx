import React from 'react';
import VendorCalendarClient from '@/components/vendor/calendar/VendorCalendarClient';
import { getVendorCalendarEvents } from '@/lib/actions/vendor-calendar';

export default async function VendorCalendarPage() {
  const { events } = await getVendorCalendarEvents("vendor_default");

  return <VendorCalendarClient initialEvents={events || []} vendorId="vendor_default" />;
}