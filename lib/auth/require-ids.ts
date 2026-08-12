import { redirect } from "next/navigation";
import { getActiveVendorId, getSession } from "@/lib/auth/session";

export async function requireUserId(): Promise<string> {
  const session = await getSession();
  if (!session?.userId) {
    redirect("/giris");
  }
  return session.userId;
}

export async function requireVendorId(): Promise<string> {
  try {
    return await getActiveVendorId();
  } catch {
    redirect("/giris");
  }
}

export async function requireCoupleId(): Promise<string> {
  const { getActiveCoupleId } = await import("@/lib/auth/session");
  try {
    return await getActiveCoupleId();
  } catch {
    redirect("/giris");
  }
}
