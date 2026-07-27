import React from "react";
import DashboardHeader from "@/components/couple/dashboard/DashboardHeader";
import CountdownWidget from "@/components/couple/dashboard/widgets/CountdownWidget";
import AIInsightsWidget from "@/components/couple/dashboard/widgets/AIInsightsWidget";
import TaskProgressWidget from "@/components/couple/dashboard/widgets/TaskProgressWidget";
import BudgetOverviewWidget from "@/components/couple/dashboard/widgets/BudgetOverviewWidget";
import WeatherWidget from "@/components/couple/dashboard/widgets/WeatherWidget";
import TimelineWidget from "@/components/couple/dashboard/widgets/TimelineWidget";
import MessagesOffersWidget from "@/components/couple/dashboard/widgets/MessagesOffersWidget";
import StatusWidget from "@/components/couple/dashboard/widgets/StatusWidget";
import CalendarWidget from "@/components/couple/dashboard/widgets/CalendarWidget";
import MotivationWidget from "@/components/couple/dashboard/widgets/MotivationWidget";
import VendorRecommendationsWidget from "@/components/couple/dashboard/widgets/VendorRecommendationsWidget";
import PartnerActivityWidget from "@/components/couple/dashboard/widgets/PartnerActivityWidget";

export default function CoupleDashboardPage() {
  // Mock Dashboard State
  const coupleData = {
    names: "Selin & Kaan",
    weddingDate: "2027-06-19T18:00:00",
    location: "Bodrum, Muğla",
    partnerName: "Kaan",
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      {/* Header Section */}
      <DashboardHeader names={coupleData.names} location={coupleData.location} />

      {/* Main Responsive Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1600px] mx-auto">
        {/* Row 1: Countdown (2 col) + AI Insights (2 col) */}
        <div className="lg:col-span-2">
          <CountdownWidget weddingDate={coupleData.weddingDate} location={coupleData.location} />
        </div>
        <div className="lg:col-span-2">
          <AIInsightsWidget />
        </div>

        {/* Row 2: Task Progress + Budget Overview + Weather */}
        <div className="lg:col-span-1">
          <TaskProgressWidget completed={28} total={42} />
        </div>
        <div className="lg:col-span-2">
          <BudgetOverviewWidget totalBudget={450000} spentBudget={180000} currency="₺" />
        </div>
        <div className="lg:col-span-1">
          <WeatherWidget date="19 Haziran 2027" city="Bodrum" temp="28°C" condition="Güneşli" />
        </div>

        {/* Row 3: Upcoming Timeline (2 col) + Messages & Offers (2 col) */}
        <div className="lg:col-span-2">
          <TimelineWidget />
        </div>
        <div className="lg:col-span-2">
          <MessagesOffersWidget />
        </div>

        {/* Row 4: Statuses + Calendar + Motivation */}
        <div className="lg:col-span-1">
          <StatusWidget contractsPending={1} paymentsDue={2} />
        </div>
        <div className="lg:col-span-2">
          <CalendarWidget />
        </div>
        <div className="lg:col-span-1">
          <MotivationWidget />
        </div>

        {/* Row 5: Vendor Recommendations (2 col) + Partner Activity (2 col) */}
        <div className="lg:col-span-2">
          <VendorRecommendationsWidget />
        </div>
        <div className="lg:col-span-2">
          <PartnerActivityWidget partnerName={coupleData.partnerName} />
        </div>
      </div>
    </div>
  );
}