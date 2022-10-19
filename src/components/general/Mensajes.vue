<template >
    <main>
        <article class="message is-success" v-if="mensajes.exito">
            <div class="message-body " v-html="mensajes.exito">

            </div>
        </article>

        <article class="message is-danger" v-if="mensajes.error">
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
        }
    },
    data() {
    },
    computed: {
    },
    methods: {
    }
}
</script>