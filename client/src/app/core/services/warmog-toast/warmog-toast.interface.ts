export interface WarmogToast {
  id: string; // Optional ID for the toast
  message: string;
  type: 'success' | 'negative' | 'warning';
  duration?: number;
  hide?: boolean;
  // position?: 'top' | 'bottom' | 'left' | 'right';
  // dismissible?: boolean;
  // icon?: string;
  // action?: {
}
