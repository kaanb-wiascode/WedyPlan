"use client";

import React, { useState } from "react";
import BudgetHeader from "./BudgetHeader";
import AIHealthScoreCard from "./AIHealthScoreCard";
import BudgetAnalyticsCharts from "./BudgetAnalyticsCharts";
import PaymentTimelineWidget from "./PaymentTimelineWidget";
import CategoryExpenseTable from "./CategoryExpenseTable";

export default function BudgetClient({ userId }: { userId: string }) {
  const [budgetData] = useState({
    totalBudget: 500000,
    spentBudget: 215000,
    estimatedTotal: 480000,
    emergencyFundPercentage: 10,
    currency: "₺",
    healthScore: 88,
    categories: [
      { id: "c1", name: "Mekan & Catering", estimated: 220000, actual: 210000, status: "OPTIMAL" },
      { id: "c2", name: "Fotoğraf & Video", estimated: 85000, actual: 95000, status: "OVER_BUDGET" },
      { id: "c3", name: "Gelinlik & Damatlık", estimated: 60000, actual: 45000, status: "SAVING" },
      { id: "c4", name: "Müzik & Işık", estimated: 45000, actual: 45000, status: "OPTIMAL" },
      { id: "c5", name: "Dekorasyon & Çiçek", estimated: 50000, actual: 30000, status: "OPTIMAL" },
    ],
    upcomingPayments: [
      { id: "p1", vendor: "Bodrum Sunset Venue", title: "2. Taksit Ödemesi", amount: 60000, dueDate: "2027-04-15", status: "UPCOMING" },
      { id: "p2", vendor: "Studio Aegean", title: "Kapanış Bakiyesi", amount: 35000, dueDate: "2027-05-01", status: "UPCOMING" },
    ],
  });

  const emergencyFundAmount = (budgetData.totalBudget * budgetData.emergencyFundPercentage) / 100;
  const remainingBudget = budgetData.totalBudget - emergencyFundAmount - budgetData.spentBudget;

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <BudgetHeader
        totalBudget={budgetData.totalBudget}
        spentBudget={budgetData.spentBudget}
        remainingBudget={remainingBudget}
        emergencyFund={emergencyFundAmount}
        currency={budgetData.currency}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-4 space-y-6">
          <AIHealthScoreCard healthScore={budgetData.healthScore} currency={budgetData.currency} />
          <PaymentTimelineWidget payments={budgetData.upcomingPayments} currency={budgetData.currency} />
        </div>

        <div className="lg:col-span-8 space-y-6">
          <BudgetAnalyticsCharts categories={budgetData.categories} currency={budgetData.currency} />
          <CategoryExpenseTable categories={budgetData.categories} currency={budgetData.currency} />
        </div>
      </div>
    </div>
  );
}
