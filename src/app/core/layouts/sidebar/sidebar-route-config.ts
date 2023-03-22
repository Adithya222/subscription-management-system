import {RouteInfo} from "../../models/sidebar-route-model";

export const ROUTES: RouteInfo[] = [
  {
    path: '/',
    title: 'Dashboard',
    icon: 'bi bi-grid',
    class: '',
    allowPermissions: [],
    submenu: [],
  },

  // {
  //   path: '/customer/customer-list',
  //   title: 'Customers',
  //   icon: 'bi bi-person',
  //   class: '',
  //   allowPermissions: [],
  //   submenu: [],
  // },

  {
    path: '/brand/brand-list',
    title: 'Categories',
    icon: 'bi bi-award',
    class: '',
    allowPermissions: [],
    submenu: [],
  },
  {
    path: '/product/product-list',
    title: 'Products',
    icon: 'bi bi-box-seam',
    class: '',
    allowPermissions: [],
    submenu: [],
  },

  {
    path: '/plan/plan-list',
    title: 'Plans',
    icon: 'bi bi-box-seam',
    class: '',
    allowPermissions: [],
    submenu: [],
  },

  {
    path: '/invoice/invoice-list',
    title: 'Invoice',
    icon: 'bi bi-person',
    class: '',
    allowPermissions: [],
    submenu: [],
  },

  {
    path: '/recurring/recurring-list',
    title: 'Recurring Cycle',
    icon: 'bi bi-person',
    class: '',
    allowPermissions: [],
    submenu: [],
  },
  // {
  //   path: '/company/company-list',
  //   title: 'Companies',
  //   icon: 'bi bi-box-seam',
  //   class: '',
  //   allowPermissions: [],
  //   submenu: [],
  // },







  // {
  //   path: '',
  //   title: 'Suppliers',
  //   icon: 'bi bi-menu-button-wide',
  //   class: 'has-sub',
  //   allowPermissions: ['register_company'],
  //   submenu: [
  //     {
  //       path: '/company/company-registration',
  //       title: 'asda ',
  //       icon: '',
  //       class: '',
  //       allowPermissions: ['register_company'],
  //       submenu: [],
  //     }, {
  //       path: '/company/company-registration',
  //       title: 'Profile Details',
  //       icon: '',
  //       class: '',
  //       allowPermissions: ['register_company'],
  //       submenu: [],
  //     }
  //   ]
  // },

]
