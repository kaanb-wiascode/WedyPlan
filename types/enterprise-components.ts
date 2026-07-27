export interface StatCardData {
    title: string;
    value: string | number;
    changePercent?: number;
    changePeriod?: string;
    trend?: 'up' | 'down' | 'neutral';
    iconName?: string;
    sparklineData?: number[];
    badgeText?: string;
  }
  
  export interface DataGridColumn<T> {
    key: keyof T | string;
    header: string;
    sortable?: boolean;
    render?: (row: T) => React.ReactNode;
    width?: string;
  }
  
  export interface DataGridProps<T> {
    columns: DataGridColumn<T>[];
    data: T[];
    selectable?: boolean;
    selectedIds?: string[];
    onSelectionChange?: (selectedIds: string[]) => void;
    pageSize?: number;
    isLoading?: boolean;
    emptyMessage?: string;
  }
  
  export interface MiniChartProps {
    data: number[];
    type?: 'area' | 'bar';
    color?: string;
    height?: number;
  }
  
  export interface CalendarEvent {
    id: string;
    date: string; // YYYY-MM-DD
    title: string;
    category?: 'WEDDING' | 'MEETING' | 'PAYMENT' | 'PROVA';
  }
  
  export interface DropdownMenuItem {
    id: string;
    label: string;
    iconName?: string;
    isDanger?: boolean;
    isDivider?: boolean;
    action: () => void;
  }
  
  export interface TimelineItem {
    id: string;
    timeSlot: string;
    title: string;
    description?: string;
    status: 'COMPLETED' | 'IN_PROGRESS' | 'UPCOMING';
    actorName?: string;
  }
  
  export interface LightboxMedia {
    id: string;
    url: string;
    type: 'IMAGE' | 'VIDEO';
    title?: string;
  }