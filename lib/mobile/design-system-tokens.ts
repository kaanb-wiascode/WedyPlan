export const MOBILE_DESIGN_TOKENS = {
    colors: {
      light: {
        canvas: "#F5F4F0",
        surface: "rgba(255, 255, 255, 0.65)",
        surfaceBorder: "rgba(255, 255, 255, 0.85)",
        textPrimary: "#111111",
        textSecondary: "#666666",
        accentGold: "#D4AF37",
      },
      dark: {
        canvas: "#0A0A0C",
        surface: "rgba(20, 20, 24, 0.65)",
        surfaceBorder: "rgba(255, 255, 255, 0.12)",
        textPrimary: "#F5F4F0",
        textSecondary: "#86868B",
        accentGold: "#E5C158",
      },
    },
    glass: {
      blur: {
        subtle: "backdrop-blur-md",
        heavy: "backdrop-blur-3xl",
        liquid: "backdrop-blur-[32px]",
      },
    },
    animation: {
      physicsSpring: "cubic-bezier(0.32, 0.72, 0, 1)",
      duration: "duration-300",
    },
  };
  
  export class MobileHaptics {
    /**
     * iOS / Android Haptic Feedback Simülatörü
     */
    public static trigger(type: "selection" | "impactLight" | "impactHeavy" | "success"): void {
      if (typeof window !== "undefined" && "vibrate" in navigator) {
        if (type === "selection") navigator.vibrate(10);
        else if (type === "impactLight") navigator.vibrate(20);
        else if (type === "impactHeavy") navigator.vibrate([30, 10, 30]);
        else if (type === "success") navigator.vibrate([10, 30, 20]);
      }
    }
  }