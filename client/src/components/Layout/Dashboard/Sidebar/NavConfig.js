// routes

import SvgIconStyle from "../../../../helper/SvgIconStyle";

// components


// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  booking: getIcon('ic_booking'),
  invoice: getIcon('ic_invoice'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),

};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
      { title: 'dashboard', path: 'admin/dashboard', icon: ICONS.dashboard },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
      // USER
      {
        title: 'user',
        path: 'admin',
        icon: ICONS.user,
        children: [
          { title: 'list', path: '/users' },
        ],
      },

      // E-COMMERCE
      {
        title: 'e-commerce',
        path: 'admin',
        icon: ICONS.cart,
        children: [
          { title: 'list', path: '/products' },
          { title: 'create', path: '/add-product'},
        ],
      },

      // ORDERS
      {
        title: 'orders',
        path: 'admin',
        icon: ICONS.invoice,
        children: [
          { title: 'list', path: 'orders' },
        ],
      },

      // REVIEWS
      {
        title: 'reviews',
        path: 'admin',
        icon: ICONS.blog,
        children: [
          { title: 'review', path: '/review' },
        ],
      },
    ],
  },
];

export default navConfig;
