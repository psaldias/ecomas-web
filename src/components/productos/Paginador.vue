

<template>
    <nav class="pagination is-rounded is-small" role="navigation" aria-label="pagination">
        <ul class="pagination-list">
            <li><a class="pagination-link active" aria-label="Go Back"><i class="fa-solid fa-angle-left"></i></a></li>
            <li><a class="pagination-link is-current" aria-label="">1</a></li>
            <li><a class="pagination-link" aria-label="">2</a></li>
            <li><a class="pagination-link" aria-label="">3</a></li>
            <li><a class="pagination-link" aria-label="Next page"><i class="fa-solid fa-angle-right"></i></a></li>
        </ul>
    </nav>
</template>


<script>

export default {
    components: {},
    props: {
        productos: {},
    },
    data() {
        return {
        };
    },
    computed: {
    },
    methods: {
    },
}
</script>