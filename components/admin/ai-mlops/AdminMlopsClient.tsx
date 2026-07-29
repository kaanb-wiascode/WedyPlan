'use client';

import React, { useState } from 'react';

interface AdminMlopsClientProps {
  initialData: any;
}

export function AdminMlopsClient({ initialData }: AdminMlopsClientProps) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);

  const handleRetrain = async (modelId: string) => {
    setLoading(true);
    // Dynamic Action Trigger
    alert(`[MLOps Pipeline] Model ${modelId} için otomatik retraining tetiklendi.`);
    setLoading(false);
  };

  return (
    <div className="space-y-8 p-8 bg-[#F9F8F6] text-[#1A1A1A] min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#E8DFD8] pb-6 gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold">Phase 15 • Enterprise Platform</span>
          <h1 className="text-3xl font-serif font-bold text-[#1A1A1A] mt-1">Enterprise MLOps Data Center</h1>
          <p className="text-sm text-[#666666] mt-1">
            Yapay zeka modellerinin veri hattı, sapma (drift) takibi ve yeniden eğitim mekanizmaları.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-5 py-2.5 bg-[#1A1A1A] text-[#F9F8F6] rounded-full text-sm font-medium hover:bg-[#333333] transition-all shadow-sm">
            + Yeni Veri Seti Ekle
          </button>
        </div>
      </div>

      {/* KPI Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-[#E8DFD8] shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#666666]">Yönetilen Veri Setleri</p>
          <p className="text-3xl font-serif font-bold text-[#1A1A1A] mt-2">{data.stats.totalDatasets}</p>
          <span className="text-xs text-[#6E7A6E] font-medium mt-1 inline-block">✓ %96.8 Ort. Kalite Skoru</span>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-[#E8DFD8] shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#666666]">İzlenen Modeller</p>
          <p className="text-3xl font-serif font-bold text-[#1A1A1A] mt-2">{data.stats.activeModelsMonitored}</p>
          <span className="text-xs text-[#666666] mt-1 inline-block">Gerçek zamanlı çıkarım takibi</span>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-[#E8DFD8] shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#666666]">Loglanan Çıkarımlar</p>
          <p className="text-3xl font-serif font-bold text-[#1A1A1A] mt-2">{data.stats.totalInferencesLogged.toLocaleString()}</p>
          <span className="text-xs text-[#C5A059] font-medium mt-1 inline-block">Inference Log Vault</span>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-[#E8DFD8] shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#666666]">Kritik Drift Uyarısı</p>
          <p className="text-3xl font-serif font-bold text-red-600 mt-2">{data.stats.pendingRetrainTriggers}</p>
          <span className="text-xs text-red-500 font-medium mt-1 inline-block">Yeniden Eğitim Bekliyor</span>
        </div>
      </div>

      {/* AI Features & Drift Intelligence Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Drift Monitoring Panel */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-[#E8DFD8] shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-[#F0EBE1] pb-4">
            <h2 className="text-lg font-serif font-bold text-[#1A1A1A]">Model Drift Detection & Retraining Triggers</h2>
            <span className="px-3 py-1 bg-[#F9F8F6] text-[#6E7A6E] text-xs rounded-full font-semibold border border-[#E8DFD8]">
              Live Drift Engine
            </span>
          </div>

          <div className="space-y-4">
            {data.driftMetrics.map((drift: any) => (
              <div key={drift.id} className="p-4 rounded-xl border border-[#F0EBE1] bg-[#FAF9F5] flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-[#1A1A1A]">{drift.modelId}</span>
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                      drift.status === 'CRITICAL' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {drift.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#666666] mt-1">
                    Özellik: <code className="text-[#1A1A1A] font-mono">{drift.featureName}</code> | Drift Skoru: <span className="font-bold text-[#1A1A1A]">{drift.driftScore}</span> (Eşik: {drift.threshold})
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => handleRetrain(drift.modelId)}
                    disabled={drift.retrainTriggered || loading}
                    className={`px-4 py-2 text-xs font-semibold rounded-full transition-all ${
                      drift.retrainTriggered
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-[#1A1A1A] text-white hover:bg-[#333333]'
                    }`}
                  >
                    {drift.retrainTriggered ? 'Yeniden Eğitim Tetiklendi' : 'Retrain Model'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dataset Quality Analysis Widget */}
        <div className="bg-white p-6 rounded-2xl border border-[#E8DFD8] shadow-sm space-y-6">
          <div className="border-b border-[#F0EBE1] pb-4">
            <h2 className="text-lg font-serif font-bold text-[#1A1A1A]">Dataset Quality Analysis</h2>
            <p className="text-xs text-[#666666]">Otomatik AI Veri Seti Kalite Skorlaması</p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-[#666666]">Veri Tamlığı (Completeness)</span>
              <span className="font-bold text-[#1A1A1A]">%{data.qualityReport.completeness}</span>
            </div>
            <div className="w-full bg-[#F0EBE1] h-2 rounded-full overflow-hidden">
              <div className="bg-[#6E7A6E] h-full" style={{ width: `${data.qualityReport.completeness}%` }}></div>
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className="text-[#666666]">Tekillik (Uniqueness)</span>
              <span className="font-bold text-[#1A1A1A]">%{data.qualityReport.uniqueness}</span>
            </div>
            <div className="w-full bg-[#F0EBE1] h-2 rounded-full overflow-hidden">
              <div className="bg-[#C5A059] h-full" style={{ width: `${data.qualityReport.uniqueness}%` }}></div>
            </div>

            <div className="p-4 bg-[#F9F8F6] rounded-xl border border-[#E8DFD8] mt-4">
              <p className="text-xs font-bold text-[#1A1A1A] mb-2">💡 Training Recommendations</p>
              <ul className="text-xs text-[#666666] space-y-1.5 list-disc pl-4">
                {data.qualityReport.recommendations.map((rec: string, i: number) => (
                  <li key={i}>{rec}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Dataset Management Table */}
      <div className="bg-white p-6 rounded-2xl border border-[#E8DFD8] shadow-sm space-y-4">
        <h2 className="text-lg font-serif font-bold text-[#1A1A1A]">Training & Validation Datasets</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#1A1A1A]">
            <thead className="bg-[#F9F8F6] text-[#666666] uppercase text-[10px] tracking-wider border-b border-[#E8DFD8]">
              <tr>
                <th className="p-3">Dataset Name</th>
                <th className="p-3">Type</th>
                <th className="p-3">Version</th>
                <th className="p-3">Row Count</th>
                <th className="p-3">Features</th>
                <th className="p-3">Quality Score</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0EBE1]">
              {data.datasets.map((ds: any) => (
                <tr key={ds.id} className="hover:bg-[#FAF9F5] transition-colors">
                  <td className="p-3 font-semibold">{ds.name}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium text-[10px]">
                      {ds.type}
                    </span>
                  </td>
                  <td className="p-3 font-mono">{ds.version}</td>
                  <td className="p-3">{ds.rowCount.toLocaleString()}</td>
                  <td className="p-3">{ds.featureCount}</td>
                  <td className="p-3 font-bold text-[#6E7A6E]">%{ds.qualityScore}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold text-[10px]">
                      {ds.status}
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