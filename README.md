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


### Changelog

### v1.0.9
Corrección valor productos con descuento.<br>
Cambio texto placeholder en input dirección (compra rapida y compra normal)<br>
Se vuelve activar validación por número en dirección de despacho (compra rapida y compra normal)<br>

### v1.0.10
Corrección banner home, ahora toma como externas las url que comiencen por http