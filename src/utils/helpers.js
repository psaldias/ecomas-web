
  const helpers = {
    base64_encode(s, stringify = false) {
        if(stringify)
            s = JSON.stringify(s);
        return btoa(unescape(encodeURIComponent(s)));
    },
    base64_decode(s, parse = false) {
        s = decodeURIComponent(escape(atob(s)));
        if(parse)
            s = JSON.parse(s);
        return s;
    },
    validarInputString($event){
        if (!/^[A-Za-zÀ-ÿ\s]*$/.test($event.key)) {
            this.ignoredValue = $event.key ? $event.key : "";
            $event.preventDefault();
            return false;
        }
        return true;
    },
    validarString(string){
        if (!/^[A-Za-zÀ-ÿ\s]*$/.test(string)) {
            return false;
        }
        return true;
    },
    validarInputTelefono ($event) {
        let keyCode = ($event.keyCode ? $event.keyCode : $event.which);

        if ((keyCode < 48 || keyCode > 57) ) { // 46 is dot
            $event.preventDefault();
        }

        if(!$event.target.value.startsWith("+569"))
            $event.target.value = "+569"
    },
    validarTelefono (telefono) {
        if (telefono.length != 12 ||  !telefono.startsWith("+569") || !/^[0-9+]+$/.test( telefono )) {
            return false;
        }
        return true;
    },
    validateEmail(email) {
        return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))? true:false;
    },
    validaRut(rutCompleto) {
        if(!rutCompleto)
            return false;


        rutCompleto = rutCompleto.split(".").join("");
        rutCompleto = rutCompleto.replace("‐","-");
        if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test( rutCompleto )){
            return false;
        }
        var tmp     = rutCompleto.split('-');
        var digv    = tmp[1];
        var rut     = tmp[0];
        if ( digv == 'K' ) digv = 'k' ;
        return (this.dv(rut) == digv);
    },
    dv (T){
        var M=0,S=1;
        for(;T;T=Math.floor(T/10))
            S=(S+T%10*(9-M++%6))%11;
        return S?S-1:'k';
    },
    importarLibereriaGoogleMaps(){
        if ($('head script[src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD8PcTZNYk8IEiE1Cze-CLTF874bT75v7w&libraries=places"]').length == 0){

            return new Promise(function(resolve, reject) {
            const s = document.createElement('script');
            let r = false;
            s.type = 'text/javascript';
            s.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD8PcTZNYk8IEiE1Cze-CLTF874bT75v7w&libraries=places';
            s.async = true;
            s.onerror = function(err) {
                reject(err, s);
            };
            s.onload = s.onreadystatechange = function() {
                // console.log(this.readyState); // uncomment this line to see which ready states are called.
                if (!r && (!this.readyState || this.readyState == 'complete')) {
                r = true;
                resolve();
                }
            };
            const t = document.getElementsByTagName('script')[0];
            t.parentElement.insertBefore(s, t);
            });
        //   let recaptchaScript = document.createElement('script')
        //   recaptchaScript.setAttribute('src', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD8PcTZNYk8IEiE1Cze-CLTF874bT75v7w&libraries=places')
        //   document.head.appendChild(recaptchaScript);
        }
    },
    async importarLibereriaGoogleGsi(){
        if ($('head script[src="https://accounts.google.com/gsi/client"]').length == 0){

            return new Promise(function(resolve, reject) {
            const s = document.createElement('script');
            let r = false;
            s.type = 'text/javascript';
            s.src = 'https://accounts.google.com/gsi/client';
            s.async = true;
            s.onerror = function(err) {
                reject(err, s);
            };
            s.onload = s.onreadystatechange = function() {
                // console.log(this.readyState); // uncomment this line to see which ready states are called.
                if (!r && (!this.readyState || this.readyState == 'complete')) {
                r = true;
                resolve();
                }
            };
            const t = document.getElementsByTagName('script')[0];
            t.parentElement.insertBefore(s, t);
            });
        }
    },
    async importarLibereria(libreria){
        if ($('head script[src="'+libreria+'"]').length == 0){

            return new Promise(function(resolve, reject) {
            const s = document.createElement('script');
            let r = false;
            s.type = 'text/javascript';
            s.src = libreria;
            s.async = true;
            s.onerror = function(err) {
                reject(err, s);
            };
            s.onload = s.onreadystatechange = function() {
                // console.log(this.readyState); // uncomment this line to see which ready states are called.
                if (!r && (!this.readyState || this.readyState == 'complete')) {
                r = true;
                resolve();
                }
            };
            const t = document.getElementsByTagName('script')[0];
            t.parentElement.insertBefore(s, t);
            });
        }
    },
    LinksARouterLink(element,parent){
        const anchors = element.getElementsByTagName('a');

        const dominios_routerlink = [
            'www.ecomas.cl',
            'backend.ecomas.cl',
            'ecomaswp.localhost',
            'qa-backend.ecomas.cl',
            'qa.ecomas.cl',
            'localhost:5173',
        ];
        Array.from(anchors).forEach(anchor => {
            /** OBTENER VALOR HREF */
            const url = anchor.getAttribute('href');
            let encontrado = false;
            let domain = false;
            try{
                /** TRANSFORMAR EL STRING A UNA URL PARA OBTENER PARAMETROS */
                domain = (new URL(url));
                /** BUSCAR SI EL DOMINIO DE LA URL ESTÁ DENTRO DE LOS QUE SE DEBEN MODIFICAR */
                encontrado = dominios_routerlink.find(dominio => dominio == domain.hostname );
            }catch(e){
                encontrado = true;
                domain = {pathname:url};
            }
            /** SI NO COINCIDE SE PASA AL SIGUIENTE LINK */
            if(!encontrado)
                return

            /** AGREGA EL EVENTO DEL CLICK PARA REDIRECCIONAR CON EL ROUTER */
            anchor.addEventListener("click", function(e){
                /** PREVENIR ACCION DEL BOTÓN */
                e.preventDefault();
                /** IR A LA PÁGINA CON ROUTERLINK */
                parent.$router.push(domain.pathname);
            });
            return


        })
    },
    /** RECIBE 2 COORDENADAS Y DEVUELVE LA DISTANCIA EN KILOMETROS ENTRE ELLAS */
    calcularDistanciaCoordenadas(direccion1,direccion2){
        const lat1 = gradosARadianes(direccion1.latitud);
        const lon1 = gradosARadianes(direccion1.longitud);
        const lat2 = gradosARadianes(direccion2.latitud);
        const lon2 = gradosARadianes(direccion2.longitud);
        // Aplicar fórmula
        const RADIO_TIERRA_EN_KILOMETROS = 6371;
        let diferenciaEntreLongitudes = (lon2 - lon1);
        let diferenciaEntreLatitudes = (lat2 - lat1);
        let a = Math.pow(Math.sin(diferenciaEntreLatitudes / 2.0), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(diferenciaEntreLongitudes / 2.0), 2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        console.log(RADIO_TIERRA_EN_KILOMETROS);
        return RADIO_TIERRA_EN_KILOMETROS * c;
    },
    /** DETERMINA SI LA DISTANCIA (KILOMETROS)  ES MENOR O IGUAL AL RADIO PERMITIDO (METROS) */
    distanciaPermitida(distancia, radio_permitido){
        /** PASAR METROS A KILOMETROS */
        const kilometros_permitidos = parseInt(radio_permitido) / 1000;
        return (distancia <= kilometros_permitidos)
    }

}
const gradosARadianes = (grados) => {
    return grados * Math.PI / 180;
};
export default helpers;