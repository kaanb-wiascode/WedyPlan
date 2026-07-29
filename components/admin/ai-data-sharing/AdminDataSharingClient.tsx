'use client';

import React, { useState } from 'react';

interface AdminDataSharingClientProps {
  initialData: any;
}

export function AdminDataSharingClient({ initialData }: AdminDataSharingClientProps) {
  const [data] = useState(initialData);

  return (
    <div className="space-y-8 p-8 bg-[#F9F8F6] text-[#1A1A1A] min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#E8DFD8] pb-6 gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold">Phase 15 • Enterprise Data Platform</span>
          <h1 className="text-3xl font-serif font-bold text-[#1A1A1A] mt-1">Data Sharing Center</h1>
          <p className="text-sm text-[#666666] mt-1">
            İç ve dış veri paylaşım politikaları, veri kontratları, hassas veri algılama ve kullanım denetimi.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-5 py-2.5 bg-[#1A1A1A] text-[#F9F8F6] rounded-full text-sm font-medium hover:bg-[#333333] transition-all shadow-sm">
            + Yeni Paylaşım Politikası Oluştur
          </button>
        </div>
      </div>

      {/* KPI Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-[#E8DFD8] shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#666666]">Aktif Paylaşım Politikaları</p>
          <p className="text-3xl font-serif font-bold text-[#1A1A1A] mt-2">{data.stats.activePoliciesCount}</p>
          <span className="text-xs text-[#6E7A6E] font-medium mt-1 inline-block">✓ Rol & Partner Bazlı</span>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-[#E8DFD8] shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#666666]">Bağlayıcı Veri Kontratları</p>
          <p className="text-3xl font-serif font-bold text-[#1A1A1A] mt-2">{data.stats.activeContractsCount}</p>
          <span className="text-xs text-[#C5A059] font-medium mt-1 inline-block">Data Contracts Active</span>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-[#E8DFD8] shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#666666]">Paylaşılan Kayıt Sayısı</p>
          <p className="text-3xl font-serif font-bold text-[#1A1A1A] mt-2">{data.stats.totalRecordsExported.toLocaleString()}</p>
          <span className="text-xs text-[#666666] mt-1 inline-block">Secure Export & API Access</span>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-[#E8DFD8] shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#666666]">Yüksek Riskli Paylaşım</p>
          <p className="text-3xl font-serif font-bold text-amber-600 mt-2">{data.stats.highRiskSharesCount}</p>
          <span className="text-xs text-amber-600 font-medium mt-1 inline-block">Inference/PII Warning</span>
        </div>
      </div>

      {/* AI Sensitive Data Detection & Sharing Risk Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sharing Risk Analysis list */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-[#E8DFD8] shadow-sm space-y-6">
          <div className="border-b border-[#F0EBE1] pb-4 flex justify-between items-center">
            <h2 className="text-lg font-serif font-bold text-[#1A1A1A]">Paylaşım Risk Analizi & Hassas Veri Tespiti</h2>
            <span className="text-xs font-bold text-[#C5A059] bg-[#FAF9F5] px-3 py-1 rounded-full border border-[#E8DFD8]">
              ✨ AI Sensitive Data Guard
            </span>
          </div>

          <div className="space-y-4">
            {data.riskAssessments.map((risk: any, idx: number) => (
              <div key={idx} className="p-4 rounded-xl border border-[#E8DFD8] bg-[#FAF9F5] space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-sm text-[#1A1A1A]">{risk.policyId}</span>
                  <span className={`px-2.5 py-0.5 text-xs font-bold rounded-full ${
                    risk.riskLevel === 'HIGH' || risk.riskLevel === 'CRITICAL'
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    Risk Skoru: {risk.overallRiskScore}/100 ({risk.riskLevel})
                  </span>
                </div>

                {risk.sensitiveFieldsDetected.length > 0 && (
                  <div className="text-xs text-[#666666]">
                    <span className="font-bold text-rose-700">Tespit Edilen Hassas Veri Alanları: </span>
                    {risk.sensitiveFieldsDetected.map((f: string) => (
                      <code key={f} className="mx-1 bg-rose-50 text-rose-800 px-1.5 py-0.5 rounded font-mono">
                        {f}
                      </code>
                    ))}
                  </div>
                )}

                <div className="text-xs text-[#1A1A1A] bg-white p-3 rounded-lg border border-[#E8DFD8]">
                  <p className="font-bold text-[#C5A059] mb-1">AI Erişim Önerisi:</p>
                  <ul className="list-disc pl-4 space-y-1 text-[#666666]">
                    {risk.recommendations.map((r: string, i: number) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Usage Auditing & Security Feed */}
        <div className="bg-white p-6 rounded-2xl border border-[#E8DFD8] shadow-sm space-y-6">
          <div className="border-b border-[#F0EBE1] pb-4">
            <h2 className="text-lg font-serif font-bold text-[#1A1A1A]">Usage Auditing</h2>
            <p className="text-xs text-[#666666]">Gerçek Zamanlı Veri Erişim Günlüğü</p>
          </div>

          <div className="space-y-3">
            {data.auditLogs.map((log: any) => (
              <div key={log.id} className="p-3 bg-[#F9F8F6] rounded-xl border border-[#E8DFD8] text-xs space-y-1">
                <div className="flex justify-between font-bold text-[#1A1A1A]">
                  <span>{log.accessorId}</span>
                  <span className="text-[10px] font-mono text-[#666666]">{log.actionType}</span>
                </div>
                <p className="text-[#666666]">
                  Erişilen Kayıt: <span className="font-bold text-[#1A1A1A]">{log.recordsAccessed.toLocaleString()}</span> | IP: {log.ipAddress}
                </p>
                {log.sensitiveDataFlag && (
                  <span className="inline-block text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded">
                    ⚠️ Hassas Veri İmzası Algılandı
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Share Policies & Contracts Table */}
      <div className="bg-white p-6 rounded-2xl border border-[#E8DFD8] shadow-sm space-y-4">
        <h2 className="text-lg font-serif font-bold text-[#1A1A1A]">Paylaşım Politikaları & Veri Kontratları (Data Contracts)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#1A1A1A]">
            <thead className="bg-[#F9F8F6] text-[#666666] uppercase text-[10px] tracking-wider border-b border-[#E8DFD8]">
              <tr>
                <th className="p-3">Policy Name</th>
                <th className="p-3">Target Type</th>
                <th className="p-3">Target Identifier</th>
                <th className="p-3">Scope</th>
                <th className="p-3">Sensitivity</th>
                <th className="p-3">Data Contract</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0EBE1]">
              {data.policies.map((p: any) => (
                <tr key={p.id} className="hover:bg-[#FAF9F5] transition-colors">
                  <td className="p-3 font-bold">{p.name}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium text-[10px]">
                      {p.targetType}
                    </span>
                  </td>
                  <td className="p-3 font-mono">{p.targetIdentifier}</td>
                  <td className="p-3">{p.dataScope}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                      p.sensitivityLevel === 'SENSITIVE' || p.sensitivityLevel === 'CRITICAL'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-slate-100 text-slate-800'
                    }`}>
                      {p.sensitivityLevel}
                    </span>
                  </td>
                  <td className="p-3 font-bold text-[#6E7A6E]">
                    {p.hasDataContract ? '✓ İmzaladı' : '⚠️ Eksik'}
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}