# ecomas-web

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

#despliegue de dist
aws s3 sync . s3://frontend.ecomas.cl


### Changelog<br>
### v1.0.25
  - Sección sucursales actualizada
  - Nueva sección Calculadora. /calculadora

### v1.0.24
  - Cambios en la forma de seleccionar un color de un producto
  - Cambios en la forma de mostrar el valor unitario de un producto

### v1.0.23
  - Se agrega valor unitario a productos, tanto en compra rapida como compra normal.

### v1.0.22
  - Se agrega tab "ficha técnica" en el interior de productos
  - Se agrega funcionalidad de cupón de descuento para primera compra de usuarios registrados.

### v1.0.21
  - Se agrega la funcionalidad de precios con descuento por sucursal en cada producto (menos los variables)

### v1.0.20
  - Se modifica la dirección en compra rapida, ahora en el campo direccion Linea 1 se guarda solo la calle y el número, se elimina ciudad y pais.
  - Se modifica la dirección de despacho en compra normal, ahora en el campo direccion Linea 1 se guarda solo la calle y el número, se elimina ciudad y pais.
  - Se modifica la dirección de facturacion en compra normal, ahora en el campo direccion Linea 1 se guarda solo la calle y el número, se elimina ciudad y pais.
  - Campo Giro en compra rápida, se se limita a un máximo de 40 caracteres
  - Se agrega mapa en dirección manual para que se pueda seleccionar con un pin la ubicación.
  - Ahora los productos en compra normal tienen la opción de agregar variaciones al carro de compras.
  - Se modifica ingreso por google para corregir error en producción

### v1.0.19
  - cambios logos header y footer

### v1.0.18
  - Se habilito en el interior de un producto una galería de imagenes.

### v1.0.17
  - Actualización limite de productos en compra rapida de 10 por defecto al maximo permitido por wordpress de 100

### v1.0.16
  - Fix en carro de compras cuando un producto estaba agregado al carro pero en backend era eliminado lo que generaba un error crítico del sitio.

### v1.0.15
  - Cambio en selector de años al registrarse, ahora el minimo es desde 1920
  - Fix menores cuando el servidor backend no responde, en algunos casos el sitio se quedaba "pegado" y no redijiría a la página de error
  - Se agregó un toplayer en el home, su contenido es administrable desde el backen.
  - Se agregó la opción desde el backend de poder modificar el tiempo visible de cada slide en el carrusel del home, además de fijarlo

### v1.0.14
- Fix de sucursal seleccionada
  - Cuando se elimiaba una sucursal desde el admin y el usuario la tenía seleccionada como "por defecto" en localstorage, el sitio se caia y no permitía hacer nada. Ahora en este caso se vuelve a dejar por defecto la sucursal marcada como tal desde el admin.

### v1.0.13
- Toplayer en las secciones /carro/despacho y compra-rapida/direccion con información de radio de despacho, su contenido se puede modificar desde el administrador Opciones Generales Ecomas > Toplayer Radio Despacho

### v1.0.12
- Fix en ventana seleccionar ubicación, se detectó un error cuando se ingresaba por primera vez al sitio y no seleccionaba la ubicación , al momento de ingresar la dirección de despacho de forma manual generaba un error.

### v1.0.11
- Nueva sección "Descargar App" con redirección automática para dispositivos móviles.

### v1.0.10
- Corrección banner home, ahora toma como externas las url que comiencen por http

### v1.0.9
- Corrección valor productos con descuento.
- Cambio texto placeholder en input dirección (compra rapida y compra normal)
- Se vuelve activar validación por número en dirección de despacho (compra rapida y compra normal)


