import { redirect } from 'next/navigation';

export default function GeneralAIAssistantRedirect() {
  // Kullanıcıyı varsayılan olarak Çift Asistanı paneline yönlendirir
  redirect('/cift/ai-asistan');
}