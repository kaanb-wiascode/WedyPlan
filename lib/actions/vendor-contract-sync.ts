'use server';

import { revalidatePath } from 'next/cache';

export interface ContractItemInput {
  id?: string;
  coupleNames: string;
  title: string;
  totalAmount: number;
  depositAmount: number;
  status: 'SIGNED' | 'WAITING_SIGN' | 'OPTION_EXPIRING' | 'DRAFT';
  weddingDate: string;
  optionHoursRemaining?: number;
  templateId?: string;
  notes?: string;
}

export interface OptionSettingsInput {
  defaultOptionHours: number;
  autoRemindWhatsApp: boolean;
  autoRemindSms: boolean;
  reminderHoursBeforeExpiry: number;
}

export async function createVendorContractAction(input: ContractItemInput) {
  try {
    console.log('[CONTRACT SYNC] Sözleşme oluşturuldu:', input);

    revalidatePath('/firma/sozlesmeler');
    revalidatePath('/firma/finans');
    revalidatePath('/firma/takvim');
    revalidatePath('/cift/messages');
    revalidatePath('/cift/firmalarim');
    revalidatePath('/cift/sozlesmeler');

    const formattedAmount = input.totalAmount.toLocaleString('tr-TR');

    return {
      success: true,
      message: `${input.coupleNames} çifti için ₺${formattedAmount} tutarındaki sözleşme oluşturuldu ve dijital imzaya gönderildi.`,
    };
  } catch (error) {
    return { success: false, message: 'Sözleşme oluşturulurken hata meydana geldi.' };
  }
}

export async function signVendorContractAction(contractId: string, coupleNames: string) {
  try {
    console.log('[CONTRACT SYNC] Sözleşme imzalandı:', contractId);

    revalidatePath('/firma/sozlesmeler');
    revalidatePath('/firma/finans');
    revalidatePath('/firma/takvim');
    revalidatePath('/cift/messages');
    revalidatePath('/cift/firmalarim');

    return {
      success: true,
      message: `${coupleNames} çiftine ait sözleşme dijital olarak imzalandı.`,
    };
  } catch (error) {
    return { success: false, message: 'İmza işlemi sırasında bir hata oluştu.' };
  }
}

export async function saveOptionSettingsAction(settings: OptionSettingsInput) {
  try {
    console.log('[CONTRACT SYNC] Opsiyon ayarları güncellendi:', settings);
    revalidatePath('/firma/sozlesmeler');
    return {
      success: true,
      message: `Opsiyon varsayılan süresi ${settings.defaultOptionHours} saat olarak güncellendi.`,
    };
  } catch (error) {
    return { success: false, message: 'Ayarlar kaydedilemedi.' };
  }
}

export async function archiveVendorContractAction(contractId: string, title: string) {
  try {
    console.log('[CONTRACT SYNC] Sözleşme arşivlendi:', contractId);
    revalidatePath('/firma/sozlesmeler');
    return {
      success: true,
      message: `"${title}" sözleşmesi arşive kaldırıldı.`,
    };
  } catch (error) {
    return { success: false, message: 'Arşivleme hatası oluştu.' };
  }
}