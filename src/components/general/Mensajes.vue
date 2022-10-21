<template >
    <main>
        <article class="message is-success" :class="clases" v-if="mensajes.exito">
            <div class="message-body " v-html="mensajes.exito">

            </div>
        </article>

        <article class="message is-danger" :class="clases" v-if="mensajes.error">
            <div class="message-body" v-html="mensajes.error">

            </div>
        </article>
   </main>
</template>

<script>
export default {
    props: {
        mensajes: {
            default:{
                exito:false,
                error:false,
            }
        },
        clases:''
    },
    data() {
    },
    computed: {
    },
    methods: {
    }
}
</script>