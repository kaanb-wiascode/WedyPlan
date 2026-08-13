import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { createSession } from "@/lib/auth/session";
import { dashboardPathForRole } from "@/lib/auth/redirects";

type AppRole = "COUPLE" | "VENDOR" | "ADMIN";

async function verifyFirebaseIdToken(idToken: string) {
  const res = await fetch(
    `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(idToken)}`
  );
  if (!res.ok) return null;
  const payload = (await res.json()) as {
    email?: string;
    email_verified?: string | boolean;
    name?: string;
    aud?: string;
    iss?: string;
  };

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const audienceOk = !projectId || payload.aud === projectId;
  const issuerOk =
    !payload.iss ||
    payload.iss.includes("securetoken.google.com") ||
    payload.iss.includes("accounts.google.com");

  if (!payload.email || !audienceOk || !issuerOk) return null;
  return payload;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const idToken = String(body.idToken || "");
    const requestedRole: AppRole =
      body.role === "VENDOR" || body.role === "ADMIN" ? body.role : "COUPLE";

    if (!idToken) {
      return NextResponse.json(
        { success: false, error: "Kimlik jetonu eksik." },
        { status: 400 }
      );
    }

    const identity = await verifyFirebaseIdToken(idToken);
    if (!identity?.email) {
      return NextResponse.json(
        { success: false, error: "Google oturumu doğrulanamadı." },
        { status: 401 }
      );
    }

    const email = identity.email.toLowerCase();
    const fullName = identity.name || email.split("@")[0];

    let user = await (prisma as any).identityUser.findUnique({
      where: { email },
    });

    if (!user) {
      user = await (prisma as any).$transaction(async (tx: any) => {
        const newUser = await tx.identityUser.create({
          data: {
            email,
            fullName,
            status: "ACTIVE",
            isEmailVerified: true,
            emailVerifiedAt: new Date(),
            securityProfile: { create: {} },
          },
        });

        await tx.portalProfile.create({
          data: {
            userId: newUser.id,
            portal: requestedRole,
            isPrimary: true,
          },
        });

        if (requestedRole === "VENDOR") {
          await tx.vendor.create({
            data: {
              userId: newUser.id,
              businessName: fullName,
              businessCategory: "OTHER",
              status: "PENDING",
              isVerified: false,
            } as any,
          });
        } else if (requestedRole === "COUPLE") {
          await tx.couple.create({
            data: {
              userId: newUser.id,
              partnerOneName: fullName,
            },
          });
        }

        return newUser;
      });
    }

    let profile = await (prisma as any).portalProfile.findFirst({
      where: { userId: user.id, isPrimary: true },
    });

    const portalContext = (profile?.portal as AppRole) || requestedRole;
    const role: AppRole =
      portalContext === "VENDOR" || portalContext === "ADMIN"
        ? portalContext
        : "COUPLE";

    await createSession({
      userId: user.id,
      email: user.email,
      role,
      portalContext: role,
    });

    return NextResponse.json({
      success: true,
      redirectUrl: dashboardPathForRole(role),
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role,
      },
    });
  } catch (error) {
    console.error("OAuth sync error:", error);
    return NextResponse.json(
      { success: false, error: "Google ile giriş yapılamadı." },
      { status: 500 }
    );
  }
}
