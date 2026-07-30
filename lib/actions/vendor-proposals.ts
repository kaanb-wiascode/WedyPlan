'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export interface CreateProposalInput {
  vendorId?: string;
  coupleId?: string;
  leadId?: string;
  coupleName?: string;
  title: string;
  totalPrice?: number;
  discountAmount?: number;
  taxRatePercentage?: number;
  currency?: string;
  validUntil?: Date | string;
  expirationDate?: Date | string;
  notes?: string;
  items?: Array<
    | { description: string; price: number }
    | { title: string; quantity: number; unitPrice: number }
    | Record<string, any>
  >;
}

export interface ProposalRecord {
  id: string;
  vendorId: string;
  coupleId: string;
  title: string;
  totalPrice: number;
  currency: string;
  status: string;
  validUntil?: Date | null;
  notes?: string | null;
  createdAt: Date;
}

export interface ProposalActionResponse {
  success: boolean;
  data?: any;
  message?: string;
  error?: string;
}

export async function getProposalsAction(
  userId: string,
  role: 'VENDOR' | 'COUPLE'
): Promise<ProposalActionResponse> {
  try {
    const proposalModel = (db as any).proposal || (db as any).vendorProposal;
    let proposals: ProposalRecord[] = [];

    if (proposalModel) {
      const whereCondition = role === 'VENDOR' ? { vendorId: userId } : { coupleId: userId };
      proposals = await proposalModel.findMany({
        where: whereCondition,
        orderBy: { createdAt: 'desc' },
      });
    }

    return { success: true, data: proposals };
  } catch (error: unknown) {
    console.error('❌ getProposalsAction hatası:', error);
    return { success: false, error: 'Teklifler yüklenirken bir hata oluştu.', data: [] };
  }
}

export async function createProposalAction(
  param1: string | CreateProposalInput,
  param2?: CreateProposalInput
): Promise<ProposalActionResponse> {
  try {
    const proposalModel = (db as any).proposal || (db as any).vendorProposal;

    if (!proposalModel) {
      throw new Error('Teklif modeli Prisma şemasında bulunamadı.');
    }

    let vendorId = '';
    let payload: CreateProposalInput = { title: '' };

    if (typeof param1 === 'string' && param2) {
      vendorId = param1;
      payload = param2;
    } else if (typeof param1 === 'object') {
      vendorId = param1.vendorId || '';
      payload = param1;
    }

    const validUntilDate = payload.expirationDate || payload.validUntil;

    const newProposal = await proposalModel.create({
      data: {
        vendorId: vendorId || payload.vendorId || 'default-vendor',
        coupleId: payload.coupleId || 'default-couple',
        title: payload.title,
        totalPrice: payload.totalPrice || 0,
        currency: payload.currency || 'TRY',
        validUntil: validUntilDate ? new Date(validUntilDate) : null,
        notes: payload.notes || '',
        status: 'PENDING',
        items: payload.items ? JSON.stringify(payload.items) : null,
      },
    });

    revalidatePath('/satici/teklifler');
    revalidatePath('/vendor/proposals');
    revalidatePath('/cift/proposals');

    return {
      success: true,
      data: newProposal,
      message: 'Teklif başarıyla oluşturuldu ve gönderildi.',
    };
  } catch (error: unknown) {
    console.error('❌ createProposalAction hatası:', error);
    return { success: false, error: 'Teklif oluşturulurken bir hata oluştu.' };
  }
}

export const createVendorProposalAction = createProposalAction;

export async function updateProposalStatusAction(
  proposalId: string,
  status: 'ACCEPTED' | 'REJECTED' | 'REVISED'
): Promise<ProposalActionResponse> {
  try {
    const proposalModel = (db as any).proposal || (db as any).vendorProposal;

    if (!proposalModel) {
      throw new Error('Teklif modeli Prisma şemasında bulunamadı.');
    }

    const updated = await proposalModel.update({
      where: { id: proposalId },
      data: { status },
    });

    revalidatePath('/satici/teklifler');
    revalidatePath('/vendor/proposals');
    revalidatePath('/cift/proposals');

    return {
      success: true,
      data: updated,
      message: 'Teklif durumu güncellendi.',
    };
  } catch (error: unknown) {
    console.error('❌ updateProposalStatusAction hatası:', error);
    return { success: false, error: 'Teklif durumu güncellenemedi.' };
  }
}