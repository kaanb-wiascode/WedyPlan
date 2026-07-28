import { z } from "zod";

export const dnsRecordTypeEnum = z.enum(["A", "AAAA", "CNAME", "TXT", "MX"]);

export const updateDnsRecordSchema = z.object({
  domainName: z.string().min(3, "Domain adı zorunludur"),
  recordType: dnsRecordTypeEnum.default("A"),
  content: z.string().min(1, "Hedef IP/Adres zorunludur"),
  proxied: z.boolean().default(true),
  ttlSeconds: z.number().default(300),
});

export const createVpnTunnelSchema = z.object({
  tunnelName: z.string().min(2, "Tünel adı zorunludur"),
  sourceVpc: z.string().min(1, "Kaynak VPC zorunludur"),
  targetSubnet: z.string().min(1, "Hedef Subnet zorunludur"),
  encryptionType: z.enum(["WIREGUARD_AES_256", "IPSEC_GCM"]).default("WIREGUARD_AES_256"),
});

export type UpdateDnsRecordInput = z.infer<typeof updateDnsRecordSchema>;
export type CreateVpnTunnelInput = z.infer<typeof createVpnTunnelSchema>;
