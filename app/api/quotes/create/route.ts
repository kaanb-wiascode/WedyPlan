import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { coupleId, vendorId, coupleName, vendorName, eventDate, budgetOffered, message } = await request.json();

    if (!coupleName || !vendorName) {
      return NextResponse.json({ error: 'Eksik parametre gönderildi.' }, { status: 400 });
    }

    // Supabase'e teklif talebini kaydet
    const { data, error } = await supabase
      .from('quote_requests')
      .insert([
        {
          couple_id: coupleId || null,
          vendor_id: vendorId || null,
          couple_name: coupleName,
          vendor_name: vendorName,
          event_date: eventDate || 'Belirtilmedi',
          budget_offered: Number(budgetOffered) || 0,
          message: message || '',
          status: 'PENDING'
        }
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, quote: data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}