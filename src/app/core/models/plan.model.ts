export interface Plan {
  id: number;
  planName: string;
  recurringCycle: string;
  duration: string;
  trialStatus: boolean;
  trialPeriod: string;
  plannerId: number;
  price: number;
  status: string;
  isActive: boolean;
}

export var PlanFilterFields = [
  {type: 'input', key: 'planName', title: 'Plan Name'},
  // {type: 'input', key: 'duration', title: 'Duration'},
]

export class PlanFilter {
  planName: string = '';
  // isActive: boolean = ;
  // duration: number = '';
  page: any = 1;
  size: any = 20;
}
