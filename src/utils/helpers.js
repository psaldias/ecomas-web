
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

    validateEmail(email) {
        return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))? true:false;
    },
    validaRut(rutCompleto) {

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
}
  export default helpers;