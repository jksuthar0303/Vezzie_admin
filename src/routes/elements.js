import { Suspense, lazy } from 'react';
// components
import LoadingScreen from '../components/loading-screen';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

// ----------------------------------------------------------------------

// AUTH
export const AdminLoginPage = Loadable(lazy(() => import('../pages/auth/AdminLoginPage')));

// VEZZIE
export const VezzieUserPage = Loadable(lazy(() => import('../pages/dashboard/VezzieUserPage')));
export const VezzieOrderPage = Loadable(lazy(() => import('../pages/dashboard/VezzieOrderPage')));
export const VezzieOrderViewPage = Loadable(
  lazy(() => import('../pages/dashboard/VezzieOrderViewPage'))
);
export const InvoiceDownload = Loadable(lazy(() => import('../pages/InvoiceDownload')));
// Vezzie Product
export const VezzieProductListPage = Loadable(
  lazy(() => import('../pages/dashboard/VezzieProductListPage'))
);
export const VezzieProductCreatePage = Loadable(
  lazy(() => import('../pages/dashboard/VezzieProductCreatePage'))
);
export const VezzieProductEditPage = Loadable(
  lazy(() => import('../pages/dashboard/VezzieProductEditPage'))
);

// Vezzie Cetegory
export const VezzieCetegoryListPage = Loadable(
  lazy(() => import('../pages/dashboard/VezzieCetegoryListPage'))
);

// Vezzie Coupon
export const VezzieCouponListPage = Loadable(
  lazy(() => import('../pages/dashboard/VezzieCouponListPage'))
);

// Vezzie app setting
export const VezzieAppSettingPage = Loadable(
  lazy(() => import('../pages/dashboard/VezzieAppSettingPage'))
);
export const VezzieAppSettingEditPage = Loadable(
  lazy(() => import('../pages/dashboard/VezzieAppSettingEditPage'))
);

// vezzie notification
export const VezzieNotificationPage = Loadable(
  lazy(() => import('../pages/dashboard/VezzieNotificationPage'))
);

export const ZoneSetupPage = Loadable(
  lazy(() => import('../pages/ZoneSetup'))
);

// MAIN
export const Page500 = Loadable(lazy(() => import('../pages/Page500')));
export const Page403 = Loadable(lazy(() => import('../pages/Page403')));
export const Page404 = Loadable(lazy(() => import('../pages/Page404')));
export const HomePage = Loadable(lazy(() => import('../pages/HomePage')));
// Bikaneri Namkeens
export const BikaneriNamkeensPage = Loadable(lazy(() => import('../pages/BikaneriNamkeensPage')));
// terms
export const VezzieTermsPage = Loadable(lazy(() => import('../pages/VezzieTermsPage')));

export const AboutPage = Loadable(lazy(() => import('../pages/AboutPage')));
export const Contact = Loadable(lazy(() => import('../pages/ContactPage')));
export const PrivacyPage = Loadable(lazy(() => import('../pages/Privacy')));
