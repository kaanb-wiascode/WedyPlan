'use client';

import React, { useState } from 'react';
import { getExecutiveDataDashboardAction, triggerSubsystemOptimizationAction } from '@/lib/actions/admin-data-command-center';

interface ExecutiveDataCommandClientProps {
  initialData: any;
}

export function ExecutiveDataCommandClient({ initialData }: ExecutiveDataCommandClientProps) {
  const [data, setData] = useState(initialData);
  const [activeRole, setActiveRole] = useState<'CEO' | 'CTO' | 'CIO' | 'CDO' | 'CFO' | 'AI_DIRECTOR'>('CEO');
  const [loading, setLoading] = useState(false);

  const handleRoleSwitch = async (role: 'CEO' | 'CTO' | 'CIO' | 'CDO' | 'CFO' | 'AI_DIRECTOR') => {
    setLoading(true);
    setActiveRole(role);
    const res = await getExecutiveDataDashboardAction(role);
    if (res.success) {
      setData(res.data);
    }
    setLoading(false);
  };

  const handleOptimize = async (subsystemKey: string) => {
    const res = await triggerSubsystemOptimizationAction(subsystemKey);
    alert(res.message);
  };

  return (
    <div className="space-y-8 p-8 bg-[#F9F8F6] text-[#1A1A1A] min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#E8DFD8] pb-6 gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold">Phase 15 • Executive Command Center</span>
          <h1 className="text-3xl font-serif font-bold text-[#1A1A1A] mt-1">Enterprise Data Command Center</h1>
          <p className="text-sm text-[#666666] mt-1">
            Tüm kurumsal veri ekosisteminin üst düzey yönetim kontrol ve karar merkezi.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-4 py-2 bg-[#1A1A1A] text-[#F9F8F6] rounded-full text-xs font-bold tracking-wider uppercase shadow-sm">
            ✓ Phase 15 Final Deliverable
          </span>
        </div>
      </div>

      {/* C-Suite Role View Selector */}
      <div className="flex overflow-x-auto gap-3 pb-2 border-b border-[#E8DFD8]">
        {(['CEO', 'CTO', 'CIO', 'CDO', 'CFO', 'AI_DIRECTOR'] as const).map((role) => (
          <button
            key={role}
            onClick={() => handleRoleSwitch(role)}
            disabled={loading}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
              activeRole === role
                ? 'bg-[#1A1A1A] text-white shadow-sm'
                : 'bg-white text-[#666666] border border-[#E8DFD8] hover:bg-[#FAF9F5]'
            }`}
          >
            {role.replace('_', ' ')} Dashboard
          </button>
        ))}
      </div>

      {/* Health Score & High Level Metrics Bento */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border-2 border-[#C5A059] shadow-sm flex flex-col justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#C5A059]">Enterprise Data Health Score</p>
            <p className="text-4xl font-serif font-bold text-[#1A1A1A] mt-3">%{data.enterpriseHealthScore}</p>
          </div>
          <span className="text-xs text-[#6E7A6E] font-bold mt-4 inline-block">✓ Full Subsystem Integrity</span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#E8DFD8] shadow-sm flex flex-col justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#666666]">Global Risk Index</p>
            <p className="text-4xl font-serif font-bold text-emerald-700 mt-3">{data.globalRiskIndex}/100</p>
          </div>
          <span className="text-xs text-emerald-800 font-bold mt-4 inline-block">LOW RISK • Controlled Environment</span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#E8DFD8] shadow-sm flex flex-col justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#666666]">Active Role View</p>
            <p className="text-2xl font-serif font-bold text-[#1A1A1A] mt-3">{activeRole.replace('_', ' ')} Executive Control</p>
          </div>
          <span className="text-xs text-[#666666] mt-4 inline-block">Real-time Data Stream & Telemetry</span>
        </div>
      </div>

      {/* AI Features: Strategic Insights, Data Risk & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Strategic Insights */}
        <div className="bg-white p-6 rounded-2xl border border-[#E8DFD8] shadow-sm space-y-4">
          <div className="border-b border-[#F0EBE1] pb-3">
            <h3 className="text-base font-serif font-bold text-[#1A1A1A]">✨ Stratejik AI Görüler</h3>
            <p className="text-xs text-[#666666]">Executive Decision Support</p>
          </div>
          <ul className="space-y-3">
            {data.strategicInsights.map((insight: string, idx: number) => (
              <li key={idx} className="p-3 bg-[#FAF9F5] rounded-xl border border-[#E8DFD8] text-xs text-[#1A1A1A]">
                {insight}
              </li>
            ))}
          </ul>
        </div>

        {/* Data Risk Analysis */}
        <div className="bg-white p-6 rounded-2xl border border-[#E8DFD8] shadow-sm space-y-4">
          <div className="border-b border-[#F0EBE1] pb-3">
            <h3 className="text-base font-serif font-bold text-[#1A1A1A]">🛡️ Veri Risk Analizi</h3>
            <p className="text-xs text-[#666666]">Anomali & Güvenlik İzleme</p>
          </div>
          <ul className="space-y-3">
            {data.dataRiskAnalysis.map((risk: string, idx: number) => (
              <li key={idx} className="p-3 bg-amber-50/50 rounded-xl border border-amber-200 text-xs text-amber-900">
                {risk}
              </li>
            ))}
          </ul>
        </div>

        {/* Optimization Recommendations */}
        <div className="bg-white p-6 rounded-2xl border border-[#E8DFD8] shadow-sm space-y-4">
          <div className="border-b border-[#F0EBE1] pb-3">
            <h3 className="text-base font-serif font-bold text-[#1A1A1A]">⚡ Optimizasyon Önerileri</h3>
            <p className="text-[#666666] text-xs">AI Subsystem Tuning</p>
          </div>
          <ul className="space-y-3">
            {data.optimizationRecommendations.map((rec: string, idx: number) => (
              <li key={idx} className="p-3 bg-[#F9F8F6] rounded-xl border border-[#E8DFD8] text-xs text-[#1A1A1A]">
                {rec}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Subsystem Monitoring Matrix */}
      <div className="bg-white p-6 rounded-2xl border border-[#E8DFD8] shadow-sm space-y-4">
        <h2 className="text-lg font-serif font-bold text-[#1A1A1A]">Enterprise Subsystems Real-Time Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(data.monitoredSubsystems).map(([key, sub]: [string, any]) => (
            <div key={key} className="p-4 rounded-xl border border-[#E8DFD8] bg-[#FAF9F5] flex justify-between items-center">
              <div>
                <p className="text-xs font-bold text-[#1A1A1A] capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                <p className="text-[11px] text-[#666666] mt-0.5">{sub.metric}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  sub.status === 'OPTIMAL' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {sub.status}
                </span>
                <button
                  onClick={() => handleOptimize(key)}
                  className="text-[10px] font-bold text-[#C5A059] hover:underline"
                >
                  Optimize ➔
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}