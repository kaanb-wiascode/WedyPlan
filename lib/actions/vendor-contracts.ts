'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { generateAiResponseAction } from '@/lib/ai/ai-core-platform';

export interface CreateContractInput {
  vendorId?: string;
  coupleId?: string;
  coupleName?: string;
  weddingDate?: Date | string;
  proposalId?: string;
  title: string;
  contractTerms?: string;
  content?: string;
  expirationDate?: Date | string;
  depositAmount?: number;
  totalAmount?: number;
}

export interface ContractRecord {
  id: string;
  vendorId: string;
  coupleId: string;
  title: string;
  contractTerms: string;
  depositAmount: number;
  totalAmount: number;
  status: string;
  signedAt?: Date | null;
  createdAt: Date;
}

export interface ContractActionResponse {
  success: boolean;
  data?: any;
  message?: string;
  error?: string;
}

export async function getContractsAction(
  userId: string,
  role: 'VENDOR' | 'COUPLE'
): Promise<ContractActionResponse> {
  try {
    const contractModel = (db as any).contract || (db as any).vendorContract;
    let contracts: ContractRecord[] = [];

    if (contractModel) {
      const whereCondition = role === 'VENDOR' ? { vendorId: userId } : { coupleId: userId };
      contracts = await contractModel.findMany({
        where: whereCondition,
        orderBy: { createdAt: 'desc' },
      });
    }

    return { success: true, data: contracts };
  } catch (error: unknown) {
    console.error('❌ getContractsAction hatası:', error);
    return { success: false, error: 'Sözleşmeler yüklenemedi.', data: [] };
  }
}

export async function createContractAction(
  param1: string | CreateContractInput,
  param2?: CreateContractInput
): Promise<ContractActionResponse> {
  try {
    const contractModel = (db as any).contract || (db as any).vendorContract;

    if (!contractModel) {
      throw new Error('Sözleşme modeli Prisma şemasında bulunamadı.');
    }

    let vendorId = '';
    let payload: CreateContractInput = { title: '' };

    if (typeof param1 === 'string' && param2) {
      vendorId = param1;
      payload = param2;
    } else if (typeof param1 === 'object') {
      vendorId = param1.vendorId || '';
      payload = param1;
    }

    const newContract = await contractModel.create({
      data: {
        vendorId: vendorId || payload.vendorId || 'default-vendor',
        coupleId: payload.coupleId || 'default-couple',
        proposalId: payload.proposalId || null,
        title: payload.title,
        contractTerms: payload.content || payload.contractTerms || 'Standart Sözleşme Koşulları',
        depositAmount: payload.depositAmount || 0,
        totalAmount: payload.totalAmount || 0,
        status: 'PENDING_SIGNATURE',
      },
    });

    revalidatePath('/satici/sozlesmeler');
    revalidatePath('/vendor/contracts');
    revalidatePath('/cift/contracts');

    return {
      success: true,
      data: newContract,
      message: 'Sözleşme başarıyla oluşturuldu ve çifte iletildi.',
    };
  } catch (error: unknown) {
    console.error('❌ createContractAction hatası:', error);
    return { success: false, error: 'Sözleşme oluşturulamadı.' };
  }
}

export const createVendorContractAction = createContractAction;

export async function signContractAction(contractId: string): Promise<ContractActionResponse> {
  try {
    const contractModel = (db as any).contract || (db as any).vendorContract;

    if (!contractModel) {
      throw new Error('Sözleşme modeli Prisma şemasında bulunamadı.');
    }

    const updated = await contractModel.update({
      where: { id: contractId },
      data: {
        status: 'SIGNED',
        signedAt: new Date(),
      },
    });

    revalidatePath('/satici/sozlesmeler');
    revalidatePath('/vendor/contracts');
    revalidatePath('/cift/contracts');

    return {
      success: true,
      data: updated,
      message: 'Sözleşme başarıyla imzalandı.',
    };
  } catch (error: unknown) {
    console.error('❌ signContractAction hatası:', error);
    return { success: false, error: 'Sözleşme imzalanamadı.' };
  }
}

/**
 * AI Sözleşme Analiz Aksiyonu (Hem 1 hem 2 parametre çağrısını destekler)
 */
export async function generateAIContractAnalysisAction(
  contractTermsOrTitle: string,
  category?: string
) {
  try {
    const prompt = category
      ? `Aşağıdaki "${category}" kategorisindeki "${contractTermsOrTitle}" sözleşmesi metnini incele ve riskli, eksik veya belirsiz maddeleri listeleyerek özet çıkar.`
      : `Aşağıdaki düğün sözleşmesi metnini incele ve riskli, eksik veya belirsiz maddeleri listeleyerek özet çıkar:\n\n${contractTermsOrTitle}`;

    const aiResponse = await generateAiResponseAction({ prompt });
    return { success: true, analysis: aiResponse.text };
  } catch (error: unknown) {
    console.error('❌ generateAIContractAnalysisAction hatası:', error);
    return { success: false, error: 'Sözleşme analizi üretilemedi.' };
  }
}