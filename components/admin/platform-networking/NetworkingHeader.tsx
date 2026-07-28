"use client";

import React from "react";
import { motion } from "framer-motion";
import { triggerCertificateRenewalAction } from "@/lib/actions/platform-networking";

export default function NetworkingHeader({
  domainZone,
  tlsVersion,
  internalLatencyMs,
  currentBandwidthGbps,
  onOpenDnsModal,
}: {
  domainZone: string;
  tlsVersion: string;
  internalLatencyMs: number;
  currentBandwidthGbps: number;
  onOpenDnsModal: () => void;
}) {
  const handleRenewCert = async () => {
    if (confirm("🔒 TLS SERTİFİKASI YENİLEME: SSL sertifikalarını sıfır kesintiyle yenilemek istiyor musunuz?")) {
      const res = await triggerCertificateRenewalAction();
      if (res.success) {
        alert(res.message);
      }
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300">
              ✦ WedyPlan Shared Enterprise Networking, DNS, TLS 1.3 & Private VPC Layer
            </span>
            <span className="text-xs text-slate-400">Anycast DNS, Auto TLS, Private Networks, WireGuard VPN & eBPF</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Platform Networking Platform</h1>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleRenewCert}
            className="px-5 py-3 rounded-2xl bg-emerald-600 text-white font-mono text-xs font-bold hover:bg-emerald-700 transition shadow-md"
          >
            🔒 RENEW TLS CERTIFICATES
          </button>

          <button
            onClick={onOpenDnsModal}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-600 via-teal-600 to-indigo-600 text-white text-xs font-bold hover:shadow-xl transition flex items-center gap-2"
          >
            🌐 DNS & TLS Yöneticisini Aç
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-cyan-600 font-medium uppercase">Domain Bölgesi</span>
          <div className="text-lg font-bold mt-1 text-cyan-600 font-mono">{domainZone}</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Cloudflare Enterprise Anycast</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-indigo-600 font-medium uppercase">TLS & Şifreleme</span>
          <div className="text-sm font-bold mt-1 text-slate-900 dark:text-slate-100 font-mono">{tlsVersion}</div>
          <span className="text-[11px] text-emerald-600 font-bold block mt-0.5">✓ Zero Trust Enforced</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-teal-600 font-medium uppercase">Ağ İçi (VPC) Latens</span>
          <div className="text-2xl font-mono font-bold mt-1 text-teal-600">{internalLatencyMs} ms</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Ultra-Fast Fiber Subnet</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-purple-600 font-medium uppercase">Anlık Bant Genişliği</span>
          <div className="text-2xl font-mono font-bold mt-1 text-purple-600">{currentBandwidthGbps} Gbps</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">High Capacity Throughput</span>
        </motion.div>
      </div>
    </div>
  );
}
