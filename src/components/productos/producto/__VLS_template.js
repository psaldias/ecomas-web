export default (await import('vue')).defineComponent({
props: {
formato: {
type: String,
default: "vertical"
},
producto: {}
},
components: {
Imagen,
Precio,
Acciones,
Toplayer
},
data() {
return {
datos_toplayer: {
cantidad: 1,
mostrar: false
}
};
},
computed: {},
methods: {
TopLayer(cantidad) {
this.datos_toplayer.cantidad = cantidad;
this.datos_toplayer.mostrar = true;
}
}
});
const __VLS_template = () => ({});
