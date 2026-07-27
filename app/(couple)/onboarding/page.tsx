import OnboardingWizard from "@/components/couple/onboarding/OnboardingWizard";

export default async function CoupleOnboardingPage() {
  // Gerçek uygulamada oturum açan çiftin kimliği alınır
  const mockUserId = "usr_couple_demo_123";

  return <OnboardingWizard userId={mockUserId} />;
}