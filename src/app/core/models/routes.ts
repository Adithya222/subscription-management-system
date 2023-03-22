export const routes = [
    {
        routeType: "single",
        routeName: "Dashboard",
        routeUri: "/dashboard/dashboard",
        image: "bi bi-grid",
        routeList: [],
    },

    {
        routeType: "multiple",
        routeName: "Purchase",
        routeUri: "javascript:void(0)",
        image: "bi bi-bag",
        routeList: [{
            name: "Good Received Note",
            url: "/good-received-note/good-received-note-list"
        }],
    },
    {
        routeType: "multiple",
        routeName: "Sales",
        routeUri: "javascript:void(0)",
        image: "bi bi-receipt",
        routeList: [{
            name: "Good Released Note",
            url: "/good-released-note/good-released-note-list"
        }],
    },

    {
        routeType: "multiple",
        routeName: "Ship Out",
        routeUri: "javascript:void(0)",
        image: "bi bi-truck",
        routeList: [{
            name: "List Invoice",
            url: "/ship-out/ship-out-invoice-list"
        }],
    },

    {
        routeType: "multiple",
        routeName: "Ship Out Return",
        routeUri: "javascript:void(0)",
        image: "bi bi-arrow-return-left",
        routeList: [
            {
                name: "Return Ticket",
                url: "/return-ticket/return-ticket-list"
            },
            {
                name: "Credit Note / Refunds",
                url: "/credit-note/credit-note-list"
            },
        ],
    },

    // {
    //     routeType: "multiple",
    //     routeName: "Attendance",
    //     routeUri: "/attendance/list",
    //     image: "bi bi-menu-button-wide",
    //     routeList: [{
    //         name: "Attendance",
    //         url: "/attendance/list"
    //     }],
    // },
    // {
    //     routeType: "multiple",
    //     routeName: "User",
    //     routeUri: "javascript:void(0)",
    //     image: "bi bi-person",
    //     routeList: [{
    //         name: "Permission",
    //         url: "/permission/list"
    //     }, {
    //         name: "Roles",
    //         url: "/roles/list"
    //     }, {
    //         name: "Users",
    //         url: "/users/list"
    //     }],
    // },


    {
        routeType: "multiple",
        routeName: "Internal Stock Transfer",
        routeUri: "javascript:void(0)",
        image: "bi bi-recycle",
        routeList: [
            {
                name: "Stock Transfer List",
                url: "/stock-transfer/stock-transfer-list"
            },


        ],
    },
    // {
    //     routeType: "single",
    //     routeName: "Return Ticket",
    //     routeUri: "/return-ticket/return-ticket-list",
    //     image: "bi bi-person",
    //     routeList: [],
    // },

    {
        routeType: "single",
        routeName: "Inventory",
        routeUri: "#",
        image: "bi bi-list-columns-reverse",
        routeList: [],
    },
    {
        routeType: "single",
        routeName: "Reports",
        routeUri: "#",
        image: "bi bi-file-earmark-bar-graph",
        routeList: [],
    },

    {
        routeType: "multiple",
        routeName: "Admin",
        routeUri: "javascript:void(0)",
        image: "bi bi-person",
        routeList: [
            {
                name: "Products",
                url: "/product/product-list"
            }, {
                name: "Brands",
                url: "/brand/brand-list"
            }, {
                name: "Warehouse",
                url: "/warehouse/warehouse-list"
            }, {
                name: "Supplier",
                url: "/supplier/supplier-list"
            }, {
                name: "Customer",
                url: "/customer/customer-list"
            }, {
                name: "Shipping Carrier",
                url: "/shipping-carrier/shipping-carrier-list"
            }, {
                name: "Form Example",
                url: "/reactive-form"
            }],
    },


    // {
    //     routeType: "single",
    //     routeName: "Azure Storage",
    //     routeUri: "/azure",
    //     image: "bi bi-cloud",
    //     routeList: [],
    // }
];
