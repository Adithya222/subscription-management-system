export class Search {
    id: any = null;
    page: number = 1;
    size: number = 20;
    name: string = "";
    from: Date = new Date();
    to: Date = new Date();
    present: boolean = false;
    absent: boolean = false;
    activeDate: boolean = true;
    checkIn: string = "";
    checkOut: string = "";
}

