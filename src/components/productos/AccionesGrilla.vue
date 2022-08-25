

<template>
    <div class="column is-narrow is-flex is-vcentered mr-5">
        <a href="#" @click.prevent="cambiarGrilla('grid')" class="mr-2 is-block button-grid " :class="{'activo':activo == 'grid'}">
            <i class=" is-size-4 has-text-weight-bold fa-solid fa-border-all is-block"></i>
        </a>
        <a href="#" @click.prevent="cambiarGrilla('lista')"  class="is-block button-grid " :class="{'activo':activo == 'lista'}"><i class="   is-size-4 has-text-weight-bold fa-solid fa-list is-block"></i></a>
    </div>
</template>


<script>

export default {
    data() {
        return {
            activo:'grid',
        };
    },
    computed: {
    },
    methods: {
        cambiarGrilla(grilla){
            this.activo = grilla;
            this.$emit("cambiarGrilla",grilla);
        }
    },
}
</script>