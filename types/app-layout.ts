import { PortalType } from '@/types/auth-core';

export interface NavItem {
  id: string;
  title: string;
  href: string;
  iconName: string;
  badge?: string;
  badgeVariant?: 'primary' | 'gold' | 'success' | 'danger';
  isExternal?: boolean;
  children?: NavItem[];
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ACTION_REQUIRED';
  linkHref?: string;
}

export interface CommandItem {
  id: string;
  title: string;
  subtitle?: string;
  category: 'NAVIGATION' | 'ACTIONS' | 'RECENT';
  iconName: string;
  action: () => void;
}

export interface LayoutUser {
  id: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
  activeRoleTitle: string;
  allowedPortals: PortalType[];
}