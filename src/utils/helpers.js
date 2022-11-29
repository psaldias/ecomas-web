
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
    validarInputTelefono ($event) {
        let keyCode = ($event.keyCode ? $event.keyCode : $event.which);

        if ((keyCode < 48 || keyCode > 57) ) { // 46 is dot
            $event.preventDefault();
        }

        if(!$event.target.value.startsWith("+569"))
            $event.target.value = "+569"
    },
    validarTelefono (telefono) {
        if (telefono.length != 12 ) {
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
    }
}
  export default helpers;