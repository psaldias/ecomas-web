<template >
    <main>
        <div class="tabs" v-if="tabs">
            <ul>
                <li v-for="tab, index in tabs" :key="index" :class="{ 'is-active': activo == index }"><a href="#" @click.prevent="cambiarActivo(index)">{{tab.titulo}}</a></li>
            </ul>
        </div>
        <div class="tabs-content content"  v-html="tabActivo.descripcion">


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
            return this.tabs.find( (tab,index) => index == this.activo);

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