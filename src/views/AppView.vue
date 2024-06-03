<template>
    <main>

        <CargandoSeccion v-if="cargando"></CargandoSeccion>
    </main>
    <Seo v-if="!cargando && contenidoInicial.hasOwnProperty('yoast_head_json')"
        :data_api="contenidoInicial.yoast_head_json"></Seo>
</template>

<script>
import ErrorSeccion from "/src/components/general/ErrorSeccion.vue";
import CargandoSeccion from "../components/general/CargandoSeccion.vue";
import Seo from "../components/general/Seo.vue";
export default {
    components: {
        CargandoSeccion,
        Seo,
    },
    data() {
        return {
            cargando: true,
            contenidoInicial: {},
        };
    },
    async mounted() {
        this.validarDispositivo();
    },
    computed: {
        titulo() {
            return this.contenidoInicial.title.rendered;
        },
    },
    methods: {
        dispararEvento(evento) {
            gtag("event", "click", { event_category: "boton-app", event_label: evento });
        },
        validarDispositivo() {
            const isAndroid = /Android/i.test(navigator.userAgent);
            const isiPhone = /iPhone/i.test(navigator.userAgent);

            if (isAndroid) {
                gtag("event", "redirect", {
                    event_category: "app",
                    event_label: "ecomas://help",
                });
                // Redirigir al deeplink en móviles
                window.location.href = "ecomas://help";
            } else if (isiPhone) {
                gtag("event", "redirect", {
                    event_category: "app",
                    event_label: "ecomas://help",
                });
                window.location.href = "ecomas://help";
            } else {
                window.location.href = "/descargar-app";
            }
        },
    },
};
</script>
