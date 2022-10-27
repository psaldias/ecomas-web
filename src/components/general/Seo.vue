

<template>
        <Head v-if="data">
            <title>{{data.title}}</title>
            <meta name="description" :content="data.description" />
            <meta name="robots" :content="data.robots.index+', '+data.robots.follow+', '+data.robots['max-snipped']+', '+data.robots['max-image-preview']+', '+data.robots['max-video-preview']" />
            <link rel="canonical" :href="data.canonical" />
            <meta property="og:locale" :content="data.og_locale" />
            <meta property="og:type" :content="data.og_type" />
            <meta property="og:title" :content="data.og_title" />
            <meta property="og:description" :content="data.og_description" />
            <meta property="og:url" :content="data.og_url" />
            <meta property="og:site_name" :content="data.og_title" />
            <meta property="article:publisher" :content="data.article_publisher" />
            <meta property="article:modified_time" :content="data.article_modified_time" />
            <meta property="og:image" v-if="data.hasOwnProperty('og_image') && data.og_image.length > 0" :content="data.og_image[0].url" />
            <meta property="og:image:width" v-if="data.hasOwnProperty('og_image') && data.og_image.length > 0" :content="data.og_image[0].width" />
            <meta property="og:image:height" v-if="data.hasOwnProperty('og_image') && data.og_image.length > 0" :content="data.og_image[0].height" />
            <meta property="og:image:type" v-if="data.hasOwnProperty('og_image') && data.og_image.length > 0" :content="data.og_image[0].type" />
        </Head>
</template>

<script>
import { Head } from '@vueuse/head'
export default{
    props:{
        data:false
    },
    data() {
        return {
        };
    },
    async mounted() {
    },
    components: { Head }
}
</script>

