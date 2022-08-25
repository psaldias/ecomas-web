<template>
    <div class="imagen">
        <router-link :to="url">
            <img :src="imagen" :alt="alt">
        </router-link>
    </div>
</template>
<script>
export default {
    props:{
        imagen:'',
        alt:'',
        url:'',
    },
    date(){
        return{}
    }
}

</script>