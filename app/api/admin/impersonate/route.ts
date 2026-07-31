import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { targetUserId, targetRole } = await request.json();

    if (!targetUserId) {
      return NextResponse.json({ error: 'Hedef kullanıcı ID belirtilmedi' }, { status: 400 });
    }

    // 1. Hedef Kullanıcı Bilgilerini Supabase'den Çek
    const { data: user, error } = await supabase
      .from('couples')
      .select('*')
      .eq('id', targetUserId)
      .single();

    if (error || !user) {
      return NextResponse.json({ error: 'Kullanıcı bulunamadı' }, { status: 404 });
    }

    // 2. Audit Log Kaydı Oluştur (Güvenlik İzlenebilirliği)
    await supabase.from('audit_logs').insert([
      {
        admin_name: 'Super Admin (Kaan Atamer)',
        action: `Gölge Modu Başlatıldı (Impersonate)`,
        target: `Kullanıcı: ${user.names} (${targetRole})`,
        ip_address: '127.0.0.1'
      }
    ]);

    // 3. Gölge Modu Session Token'ı Dön
    return NextResponse.json({
      success: true,
      shadowToken: `shadow_${user.id}_${Date.now()}`,
      redirectUrl: targetRole === 'vendor' ? '/tedarikci/dashboard' : '/cift/dashboard',
      user: {
        id: user.id,
        name: user.names,
        role: targetRole
      }
    });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}