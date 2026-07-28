export interface CalendarEventPayload {
    title: string;
    startDate: Date;
    endDate: Date;
    location?: string;
    notes?: string;
  }
  
  export interface DynamicIslandState {
    activityId: string;
    eventTitle: string;
    daysRemaining: number;
    escrowStatus: "SECURED" | "PENDING";
    venueName: string;
  }
  
  export class DeviceIntegrationEngine {
    /**
     * Apple Calendar (.ics) & Google Calendar Dışa Aktarım Köprüsü
     */
    public static exportToCalendar(event: CalendarEventPayload, target: "apple" | "google"): void {
      if (target === "apple") {
        const icsData = [
          "BEGIN:VCALENDAR",
          "VERSION:2.0",
          "BEGIN:VEVENT",
          `SUMMARY:${event.title}`,
          `DESCRIPTION:${event.notes || "WedyPlan Düğün Etkinliği"}`,
          `LOCATION:${event.location || ""}`,
          `DTSTART:${event.startDate.toISOString().replace(/-|:|\.\d\d\d/g, "")}`,
          `DTEND:${event.endDate.toISOString().replace(/-|:|\.\d\d\d/g, "")}`,
          "END:VEVENT",
          "END:VCALENDAR",
        ].join("\n");
  
        const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.setAttribute("download", `${event.title.replace(/\s+/g, "_")}.ics`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        const gUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
          event.title
        )}&details=${encodeURIComponent(event.notes || "")}&location=${encodeURIComponent(
          event.location || ""
        )}&dates=${event.startDate.toISOString().replace(/-|:|\.\d\d\d/g, "")}/${event.endDate
          .toISOString()
          .replace(/-|:|\.\d\d\d/g, "")}`;
        window.open(gUrl, "_blank");
      }
    }
  
    /**
     * Native Harita Yönlendirme (Apple Maps / Google Maps Intent)
     */
    public static openNativeMaps(addressOrCoords: string, platform: "ios" | "android" | "web" = "ios"): void {
      const encoded = encodeURIComponent(addressOrCoords);
      if (platform === "ios") {
        window.open(`http://maps.apple.com/?q=${encoded}`, "_blank");
      } else {
        window.open(`https://www.google.com/maps/search/?api=1&query=${encoded}`, "_blank");
      }
    }
  
    /**
     * OS Share Sheet Entegrasyonu (Native Paylaşım)
     */
    public static async triggerNativeShare(shareData: { title: string; text: string; url: string }): Promise<boolean> {
      if (typeof navigator !== "undefined" && navigator.share) {
        try {
          await navigator.share(shareData);
          return true;
        } catch (err) {
          return false;
        }
      } else if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(shareData.url);
        return true;
      }
      return false;
    }
  
    /**
     * Siri Shortcuts & Android App Shortcuts Intent Kayıt Simülatörü
     */
    public static registerShortcutIntent(intentName: "open_wedy_ai" | "view_contract" | "qr_scanner"): { registered: boolean } {
      return { registered: true };
    }
  }