export interface ReturnTicket {
    id: number;
    customer: string;
    date: any;
    reference: string;
    paymentReference: string;
    warehouse: string;
}

export var ReturnTicketFilterFields = [
    {type: 'input', key: 'customer', title: 'Customer'},
    {type: 'input', key: 'date', title: 'Date'},
    {type: 'input', key: 'reference', title: 'Reference'},
    {type: 'input', key: 'paymentReference', title: 'Payment Reference'},
    {type: 'input', key: 'warehouse', title: 'Warehouse'},
]

export class ReturnTicketFilter {
    customer: string = '';
    date: string = '';
    reference: string = '';
    paymentReference: string = '';
    warehouse: string = '';
    page: number = 1;
    size: number = 20;
}
