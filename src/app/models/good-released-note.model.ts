import {Product} from "../core/models/product.model";

export interface GoodReleasedNote {
    id: number;
    stockTransferId: number;
    transferFromWarehouse: number;
    transferToWarehouse: number;
    date: any;
    trackingNo: string;
    items: Product[];
    note: string;
}

export var GoodReleasedNoteFilterFields = [
    // {type: 'input', key: 'serial', title: 'Serial'},
    // {type: 'input', key: 'product', title: 'Product'},
    // {type: 'input', key: 'sku', title: 'SKU'},
    // {type: 'date', key: 'expireDate', title: 'Expire Day'},
    // {type: 'time', key: 'time', title: 'Time'},
]

export class GoodReleasedNoteFilter {
    // fromDate: string = '';
    // toDate: string = '';
    // serial: string = '';
    // product: string = '';
    // sku: string = '';
    page: number = 1;
    size: number = 20;
}
