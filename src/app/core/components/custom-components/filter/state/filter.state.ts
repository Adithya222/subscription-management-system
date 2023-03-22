export interface FilterState {
    filterOptions: any;
    filterOptionsFields: any;
    selectedOption: any;
}

export const initialState: FilterState = {
    filterOptions: {},
    filterOptionsFields: [],
    selectedOption: {},
}
