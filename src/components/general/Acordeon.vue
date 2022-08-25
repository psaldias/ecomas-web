<template lang="">
    <div class="acordeon" v-if="listado">
        <div
            class="card item"
            v-for="item,index in listado"
            :key="index"
            :class="{'active':activo == index}"
        >
            <h4 @click.prevent="cambiarActivo(index)">
                {{item.titulo}}
            </h4>
            <div class="content" v-html="item.descripcion"></div>
        </div>
    </div>
</template>

<script>
export default{
    template:`

    `,
     props:{
        listado:{}
    },
    data() {
        return {
            activo:-1,
        }
    },
    computed:{
    },
    methods:{
        cambiarActivo(id){
            if(this.activo == id){
                this.activo = -1;
            }else
                this.activo = id;
        }
    }
}
</script>