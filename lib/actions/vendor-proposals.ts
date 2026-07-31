// lib/actions/vendor-proposals.ts
'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

// 1. Satıcının hazırladığı veya çiftin aldığı teklifleri getir
export async function getProposals(params: { vendorId?: string; coupleId?: string }) {
  try {
    const proposalModel = (db as any).proposal || (db as any).quote;

    if (!proposalModel) {
      return { success: false, error: 'Teklif veritabanı modeli bulunamadı.' };
    }

    const whereClause: any = {};
    if (params.vendorId) whereClause.vendorId = params.vendorId;
    if (params.coupleId) whereClause.coupleId = params.coupleId;

    const proposals = await proposalModel.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
    });

    return { success: true, data: proposals };
  } catch (error) {
    console.error('Teklifler alınırken hata:', error);
    return { success: false, error: 'Teklifler yüklenemedi.' };
  }
}

// 2. Yeni teklif oluştur
export async function createProposal(data: {
  vendorId: string;
  coupleId?: string;
  title: string;
  totalPrice: number;
  details?: string;
  validUntil?: string;
}) {
  try {
    const proposalModel = (db as any).proposal || (db as any).quote;

    if (!proposalModel) {
      return { success: false, error: 'Teklif veritabanı modeli bulunamadı.' };
    }

    const newProposal = await proposalModel.create({
      data: {
        vendorId: data.vendorId,
        coupleId: data.coupleId || 'demo-couple',
        title: data.title,
        totalPrice: data.totalPrice,
        details: data.details || '',
        status: 'PENDING',
        validUntil: data.validUntil ? new Date(data.validUntil) : null,
      },
    });

    revalidatePath('/satici/teklif-hazirla');
    revalidatePath('/cift/proposals');
    return { success: true, data: newProposal, message: 'Teklif başarıyla oluşturuldu.' };
  } catch (error) {
    console.error('Teklif oluşturulurken hata:', error);
    return { success: false, error: 'Teklif gönderilemedi.' };
  }
}

// 3. Modal Bileşeni İçin Alias (2 veya 1 Parametreli Çağrıları Esnek Destekler)
export async function createVendorProposalAction(arg1?: any, arg2?: any) {
  const vendorId = typeof arg1 === 'string' ? arg1 : (arg1?.vendorId || arg2?.vendorId || 'demo-vendor');
  const data = typeof arg2 === 'object' && arg2 !== null ? arg2 : (typeof arg1 === 'object' && arg1 !== null ? arg1 : {});

  return createProposal({
    vendorId,
    coupleId: data.coupleId || data.leadId,
    title: data.title || 'Düğün Hizmet Teklifi',
    totalPrice: Number(data.totalPrice || data.price || data.amount || 0),
    details: data.details || data.description || data.notes || '',
    validUntil: data.validUntil,
  });
}