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
      path: "/somos-ecomas",
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
    },{
      path: "/distribuidores/",
      name: "Distribuidores",
      component: () => import("../views/DistribuidoresView.vue")
    },{
      path: "/carro/",
      component: () => import("../views/CarroView.vue"),
      children:[
        {
          path:"",
          name:"Carro",
          component: () => import("../components/carro/Index.vue"),
          meta:{paso:'paso-1'},
        },
        {
          path:"registro",
          name:"Registro - Carro",
          component: () => import("../components/carro/Registro.vue"),
          meta:{paso:'paso-2'},
        },{
          path:"despacho",
          name:"Despacho",
          component: () => import("../components/carro/Despacho.vue"),
          meta:{paso:'paso-3'},
        },{
          path:"pago",
          name:"Pago",
          component: () => import("../components/carro/Pago.vue"),
          meta:{paso:'paso-4'},
        },
      ]
    },{
      path: "/compra-rapida/",
      component: () => import("../views/CompraRapidaView.vue"),
      children:[
        {
          path:"",
          name:"Telefono - Compra Rápida",
          component: () => import("../components/compra-rapida/Telefono.vue"),
        },
        {
          path:"direccion",
          name:"Dirección - Compra Rápida",
          component: () => import("../components/compra-rapida/Direccion.vue"),
        },{
          path:"producto",
          name:"Producto - Compra Rápida",
          component: () => import("../components/compra-rapida/Producto.vue"),
        },{
          path:"final",
          name:"Final - Compra Rápida",
          component: () => import("../components/compra-rapida/Final.vue"),
        },
      ]
    },{
      path: "/mi-cuenta/",
      name: "Mi Cuenta",
      component: () => import("../views/MiCuentaView.vue")
    },{
      path: "/pedidos/",
      name: "Pedidos",
      component: () => import("../views/PedidosView.vue")
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
    },
    //PAGINA CRITICO
    {
      path: "/error",
      name: "error",
      component: () => import("../views/ErrorView.vue")
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
