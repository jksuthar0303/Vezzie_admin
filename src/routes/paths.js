// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  admin: path(ROOTS_AUTH, '/admin'),
};

export const PATH_PAGE = {
  bikaneriNamkeens: '/bikaneri-namkeens',
  termsOfUse: '/terms-of-use',
  privacy: '/privacy-policy',
  about: '/about-us',
  contact: '/contact-us',
  page403: '/403',
  page404: '/404',
  page500: '/500',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,

  // VEZZIE
  vezzieUser: path(ROOTS_DASHBOARD, '/vezzieUser'),
  zoneSetup: path(ROOTS_DASHBOARD, '/zoneSetup'),

  order: {
    list: path(ROOTS_DASHBOARD, '/order/list'),
    view: (id) => path(ROOTS_DASHBOARD, `/order/${id}/view`),
  },

  category: {
    root: path(ROOTS_DASHBOARD, '/category'),
    list: path(ROOTS_DASHBOARD, '/category/list'),
    // new: path(ROOTS_DASHBOARD, '/cetegory/new'),
  },

  product: {
    root: path(ROOTS_DASHBOARD, '/product/list'),
    list: path(ROOTS_DASHBOARD, '/product/list'),
    new: path(ROOTS_DASHBOARD, '/product/new'),
    view: (id) => path(ROOTS_DASHBOARD, `/product/${id}/view`),
    edit: (id) => path(ROOTS_DASHBOARD, `/product/${id}/edit`),
  },

  coupon: {
    root: path(ROOTS_DASHBOARD, '/coupon/list'),
    list: path(ROOTS_DASHBOARD, '/coupon/list'),
  },

  appSetting: {
    root: path(ROOTS_DASHBOARD, '/appSetting/list'),
    list: path(ROOTS_DASHBOARD, '/appSetting/list'),
    edit: path(ROOTS_DASHBOARD, '/appsetting/edit'),
  },

  notification: {
    root: path(ROOTS_DASHBOARD, '/notification/list'),
    list: path(ROOTS_DASHBOARD, '/notification/list'),
  },
};
