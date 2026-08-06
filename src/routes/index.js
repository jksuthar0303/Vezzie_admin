import { Navigate, useRoutes } from 'react-router-dom';
// auth
import AuthGuard from '../auth/AuthGuard';
import GuestGuard from '../auth/GuestGuard';
// layouts
import MainLayout from '../layouts/main';
import CompactLayout from '../layouts/compact';
import DashboardLayout from '../layouts/dashboard';
// config
import { PATH_AFTER_LOGIN } from '../config-global';
//
import {
  // Auth
  AdminLoginPage,

  //
  BikaneriNamkeensPage,
  VezzieTermsPage,
  Page500,
  Page403,
  Page404,
  HomePage,
  AboutPage,
  Contact,
  InvoiceDownload,

  // VEZZIE
  VezzieUserPage,
  VezzieOrderPage,
  VezzieOrderViewPage,
  VezzieProductCreatePage,
  VezzieProductEditPage,
  VezzieProductListPage,
  VezzieCetegoryListPage,
  VezzieCouponListPage,
  VezzieAppSettingPage,
  VezzieAppSettingEditPage,
  VezzieNotificationPage,
  PrivacyPage,
  ZoneSetupPage,
} from './elements';
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    // Auth
    {
      path: 'auth',
      children: [
        {
          path: 'admin',
          element: (
            <GuestGuard>
              <AdminLoginPage />
            </GuestGuard>
          ),
        },
      ],
    },

    // Dashboard
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },

        // VEZZIE==================================================================================================
        { path: 'vezzieUser', element: <VezzieUserPage /> },

        {
          path: 'order',
          children: [
            { path: 'list', element: <VezzieOrderPage /> },
            { path: ':id/view', element: <VezzieOrderViewPage /> },
          ],
        },

        {
          path: 'category',
          children: [
            { element: <Navigate to="/dashboard/category/list" replace />, index: true },
            { path: 'list', element: <VezzieCetegoryListPage /> },
            // { path: 'new', element: <VezzieCetegoryCreatePage /> },
          ],
        },
        {
          path: 'product',
          children: [
            { path: 'list', element: <VezzieProductListPage /> },
            { path: ':id/view', element: <VezzieProductListPage /> },
            { path: 'new', element: <VezzieProductCreatePage /> },
            { path: ':id/edit', element: <VezzieProductEditPage /> },
          ],
        },
        {
          path: 'coupon',
          children: [
            { element: <Navigate to="/dashboard/coupon/list" replace />, index: true },
            { path: 'list', element: <VezzieCouponListPage /> },
          ],
        },

        {
          path: 'appSetting',
          children: [
            { element: <Navigate to="/dashboard/appSetting/list" replace />, index: true },
            { path: 'list', element: <VezzieAppSettingPage /> },
            { path: 'edit', element: <VezzieAppSettingEditPage /> },
          ],
        },

        {
          path: 'notification',
          children: [
            { element: <Navigate to="/dashboard/notification/list" replace />, index: true },
            { path: 'list', element: <VezzieNotificationPage /> },
          ],
        },

        { path: 'zoneSetup', element: <ZoneSetupPage /> },
      ],
    },

    {
      element: <MainLayout />,
      children: [
        { element: <HomePage />, index: true },
        { path: 'about-us', element: <AboutPage /> },
        { path: 'contact-us', element: <Contact /> },
        {path:'privacy-policy',element: <PrivacyPage />},
        // Bikaneri Namkeens
        { path: 'bikaneri-namkeens', element: <BikaneriNamkeensPage /> },
        { path: 'invoice/:id/download', element: <InvoiceDownload /> },

        // Terms
        { path: 'terms-of-use', element: <VezzieTermsPage /> },
      ],
    },

    {
      element: <CompactLayout />,
      children: [
        { path: '500', element: <Page500 /> },
        { path: '404', element: <Page404 /> },
        { path: '403', element: <Page403 /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
