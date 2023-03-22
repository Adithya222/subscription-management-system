export interface CreditNote {
    id: number;
    customer: number;
    date: any;
    reference: string;
    currency: string;
    warehouseId: number;
    items: Item[];
    note: string;
    paymentType: string;
    payments: Payment[];
}

export interface Item {
    id?: number;
    productId: number;
    serial: any;
    unitPrice: number;
    quantity: number;
    amount: number;
}

export interface Payment {
    id?: number;
    paymentType: string;
    reference: string;
    amount: number;
}

export var CreditNoteFilterFields = [
    {type: 'input', key: 'customer', title: 'Customer'},
    {type: 'date', key: 'to', title: 'To Date'},
    {type: 'date', key: 'from', title: 'From Date'},
]

export class CreditNoteFilter {
    customer: string = '';
    to: string = '';
    from: string = '';
    page: number = 1;
    size: number = 20;
}
