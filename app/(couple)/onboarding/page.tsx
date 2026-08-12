import { requireUserId } from "@/lib/auth/require-ids";
import OnboardingWizard from "@/components/couple/onboarding/OnboardingWizard";

export default async function CoupleOnboardingPage() {
  // Gerçek uygulamada oturum açan çiftin kimliği alınır
  const userId = await requireUserId();

  return <OnboardingWizard userId={userId} />;
}