import React from 'react';
import { requireVendorId } from "@/lib/auth/require-ids";
import VendorCalendarClient from '@/components/vendor/calendar/VendorCalendarClient';
import { getVendorCalendarEvents } from '@/lib/actions/vendor-calendar';

export default async function VendorCalendarPage() {
  const vendorId = await requireVendorId();
  const { events } = await getVendorCalendarEvents(vendorId);

  return <VendorCalendarClient initialEvents={events || []} vendorId={vendorId} />;
}