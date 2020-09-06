const routes = [{
    path: '/seller',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      auth: true
    },
    children: [{
      path: '',
      name: 'home',
      component: () => import('pages/Index.vue')
    },{
      path: 'categories',
      name: 'categories',
      component: () => import('pages/Seller/Category.vue')
    },{
      path: 'products-by-category/:categoryId',
      name: 'productsByCategory',
      props: true,
      component: () => import('pages/Seller/ProductsByCategory.vue')
    },{
      path: ':id/product-detail',
      name: 'productDetail',
      component: () => import('pages/Seller/ProductDetail.vue')
    },{
      path: 'profile',
      name: 'profile',
      component: () => import('pages/Seller/Profile.vue')
    },{
      path: 'settings',
      name: 'settings',
      component: () => import('pages/Seller/Settings.vue')
    }]
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('pages/Auth/Register.vue'),
  },
  {
    path: '/',
    component: () => import('pages/Auth/Login.vue'),
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
