export interface Breadcrumb {
  label: string;
  url: string;
  items?: Breadcrumb[] | Breadcrumb[][];
}
