export type MobileRoute = 
  | { type: "HOME" }
  | { type: "VENUE_DETAIL"; slug: string }
  | { type: "CONTRACT_VIEW"; contractId: string }
  | { type: "AI_PLANNER"; promptSessionId?: string }
  | { type: "VENDOR_PORTAL"; vendorId: string };

export class DeepLinkRouter {
  private static readonly DOMAIN = "wedyplan.com";

  public static parseUrl(url: string): MobileRoute {
    const parsed = new URL(url);
    const pathSegments = parsed.pathname.split("/").filter(Boolean);

    if (pathSegments.length === 0) {
      return { type: "HOME" };
    }

    if (pathSegments[0] === "mekanlar" && pathSegments[1]) {
      return { type: "VENUE_DETAIL", slug: pathSegments[1] };
    }

    if (pathSegments[0] === "contracts" && pathSegments[1]) {
      return { type: "CONTRACT_VIEW", contractId: pathSegments[1] };
    }

    if (pathSegments[0] === "wedy-ai") {
      return { type: "AI_PLANNER", promptSessionId: parsed.searchParams.get("session") || undefined };
    }

    if (pathSegments[0] === "vendor" && pathSegments[1]) {
      return { type: "VENDOR_PORTAL", vendorId: pathSegments[1] };
    }

    return { type: "HOME" };
  }

  public static buildUniversalLink(route: MobileRoute): string {
    switch (route.type) {
      case "VENUE_DETAIL":
        return `https://${this.DOMAIN}/mekanlar/${route.slug}`;
      case "CONTRACT_VIEW":
        return `https://${this.DOMAIN}/contracts/${route.contractId}`;
      case "AI_PLANNER":
        return `https://${this.DOMAIN}/wedy-ai${route.promptSessionId ? `?session=${route.promptSessionId}` : ""}`;
      case "VENDOR_PORTAL":
        return `https://${this.DOMAIN}/vendor/${route.vendorId}`;
      default:
        return `https://${this.DOMAIN}/`;
    }
  }
}