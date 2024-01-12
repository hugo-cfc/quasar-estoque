import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      {
        path: '',
        name: 'loginDefault',
        component: () => import('pages/auth/LoginPage.vue'),
      },
      {
        path: 'login',
        name: 'login',
        component: () => import('pages/auth/LoginPage.vue'),
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('pages/auth/RegisterPage.vue'),
      },
      {
        path: 'email-confirmation',
        name: 'email-confirmation',
        component: () => import('pages/auth/EmailConfirmationPage.vue'),
      },
      {
        path: 'forgot-password',
        name: 'forgot-password',
        component: () => import('pages/auth/ForgotPasswordPage.vue'),
      },
      {
        path: 'reset-password',
        name: 'reset-password',
        component: () => import('pages/auth/ResetPasswordPage.vue'),
      },
    ],
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'me',
        name: 'me',
        component: () => import('pages/auth/MePage.vue'),
      },
      {
        path: 'category',
        name: 'category',
        component: () => import('pages/category/ListPage.vue'),
      },
      {
        path: 'form-category/:id?',
        name: 'form-category',
        component: () => import('pages/category/FormPage.vue'),
      },
      {
        path: 'product',
        name: 'product',
        component: () => import('pages/product/ListPage.vue'),
      },
      {
        path: 'form-product/:id?',
        name: 'form-product',
        component: () => import('pages/product/FormPage.vue'),
      },
    ],
    meta: {
      requiresAuth: true,
    },
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
