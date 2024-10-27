
import SvgIconStyle from "../../../../helper/SvgIconStyle";

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

  {
    subheader: 'general',
    items: [
      { title: 'dashboard', path: '/admin/dashboard', icon: ICONS.dashboard },
    ],
  },


  {
    subheader: 'management',
    items: [
    
      {
        title: 'user',
        path: 'admin',
        icon: ICONS.user,
        children: [
          { title: 'list', path: 'users' },
        ],
      },

   
      {
        title: 'products',
        path: 'admin',
        icon: ICONS.cart,
        children: [
          { title: 'list', path: 'products' },
          { title: 'create', path: 'product'},
        ],
      },

   
      {
        title: 'orders',
        path: 'admin',
        icon: ICONS.invoice,
        children: [
          { title: 'list', path: 'orders' },
        ],
      },

    
      {
        title: 'reviews',
        path: 'admin',
        icon: ICONS.blog,
        children: [
          { title: 'review', path: 'reviews' },
        ],
      },
    ],
  },
];

export default navConfig;
