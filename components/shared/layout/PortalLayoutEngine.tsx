'use client';

import React, { useState } from 'react';
import { LayoutHeader } from './LayoutHeader';
import { LayoutSidebar } from './LayoutSidebar';
import { NavItem, BreadcrumbItem, LayoutUser } from '@/types/app-layout';
import { PortalType } from '@/types/auth-core';

interface PortalLayoutEngineProps {
  portalType: PortalType;
  user: LayoutUser;
  navItems: NavItem[];
  breadcrumbs: BreadcrumbItem[];
  currentRoute: string;
  children: React.ReactNode;
  onLogout: () => void;
}

export const PortalLayoutEngine: React.FC<PortalLayoutEngineProps> = ({
  portalType,
  user,
  navItems,
  breadcrumbs,
  currentRoute,
  children,
  onLogout
}) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#0D0D0E] text-[#1D1D1F] dark:text-zinc-100 flex flex-col lg:flex-row relative">
      {/* Universal Sidebar */}
      <LayoutSidebar
        portalType={portalType}
        navItems={navItems}
        currentRoute={currentRoute}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Universal Sticky Header */}
        <LayoutHeader
          activePortal={portalType}
          user={user}
          breadcrumbs={breadcrumbs}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          onLogout={onLogout}
        />

        {/* Page Content Slot */}
        <main className="flex-1 p-4 sm:p-8 max-w-[1400px] w-full mx-auto space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
};