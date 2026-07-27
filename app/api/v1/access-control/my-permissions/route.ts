import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Örnek erişim izinleri yanıtı
    const permissions = [
      "couple:read",
      "couple:write",
      "budget:manage",
      "guests:manage",
      "vendors:view",
      "timeline:edit",
    ];

    return NextResponse.json({
      success: true,
      permissions,
    });
  } catch (error) {
    console.error("Access Control Route Error:", error);
    return NextResponse.json(
      { success: false, error: "İzinler alınırken bir hata oluştu." },
      { status: 500 }
    );
  }
}