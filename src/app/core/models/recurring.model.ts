export interface Recurring {
  id: number;
  recurringCycle: string;
  noDays: string;
  isActive: boolean;
}

export var RecurringFilterFields = [
  {type: 'input', key: 'name', title: 'Recurring Name'}
]

export class RecurringFilter {
  // brandName: string = '';
  page: any = 1;
  size: any = 20;
}
