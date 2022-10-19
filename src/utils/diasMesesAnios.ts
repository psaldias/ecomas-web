
  const helperFechas = {
    dias(){
        let d = [];
        for(let i=1;i<=31;i++){
            d.push(i);
        }
        return d;
    },

    meses () {
        return [
            'Enero',
            'Febrero',
            'Marzo',
            'Abril',
            'Mayo',
            'Junio',
            'Julio',
            'Agosto',
            'Septiembre',
            'Octubre',
            'Noviembre',
            'Diciembre',
        ]
    },

    anios(){
        let a = [];
        for(let i=new Date().getFullYear();i>=1960;i--){
            a.push(i);
        }
        return a;
    }
}
  export default helperFechas;