// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  blog: icon('ic_blog'),
  cart: icon('ic_cart'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
  notification: icon('ic_notification'),
  map: icon('ic_map'),
};

const navConfig = [
  // VEZZIE
  {
    items: [
      { title: 'user', path: PATH_DASHBOARD.vezzieUser, icon: ICONS.user },
      { title: 'order', path: PATH_DASHBOARD.order.list, icon: ICONS.cart },
      { title: 'category', path: PATH_DASHBOARD.category.root, icon: ICONS.folder },
      { title: 'coupon', path: PATH_DASHBOARD.coupon.root, icon: ICONS.file },
      { title: 'app setting', path: PATH_DASHBOARD.appSetting.root, icon: ICONS.blog },
      { title: 'zone setup', path: PATH_DASHBOARD.zoneSetup, icon: ICONS.map },
      { title: 'notification', path: PATH_DASHBOARD.notification.root, icon: ICONS.notification },
    ],
  },
];

export default navConfig;
