export interface ShippingCarrier {
    id: number;
    shippingCarrier: string;
    description: string;
}

export var ShippingCarrierFields = [
    {type: 'input', key: 'shippingCarrier', title: 'Shipping Carrier'},
]

export class ShippingCarrierFilter {
    shippingCarrier: string = '';
    page: any = 1;
    size: any = 20;
}
