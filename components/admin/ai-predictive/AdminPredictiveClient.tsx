'use client';

import React, { useState } from 'react';
import { runScenarioSimulationAction } from '@/lib/actions/admin-predictive-analytics';

interface AdminPredictiveClientProps {
  initialData: any;
}

export function AdminPredictiveClient({ initialData }: AdminPredictiveClientProps) {
  const [forecasts, setForecasts] = useState(initialData.forecasts);
  const [selectedMetric, setSelectedMetric] = useState('REVENUE');
  const [activeScenario, setActiveScenario] = useState<'BASE' | 'BULL' | 'BEAR'>('BASE');
  const [loading, setLoading] = useState(false);

  const activeForecast = forecasts.find((f: any) => f.metricType === selectedMetric) || forecasts[0];

  const handleScenarioChange = async (scenario: 'BASE' | 'BULL' | 'BEAR') => {
    setLoading(true);
    setActiveScenario(scenario);
    const res = await runScenarioSimulationAction(selectedMetric, scenario);
    if (res.success) {
      setForecasts((prev: any[]) =>
        prev.map((f) => (f.metricType === selectedMetric ? res.simulationResult : f))
      );
    }
    setLoading(false);
  };

  return (
    <div className="space-y-8 p-8 bg-[#F9F8F6] text-[#1A1A1A] min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#E8DFD8] pb-6 gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold">Phase 15 • Enterprise Intelligence</span>
          <h1 className="text-3xl font-serif font-bold text-[#1A1A1A] mt-1">Predictive Analytics Center</h1>
          <p className="text-sm text-[#666666] mt-1">
            Geçmiş ve gerçek zamanlı kurumsal veriler ile AI destekli tahminleme, trend analizi ve senaryo simülasyonları.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 bg-[#6E7A6E]/10 text-[#6E7A6E] text-xs font-bold rounded-full border border-[#6E7A6E]/20">
            ✓ 95% Confidence Intervals Active
          </span>
        </div>
      </div>

      {/* Metric Selector Tabs */}
      <div className="flex overflow-x-auto gap-3 pb-2 border-b border-[#E8DFD8]">
        {forecasts.map((f: any) => (
          <button
            key={f.metricType}
            onClick={() => setSelectedMetric(f.metricType)}
            className={`px-4 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedMetric === f.metricType
                ? 'bg-[#1A1A1A] text-white shadow-sm'
                : 'bg-white text-[#666666] border border-[#E8DFD8] hover:bg-[#FAF9F5]'
            }`}
          >
            {f.metricType.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Main Predictive & Simulation Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Forecast & Scenario Simulator */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-[#E8DFD8] shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#F0EBE1] pb-4 gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A059]">Active Metric Simulation</span>
              <h2 className="text-xl font-serif font-bold text-[#1A1A1A]">{activeForecast.metricType.replace('_', ' ')} Forecast</h2>
            </div>
            {/* Scenario Simulation Controls */}
            <div className="flex items-center gap-2 bg-[#F9F8F6] p-1.5 rounded-full border border-[#E8DFD8]">
              {(['BEAR', 'BASE', 'BULL'] as const).map((sc) => (
                <button
                  key={sc}
                  onClick={() => handleScenarioChange(sc)}
                  disabled={loading}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                    activeScenario === sc
                      ? sc === 'BULL'
                        ? 'bg-emerald-700 text-white'
                        : sc === 'BEAR'
                        ? 'bg-rose-700 text-white'
                        : 'bg-[#1A1A1A] text-white'
                      : 'text-[#666666] hover:text-[#1A1A1A]'
                  }`}
                >
                  {sc === 'BULL' ? '🚀 Bull Case (+25%)' : sc === 'BEAR' ? '📉 Bear Case (-20%)' : '⚖️ Base Case'}
                </button>
              ))}
            </div>
          </div>

          {/* Metric Projection Highlight Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-[#F9F8F6] rounded-xl border border-[#E8DFD8]">
              <p className="text-xs text-[#666666] font-medium">Mevcut Değer (Historical)</p>
              <p className="text-2xl font-serif font-bold text-[#1A1A1A] mt-1">
                {activeForecast.currentValue.toLocaleString()}
              </p>
            </div>
            <div className="p-4 bg-white rounded-xl border-2 border-[#C5A059] shadow-sm">
              <p className="text-xs text-[#C5A059] font-bold">12 Aylık AI Projeksiyonu</p>
              <p className="text-2xl font-serif font-bold text-[#1A1A1A] mt-1">
                {activeForecast.projectedValue.toLocaleString()}
              </p>
              <span className="text-[10px] font-bold text-emerald-700 mt-0.5 inline-block">
                +{activeForecast.growthRatePercent}% Büyüme
              </span>
            </div>
            <div className="p-4 bg-[#F9F8F6] rounded-xl border border-[#E8DFD8]">
              <p className="text-xs text-[#666666] font-medium">%95 Güven Aralığı (CI)</p>
              <p className="text-sm font-bold text-[#1A1A1A] mt-2">
                Alt: {activeForecast.confidenceInterval.lower.toLocaleString()}
              </p>
              <p className="text-sm font-bold text-[#1A1A1A]">
                Üst: {activeForecast.confidenceInterval.upper.toLocaleString()}
              </p>
            </div>
          </div>

          {/* AI Risk Prediction & Key Risks */}
          <div className="p-5 rounded-xl border border-[#E8DFD8] bg-[#FAF9F5] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">AI Risk Score & Assessment</span>
              <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${
                activeForecast.riskAnalysis.level === 'HIGH' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
              }`}>
                Risk Skoru: {activeForecast.riskAnalysis.score}/100 ({activeForecast.riskAnalysis.level})
              </span>
            </div>
            {activeForecast.riskAnalysis.keyRisks.length > 0 ? (
              <ul className="text-xs text-rose-800 space-y-1 list-disc pl-4">
                {activeForecast.riskAnalysis.keyRisks.map((r: string, idx: number) => (
                  <li key={idx}>{r}</li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-[#6E7A6E]">✓ Bu metrik için herhangi bir kritik risk tespit edilmedi.</p>
            )}
          </div>
        </div>

        {/* AI Recommendations Engine Panel */}
        <div className="bg-white p-6 rounded-2xl border border-[#E8DFD8] shadow-sm space-y-6">
          <div className="border-b border-[#F0EBE1] pb-4">
            <h2 className="text-lg font-serif font-bold text-[#1A1A1A]">Forecast Optimization</h2>
            <p className="text-xs text-[#666666]">AI Öneri & Aksiyon Motoru</p>
          </div>

          <div className="space-y-4">
            <p className="text-xs font-bold text-[#C5A059] uppercase tracking-wider">Stratejik AI Tavsiyeleri</p>
            <div className="space-y-3">
              {activeForecast.aiRecommendations.map((rec: string, index: number) => (
                <div key={index} className="p-3.5 bg-[#F9F8F6] rounded-xl border border-[#E8DFD8] text-xs text-[#1A1A1A] flex items-start gap-2.5">
                  <span className="text-[#C5A059] font-bold">✨</span>
                  <span>{rec}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[#F0EBE1]">
              <button className="w-full py-3 bg-[#1A1A1A] text-white text-xs font-bold rounded-xl hover:bg-[#333333] transition-all">
                Aksiyon Planını İcra Et
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* All Forecasts Overview Table */}
      <div className="bg-white p-6 rounded-2xl border border-[#E8DFD8] shadow-sm space-y-4">
        <h2 className="text-lg font-serif font-bold text-[#1A1A1A]">Kurumsal Tahminlik Rapor Matrisi</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#1A1A1A]">
            <thead className="bg-[#F9F8F6] text-[#666666] uppercase text-[10px] tracking-wider border-b border-[#E8DFD8]">
              <tr>
                <th className="p-3">Metric</th>
                <th className="p-3">Current</th>
                <th className="p-3">Projected (12M)</th>
                <th className="p-3">Growth Rate</th>
                <th className="p-3">Trend</th>
                <th className="p-3">Risk Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0EBE1]">
              {forecasts.map((fc: any) => (
                <tr key={fc.metricType} className="hover:bg-[#FAF9F5] transition-colors">
                  <td className="p-3 font-bold">{fc.metricType.replace('_', ' ')}</td>
                  <td className="p-3">{fc.currentValue.toLocaleString()}</td>
                  <td className="p-3 font-bold text-[#C5A059]">{fc.projectedValue.toLocaleString()}</td>
                  <td className="p-3 font-semibold text-emerald-700">+{fc.growthRatePercent}%</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold text-[10px]">
                      {fc.trend}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                      fc.riskAnalysis.level === 'HIGH' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {fc.riskAnalysis.level} ({fc.riskAnalysis.score})
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