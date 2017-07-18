Source files for coaliciones_2018
=====

## Preview

[You can find a preview of 'coaliciones_2018' here](https://la-silla-vacia.github.io/coaliciones_2018)

![](https://raw.githubusercontent.com/la-silla-vacia/coaliciones_2018/master/screenshot.png)

## Installation
First, make sure you have [Node.js](https://nodejs.org/) and [Yarn](https://yarnpkg.com/en/) installed on your operating system.

After cloning the repository run inside the directory:
```
yarn install
```

To start watching the project and opening in the browser run:
```
yarn start
```

To deploy to GitHub Pages run:
```
yarn run deploy
```

---

## Embeding on webpage
To embed on a webpage use this code:
```html
<!-- START OF OUR INTERACTIVE -->
<script type="text/javascript">
window.coaliciones_2018_data = {
  "dataUri": "https://lsv-data-visualizations.firebaseio.com/trinos_uribistas.json"
}
</script>
<div class="lsv-interactive" id="coaliciones_2018">
<img src="https://raw.githubusercontent.com/la-silla-vacia/lsv-interactive/master/misc/lsvi-loading.gif"
     alt="Interactive is loading" style="width:100%;max-width: 320px;margin: 4em auto;display: block;">
</div>
<script defer type="text/javascript" src="https://la-silla-vacia.github.io/coaliciones_2018/script.js"></script>
<!-- END OF OUR INTERACTIE -->
```
