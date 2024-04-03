<template>

    <Head v-if="data.title">
        <title v-if="data.title">{{ data.title }}</title>
        <meta name="description" v-if="data.hasOwnProperty('description') && data.description.length > 0"
            :content="data.description" />
        <meta name="robots" v-if="robots" :content="robots" />
        <link rel="canonical" v-if="data.canonical" :href="data.canonical" />
        <meta property="og:locale" v-if="data.og_locale" :content="data.og_locale" />
        <meta property="og:type" v-if="data.og_type" :content="data.og_type" />
        <meta property="og:title" v-if="data.og_title" :content="data.og_title" />
        <meta property="og:description" v-if="data.og_description" :content="data.og_description" />
        <meta property="og:url" v-if="data.og_url" :content="data.og_url" />
        <meta property="og:site_name" v-if="data.og_title" :content="data.og_title" />
        <meta property="article:publisher" v-if="data.article_publisher" :content="data.article_publisher" />
        <meta property="article:modified_time" v-if="data.article_modified_time"
            :content="data.article_modified_time" />
        <meta property="og:image" v-if="data.hasOwnProperty('og_image') && data.og_image.length > 0"
            :content="data.og_image[0].url" />
        <meta property="og:image:width" v-if="data.hasOwnProperty('og_image') && data.og_image.length > 0"
            :content="data.og_image[0].width" />
        <meta property="og:image:height" v-if="data.hasOwnProperty('og_image') && data.og_image.length > 0"
            :content="data.og_image[0].height" />
        <meta property="og:image:type" v-if="data.hasOwnProperty('og_image') && data.og_image.length > 0"
            :content="data.og_image[0].type" />
    </Head>
</template>

<script>
import { Head } from '@vueuse/head'
import contenido_inicial from '../../utils/seo.js'

export default {
    props: ['data_api'],
    data() {
        return {
            pathActual: false,
        };
    },
    watch: {
        '$route.path'() {
            this.pathActual = this.$route.path;
        }
    },
    computed: {
        data() {
            if (this.data_api) {
                return this.data_api
            } else
                return (contenido_inicial[this.pathActual] !== undefined) ? contenido_inicial[this.pathActual] : false;
        },
        robots() {
            let robot = '';
            if (this.data.robots == undefined)
                return robot;

            if (this.data.robots.index !== undefined)
                robot += this.data.robots.index + ', ';
            if (this.data.robots.follow !== undefined)
                robot += this.data.robots.follow + ', ';
            if (this.data.robots['max-snipped'] !== undefined)
                robot += this.data.robots['max-snipped'] + ', ';
            if (this.data.robots['max-image-preview'] !== undefined)
                robot += this.data.robots['max-image-preview'] + ', ';
            if (this.data.robots['max-video-preview'] !== undefined)
                robot += this.data.robots['max-video-preview'] + ', ';

            return robot;
        }
    },
    mounted() {
        this.pathActual = this.$route.path;
    },
    components: { Head }
}
</script>
