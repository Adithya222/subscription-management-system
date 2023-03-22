import {Contact} from "./contact.model";
import {Address} from "./address.model";

export interface PersonModel {
    id: number;
    designation: string;
    name: string;
    email: string;
    contacts: Contact[];
    addresses: Address[];
    status: boolean;
    description: string;
}
