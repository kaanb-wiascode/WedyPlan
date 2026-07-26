import { collection, addDoc, getDocs, query, where, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface VendorTransactionPayload {
  vendorUid: string;
  title: string;
  relatedName: string;
  amount: number;
  type: 'INCOME' | 'EXPENSE';
  category: string;
  dueDate: string;
  status: 'COMPLETED' | 'PENDING' | 'OVERDUE';
}

// 1. Finans Hareketini Firestore'a Ekleme
export const createFinancialTransaction = async (payload: VendorTransactionPayload) => {
  return await addDoc(collection(db, 'vendor_transactions'), {
    ...payload,
    createdAt: serverTimestamp(),
  });
};

// 2. Firmaya Ait Finans Hareketlerini Çekme
export const getVendorTransactions = async (vendorUid: string) => {
  const q = query(collection(db, 'vendor_transactions'), where('vendorUid', '==', vendorUid));
  const snap = await getDocs(q);
  const list: any[] = [];
  snap.forEach((d) => list.push({ id: d.id, ...d.data() }));
  return list;
};