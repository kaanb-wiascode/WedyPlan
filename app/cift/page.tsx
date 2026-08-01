import { redirect } from 'next/navigation';

export default function CiftRedirectPage() {
  // Kök dizindeki /dashboard yerine /cift/dashboard adresine yönlendiriyoruz
  redirect('/cift/dashboard');
}