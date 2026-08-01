import { iyzipay, Iyzipay } from './client';

export interface SubMerchantParams {
  name: string;
  email: string;
  gsmNumber: string;
  address: string;
  iban: string;
  identityNumber: string;
  taxOffice?: string;
  subMerchantType: 'PERSONAL' | 'PRIVATE_COMPANY' | 'LIMITED_OR_JOINT_STOCK_COMPANY';
}

export const createSubMerchant = (params: SubMerchantParams) => {
  return new Promise((resolve, reject) => {
    iyzipay.subMerchant.create({
      locale: Iyzipay.LOCALE.TR,
      conversationId: `submerchant_${Date.now()}`,
      name: params.name,
      email: params.email,
      gsmNumber: params.gsmNumber,
      address: params.address,
      iban: params.iban,
      identityNumber: params.identityNumber,
      taxOffice: params.taxOffice,
      subMerchantType: params.subMerchantType,
      currency: Iyzipay.CURRENCY.TRY,
    }, (err: any, result: any) => {
      if (err || result.status !== 'success') {
        reject(err || result);
      } else {
        resolve(result);
      }
    });
  });
};