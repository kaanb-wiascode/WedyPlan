import { iyzipay, Iyzipay } from './client';

export const approveMarketplaceItem = (paymentTransactionId: string) => {
  return new Promise((resolve, reject) => {
    iyzipay.approval.create({
      locale: Iyzipay.LOCALE.TR,
      conversationId: `approve_${Date.now()}`,
      paymentTransactionId: paymentTransactionId,
    }, (err: any, result: any) => {
      if (err || result.status !== 'success') {
        reject(err || result);
      } else {
        resolve(result);
      }
    });
  });
};