# Keops's Dropdown web componenent

A simple and zero-dependency Dropdown Web Component

### Try web component

```
clone project on github.com
npm i
npm run example
With your browser open http://localhost:1234
```

### Usage

### Installation

Place the following `<script>` near the end of your page, right before the closing tag, to enable them.

`<script src="https://path_to_kwc-dropdown/dist/kwc_dropdown.js</script>"`

Dans une balise `<kwc-dropdown></kwc-dropdown>` créer un boutton pour ouvrir le menu déroulant (identifié avec : slot="button") et un menu (identifié avec : slot="menu")
Le boutton peut être n'importe quel élément : button, div, a, ...
Le menu peut être un élément de type UL ou de type DIV.
Un style prédéfini est appliqué au menu. Pour le désactiver utilisez le paramètre defautlStyle=false

### Example

```
    <kwc-dropdown position="bottom-right">
        <button slot="button">Click me</button>
        <ul slot="menu">
            <li id="add-folder">Create folder</li>
            <li id="add-bookmark">Create bookmark</li>
            <hr class="separator">
            <li id="about">About</li>
        </ul>
    </kwc-dropdown>

```

## Parameters

| Parameter    | Type    | Values       |                   Description                   |
| ------------ | ------- | ------------ | :---------------------------------------------: |
| position     | string  |              | Position of the dropdown relative to the button |
| defaultStyle | boolean | true / false |      (default: true) apply the default css      |
