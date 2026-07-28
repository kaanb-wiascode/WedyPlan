import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const platform = request.headers.get("X-WedyPlan-Platform") || "ios";

  const bootstrapPayload = {
    platform,
    serverTime: new Date().toISOString(),
    minAppVersion: "1.0.0",
    features: {
      biometricsEnabled: true,
      offlineCacheVersion: "v2",
      escrowNativePayments: true,
      wedyAiMobileVoice: true,
    },
    navigation: {
      bottomTabs: [
        { id: "explore", title: "Keşfet", icon: "compass", route: "/" },
        { id: "planner", title: "WedyAI", icon: "sparkles", route: "/wedy-ai" },
        { id: "contracts", title: "Sözleşmeler", icon: "document", route: "/contracts" },
        { id: "profile", title: "Hesabım", icon: "person", route: "/profile" },
      ],
    },
  };

  return NextResponse.json(bootstrapPayload, {
    headers: {
      "Cache-Control": "public, max-age=300, s-maxage=600",
    },
  });
}