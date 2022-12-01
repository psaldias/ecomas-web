<template >
    <main v-if="tabs">
        <div class="tabs" >
            <ul>
                <li v-for="tab, index in tabsConInformacion" :key="index" :class="{ 'is-active': activo == index }">
                    <a href="#" @click.prevent="cambiarActivo(index)">{{tab.titulo}}</a>
                </li>
            </ul>
        </div>
        <div class="tabs-content content" >
            <div class="columns">
                <div class="column" v-html="tabActivo.descripcion"></div>
                <div class="column" v-if="tabActivo.descripcion2" v-html="tabActivo.descripcion2"></div>
            </div>

        </div>
   </main>
</template>

<script>
export default {
    props: {
        tabs: {}
    },
    data() {
        return {
            activo : 0
        }
    },
    computed: {
        tabActivo(){
            if(this.tabs)
                return this.tabs.find( (tab,index) => index == this.activo);
            return false;

        },
        tabsConInformacion(){
            if(this.tabs)
                return this.tabs.filter( (tab,index) => tab.descripcion != '');
            return false;

        }
    },
    methods: {
        cambiarActivo(id) {
            if (this.activo == id) {
                this.activo = 0;
            } else
                this.activo = id;
        }
    }
}
</script>