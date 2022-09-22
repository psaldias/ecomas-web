

<template>
  <main class="noticias">
    <div class="wrapper">

        <BannerSeccionNoticia :titulo="noticia.nombre ?? '' " imagen="/img/banner-interior-noticia.jpg" />

        <div class="columns is-centered is-gapless">
            <div class="column is-8" >
                <div class="imagen mt-4 has-text-centered" v-if="noticia.imagen">
                    <img :src="noticia.imagen" alt="">
                </div>
                <div class="content mt-4" v-html="noticia.descripcion"></div>
            </div>
        </div>


        <NoticiasDestacadas titulo="Noticias Relacionadas"/>
    </div>
  </main>
</template>



<script>
import Noticia from "../components/general/Noticia.vue";
import BannerSeccionNoticia from "../components/general/BannerSeccionNoticia.vue";
import NoticiasDestacadas from "../components/general/NoticiasDestacadas.vue";

export default {
  components: {
    Noticia,
    BannerSeccionNoticia,
    NoticiasDestacadas
},
  data() {
    return {
        noticia:{

        }
    };
  },
  mounted(){
    this.noticia = {
        id: 1,
        nombre: "Te asesoramos para que hagas la mejor elección en calefacción sustentable",
        imagen: "/img/noticia-5.jpg",
        descripcion: '<p>Existen numerosas ventajas para elegir una caldera a pellet Easypell como tu sistema de calefacci&oacute;n, hoy revisaremos cada una de las ventajas que EasyPell tiene para ti:<br>1. Al consumir pellet, est&aacute;s contribuyendo a disminuir la contaminaci&oacute;n ambiental, al desarrollo de una industria local, a la lucha contra el cambio clim&aacute;tico, aparte de ahorrar costes de calefacci&oacute;n<br>2. La caldera Easypell asegura un excelente trabajo gracias a su constante control de la combusti&oacute;n. Autom&aacute;ticamente ahorra combustible y reduce las emisiones al m&iacute;nimo.<br>3. No requiere ajustes ni calibraciones mayores para su funcionamiento, simplemente cargar de pellet y listo. Se puede utilizar para todo tipo de calefacci&oacute;n central (radiadores y losa radiante) con o sin acumulador de inercia, as&iacute; como estanque para la producci&oacute;n de agua caliente sanitaria.</p><p>4. Es una caldera a pellet confiable, autom&aacute;tica y econ&oacute;mica. Fabricada con la licencia del prestigioso fabricante&nbsp;<a href="https://www.oekofen.com/es-es/caldera-de-pellets/">&Ouml;kofen</a>, producto Austriaco.<br>5. Posee servicio post venta dentro del territorio nacional, podr&aacute;s realizar tus consultas a un especialista de la marca, cont&aacute;ctanos con solo un clic <a href="https://ecomas.cl/contactanos">aqu&iacute;&nbsp;</a></p><p><br><strong>&iquest;Qu&eacute; ahorro tienen los pellet en comparaci&oacute;n con otros combustibles como el petr&oacute;leo?</strong></p><p>&bull; El precio del pellet se ha mantenido bastante estable en los &uacute;ltimos a&ntilde;os en comparaci&oacute;n con otros combustibles como el petr&oacute;leo, el propano, o la electricidad. El aumento de la masa forestal cada a&ntilde;o, la aparici&oacute;n de nuevas f&aacute;bricas de pellet y distribuidores para satisfacer la demanda, asegura suministro y estabilidad de precios para los pr&oacute;ximos a&ntilde;os.</p><p>&bull; Estableciendo el coste del Kg de pellet en un precio medio de $215 y teniendo en cuenta que el poder calor&iacute;fico de 1 L de petr&oacute;leo es el equivalente a 2 Kg de pellet. El ahorro puede ser de un 30 o 40% dependiendo del coste de gas&oacute;leo que es muy variable.</p><p><br></p><p><strong>&iquest;Es posible tener agua caliente (acs) adem&aacute;s de calefacci&oacute;n?</strong></p><p>&bull; S&iacute;, con la caldera de pellet podemos generar agua caliente para nuestro consumo diario: cocina, ducha, etc. Existen b&aacute;sicamente dos formas distintas de obtener la producci&oacute;n de agua caliente, una ser&iacute;a mediante un dep&oacute;sito acumulador de ACS, y otra con un dep&oacute;sito de inercia con producci&oacute;n instant&aacute;nea de ACS.</p><p>&bull; En el primer caso, la caldera trabajar&iacute;a directamente contra los radiadores o el suelo radiante, y calentar&iacute;a un dep&oacute;sito acumulador que tendr&iacute;a agua disponible para su consumo en el interior.</p><p>&bull; En el segundo caso, la caldera, trabaja contra el dep&oacute;sito de inercia, y el agua caliente se produce de forma instant&aacute;nea. Al tener el dep&oacute;sito de inercia con temperatura, y tener consumo, el agua de la llave o la ducha se calentar&iacute;a en unos segundos. Estos dep&oacute;sitos suelen tener capacidades de 500/600/800/1000 Litros, y seg&uacute;n la capacidad se combinan con energ&iacute;a solar y/o fotovoltaica (conexi&oacute;n a resistencia el&eacute;ctrica).</p><p><br></p><p><strong>&iquest;Es necesaria la instalaci&oacute;n de un dep&oacute;sito de inercia con la caldera a pellet?</strong></p><p>No, a diferencia de por ejemplo las calderas de le&ntilde;a de gasificaci&oacute;n y llama invertida, donde si puede ser imprescindible o muy recomendable la instalaci&oacute;n de un dep&oacute;sito de inercia, con una caldera Easypell no ser&iacute;a obligatorio, gracias a que es trata de una caldera a pellet autom&aacute;tica: encendido autom&aacute;tico, modulaci&oacute;n del 30% de la potencia nominal, etc. A pesar de no ser obligatorio, en diversos casos si qu&eacute; puede estar justificado, por un aumento del rendimiento estacionario de la instalaci&oacute;n, por ejemplo cuando hay demandas de calor puntuales elevadas, o cuando se quiere combinar con una instalaci&oacute;n solar, con un dep&oacute;sito de inercia y producci&oacute;n instant&aacute;nea de ACS<br>En cualquier caso, si nos comenta su caso particular, estaremos encantados de asesorarle, para que su instalaci&oacute;n tenga la mejor relaci&oacute;n entre su inversi&oacute;n y la eficiencia del sistema de calefacci&oacute;n, solo debe contactarnos ingresando aqu&iacute; (https://ecomas.cl/contactanos?asunto=cotizar-caldera).</p><p><br></p><p><strong>&iquest;Necesito una chimenea para la salida de los humos?</strong><br>S&iacute;, como cualquier caldera, al tener una combusti&oacute;n en el interior, es imprescindible un conducto de evacuaci&oacute;n de los humos, que por ley debe llegar hasta el tejado de la vivienda. Si tiene alguna duda con el dimensionamiento, le podemos asesorar o realizar los c&aacute;lculos correspondientes. Simplemente p&oacute;ngase en contacto con nosotros <a href="https://ecomas.cl/contactanos">aqu&iacute;</a></p>',
        url: "/noticias/slug"
    }
    document.title = this.noticia.nombre || VUE_APP_DEFAULT_TITLE;
  },
  computed: {
  },
  methods: {
  },
};
</script>