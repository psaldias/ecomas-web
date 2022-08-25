import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "",
      component: HomeView
    },
    {
      path: "/quienes-somos",
      name: "Quienes Somos",
      component: () => import("../views/QuienesSomosView.vue")
    },
    {
      path: "/bases-promocionales",
      name: "Bases Promocionales",
      component: () => import("../views/BasesPromocionalesView.vue")
    },{
      path: "/sucursales",
      name: "Sucursales",
      component: () => import("../views/SucursalesView.vue")
    },{
      path: "/noticias/:slug",
      name: "Interior Noticias",
      component: () => import("../views/InteriorNoticiasView.vue")
    },{
      path: "/noticias",
      name: "Noticias",
      component: () => import("../views/NoticiasView.vue")
    },{
      path: "/ingresar",
      name: "Ingresar",
      component: () => import("../views/IngresarView.vue")
    },{
      path: "/registro",
      name: "Registro",
      component: () => import("../views/RegistroView.vue")
    },{
      path: "/contacto",
      name: "Contacto",
      component: () => import("../views/ContactoView.vue")
    },{
      path: "/productos",
      name: "Productos",
      component: () => import("../views/ProductosView.vue")
    },{
      path: "/interior-producto/:slug",
      name: "Interior Producto",
      component: () => import("../views/InteriorProductoView.vue")
    },


    //PAGINA POR DEFECTO
    {
      path: "/:pathMatch(.*)*",
      name: "paginaDefault",
      component: () => import("../views/PaginaDefaultView.vue")
    },
    //PAGINA ERROR
    {
      path: "/404",
      name: "404",
      component: () => import("../views/404View.vue")
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    // return { top: 0 }
    document.getElementById('body').scrollIntoView({ behavior: 'smooth' });

  },
});


router.beforeEach((to) => {
  document.title = to.name || import.meta.env.VITE_DEFAULT_TITLE;
});

export default router;
