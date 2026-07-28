import { z } from "zod";

export const reviewReplySchema = z.object({
  reviewId: z.string().min(1, "Yorum ID gereklidir"),
  replyText: z.string().min(5, "Yanıt metni en az 5 karakter olmalıdır"),
});

export const sendReviewRequestSchema = z.object({
  coupleName: z.string().min(2, "Çift adı gereklidir"),
  phoneOrEmail: z.string().min(5, "Geçerli e-posta veya telefon giriniz"),
  weddingDate: z.string().min(1, "Düğün tarihi gereklidir"),
});

export type ReviewReplyInput = z.infer<typeof reviewReplySchema>;
export type SendReviewRequestInput = z.infer<typeof sendReviewRequestSchema>;
