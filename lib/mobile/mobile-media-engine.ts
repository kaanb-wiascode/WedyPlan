export interface ProcessedMediaItem {
    id: string;
    originalName: string;
    mimeType: string;
    sizeBytes: number;
    compressedDataUrl: string;
    width?: number;
    height?: number;
    category: "VENUE_PHOTO" | "CONTRACT_SCAN" | "QR_CODE" | "PORTFOLIO";
    uploadStatus: "PENDING" | "UPLOADING" | "COMPLETED" | "QUEUED_OFFLINE";
  }
  
  export class MobileMediaEngine {
    /**
     * İstemci tarafında görselleri WebP / JPEG formatında yüksek kalitede sıkıştırır.
     */
    public static async compressImage(
      file: File,
      maxWidth = 1920,
      quality = 0.82
    ): Promise<ProcessedMediaItem> {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement("canvas");
            let { width, height } = img;
  
            if (width > maxWidth) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            }
  
            canvas.width = width;
            canvas.height = height;
  
            const ctx = canvas.getContext("2d");
            if (!ctx) {
              reject(new Error("CANVAS_CONTEXT_FAILED"));
              return;
            }
  
            ctx.drawImage(img, 0, 0, width, height);
            const compressedDataUrl = canvas.toDataURL("image/webp", quality);
  
            resolve({
              id: `media_${Math.random().toString(36).substring(2, 9)}`,
              originalName: file.name,
              mimeType: "image/webp",
              sizeBytes: Math.round((compressedDataUrl.length * 3) / 4),
              compressedDataUrl,
              width,
              height,
              category: "VENUE_PHOTO",
              uploadStatus: navigator.onLine ? "PENDING" : "QUEUED_OFFLINE",
            });
          };
          img.onerror = () => reject(new Error("IMAGE_LOAD_FAILED"));
          img.src = event.target?.result as string;
        };
        reader.onerror = () => reject(new Error("FILE_READ_FAILED"));
        reader.readAsDataURL(file);
      });
    }
  
    /**
     * Belge & Sözleşme Taraması (Document Scanner Simulator)
     */
    public static processDocumentScan(dataUrl: string): ProcessedMediaItem {
      return {
        id: `doc_${Math.random().toString(36).substring(2, 9)}`,
        originalName: "sozlesme_tarama.pdf",
        mimeType: "image/png",
        sizeBytes: Math.round((dataUrl.length * 3) / 4),
        compressedDataUrl: dataUrl,
        category: "CONTRACT_SCAN",
        uploadStatus: "COMPLETED",
      };
    }
  
    /**
     * QR Kod Taraması & Doğrulama (QR Code Parser Simulator)
     */
    public static parseQrCode(qrData: string): { isValidWedyQr: boolean; payload?: any } {
      try {
        if (qrData.startsWith("WEDYPLAN_CONTRACT_") || qrData.startsWith("http")) {
          return { isValidWedyQr: true, payload: { qrRaw: qrData, scannedAt: new Date() } };
        }
        return { isValidWedyQr: false };
      } catch {
        return { isValidWedyQr: false };
      }
    }
  }