import { iyzipay, Iyzipay } from './client';

export interface BasketItemParam {
  id: string;
  name: string;
  category: string;
  price: number;
  subMerchantKey: string;
  subMerchantPrice: number;
}

export const initializeMarketplacePayment = (params: {
  buyer: any;
  shippingAddress: any;
  basketItems: BasketItemParam[];
  totalPrice: number;
  paymentCard: any;
}) => {
  return new Promise((resolve, reject) => {
    const formattedBasketItems = params.basketItems.map(item => ({
      id: item.id,
      name: item.name,
      category1: item.category,
      itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
      price: item.price.toFixed(2),
      subMerchantKey: item.subMerchantKey,
      subMerchantPrice: item.subMerchantPrice.toFixed(2),
    }));

    iyzipay.payment.create({
      locale: Iyzipay.LOCALE.TR,
      conversationId: `order_${Date.now()}`,
      price: params.totalPrice.toFixed(2),
      paidPrice: params.totalPrice.toFixed(2),
      currency: Iyzipay.CURRENCY.TRY,
      installment: 1,
      paymentCard: params.paymentCard,
      buyer: params.buyer,
      shippingAddress: params.shippingAddress,
      billingAddress: params.shippingAddress,
      basketItems: formattedBasketItems,
    }, (err: any, result: any) => {
      if (err || result.status !== 'success') {
        reject(err || result);
      } else {
        resolve(result);
      }
    });
  });
};