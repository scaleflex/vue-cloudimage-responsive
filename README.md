[![Release](https://img.shields.io/badge/release-v1.3.5-blue.svg)](https://github.com/scaleflex/js-cloudimage-responsive/releases)
[![Free plan](https://img.shields.io/badge/price-includes%20free%20plan-green.svg)](https://www.cloudimage.io/en/home#b38181a6-b9c8-4015-9742-7b1a1ad382d5)
[![Contributions welcome](https://img.shields.io/badge/contributions-welcome-orange.svg)](#contributing)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Scaleflex team](https://img.shields.io/badge/%3C%2F%3E%20with%20%E2%99%A5%20by-the%20Scaleflex%20team-6986fa.svg)](https://www.scaleflex.com/en/home)
[![Cloudimage](https://img.shields.io/badge/Powered%20by-cloudimage-blue)](https://www.cloudimage.io/en/home)

## VERSIONS

- **Low Quality Preview**
- [**Blur Hash**](https://github.com/scaleflex/vue-cloudimage-responsive-blur-hash)
- [**Plain (CSS free)**](https://github.com/scaleflex/vue-cloudimage-responsive-plain)

<p align="center">
	<a href="https://www.cloudimage.io/#gh-light-mode-only">
		<img
			alt="The Lounge"
			src="https://scaleflex.cloudimg.io/v7/cloudimage.io/LOGO+WITH+SCALEFLEX-01.png?vh=f6080d&w=350">
	</a>
		<a href="https://www.cloudimage.io/#gh-dark-mode-only">
		<img
			alt="The Lounge"
			src="https://scaleflex.cloudimg.io/v7/cloudimage.io/cloudimage-logo-light.png?vh=b798ab&w=350">
	</a>
</p>

<h1 align="center">
   Vue Cloudimage Responsive | Cloudimage v7
</h1>

<h3 align="center">
(low quality preview)
</h3>

<p align="center">
	<strong>
		<a href="#table-of-contents">Docs</a>
		•
		<a href="https://scaleflex.github.io/vue-cloudimage-responsive/" target="_blank">Demo</a>
		•
		<a href="https://codesandbox.io/s/vue-cloudimage-responsive-example-b64iq4" target="_blank">Code Sandbox</a>
		•
		<a href="https://medium.com/@dmitry_82269/responsive-images-in-2019-now-easier-than-ever-b76e5a43c074" target="_blank">Why?</a>
	</strong>
</p>

This plugin detects the width of any image container as well as the device pixel ratio
density to load the optimal image size needed.
Images are resized on-the-fly via the <a href="https://cloudimage.io" target="_blank">Cloudimage service</a>, thus offering a comprehensive
automated image optimization service.

When an image is first loaded on your website or mobile app,
Cloudimage's resizing servers will download the origin image from
the source, resize it for the client's screen size and deliver to your users through one or multiple
Content Delivery Networks (CDNs). The generated image formats are cached in the CDN and will be delivered rocket fast on any subsequent request.

**NOTE:** Your original (master) images should be stored on a server
or storage bucket (S3, Google Cloud, Azure Blob...) reachable over
HTTP or HTTPS by Cloudimage. If you want to upload your master images to
Cloudimage, contact us at
[hello@cloudimage.io](mailto:hello@cloudimage.io).

<p align="center">
	<img
		alt="The Lounge"
		src="https://cdn.scaleflex.it/filerobot/cloudimage-process.jpg">
</p>

## Table of contents

- [Demo](#demo)
- [Responsive plugins family](#plugin_family)
- [Requirements](#requirements)
- [Step 1: Installation](#installation)
- [Step 2: Initialize](#initialize)
- [Step 3: Implement](#implement)
- [Configuration](#configuration)
- [Image properties](#image_properties)
- [Browser support](#browser_support)
- [Filerobot UI Family](#ui_family)
- [Contributing](#contributing)
- [License](#license)

## <a name="demo"></a> Demo

To see the Cloudimage Responsive plugin in action, please check out the
[Demo page](https://github.com/scaleflex/vue-cloudimage-responsive).
Play with your browser's window size and observe your
Inspector's Network tab to see how Cloudimage delivers the optimal
image size to your browser, hence accelerating the overall page
loading time.

## <a name="plugin_family"></a> Responsive plugins family
In order to use Cloudimage responsive plugins on your single-page application, please check out Cloudimage responsive plugins for vanilla Javascript and the most popular Javascript frameworks.

<details>
<summary>Javascript</summary>
<a href="https://github.com/scaleflex/js-cloudimage-responsive">Js Cloudimage Responsive (Low Quality Preview)</a><br/>
<a href="https://github.com/scaleflex/js-cloudimage-responsive/blob/master/README-BLUR-HASH.md">Js Cloudimage Responsive (Blur-hash)</a><br/>
<a href="https://github.com/scaleflex/js-cloudimage-responsive/blob/master/README-PLAIN.md">Js Cloudimage Responsive (Plain)</a>
</details>

<details>
<summary>React</summary>
<a href="https://github.com/scaleflex/react-cloudimage-responsive">React Cloudimage Responsive (Low Quality Preview)</a><br/>
<a href="https://github.com/scaleflex/react-cloudimage-responsive-blur-hash">React Cloudimage Responsive (Blur-hash)</a><br/>
<a href="https://github.com/scaleflex/react-cloudimage-responsive-plain">React Cloudimage Responsive (Plain)</a>
</details>

<details>
<summary>Angular</summary>
<a href="https://github.com/scaleflex/ng-cloudimage-responsive">Angular Cloudimage Responsive (Low Quality Preview)</a><br/>
</details>

## <a name="requirements"/> Requirements

To use the Cloudimage Responsive plugin, you will need a
Cloudimage token to deliver your images over CDN. Don't worry, it only takes seconds to get one by
registering [here](https://www.cloudimage.io/en/register_page).
Once your token is created, you can configure it as described below.
This token allows you to use 25GB of image cache and 25GB of worldwide
CDN traffic per month for free.

## <a name="installation"></a>Step 1: Installation

using npm

```
 npm install --save vue-cloudimage-responsive-plain vue-lazyload
```

## <a name="initialize"></a>Step 2: Initialize

After installing the vue-cloudimage-responsive lib, simply initialize it with your **token** and the **baseURL**
of your image storage with **CloudimageProvider**:
create vue instance a fle called main.js

```js
import Vue from 'vue'
import App from './App.vue'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  lazyComponent: true
})
new Vue({
  render: h => h(App)
}).$mount('#app')
```

```jsx
<template>
 <div id="app">
<CloudImageProvider v-bind:cloudImageConfig="cloudimageConfig">
 <h1>Simple demo of vue-cloudimage-responsive</h1>
<Img src="img.jpg" alt="Demo image"/>
</CloudImageProvider>
</div>
</template>

<script>
import Vue from 'vue';
import Img, { CloudImageProvider } from 'vue-cloudimage-responsive';

const cloudimageConfig = {
  token: 'demo',
  baseURL: 'https://cdn.scaleflex.it/'
};

export default{
    components: {
    CloudImageProvider,
    Img
    }
}
</script>
```

## <a name="implement"></a>Step 3: Implement it

### Img component:

```html
<Img src="img.jpg" alt="Demo image" v-bind:ratio="1.5" />
```

NOTE:

- "ratio" is recommended to prevent page layout jumping. The parameter is used to calculate image height to hold
  the image position while image is loading.
- you can also reference it with kabab-case : img

<a href="https://codesandbox.io/s/vue-cloudimage-responsive-example-b64iq4"><img src="https://codesandbox.io/static/img/play-codesandbox.svg" alt="edit in codesandbox"/></a>

### BackgroundImg component:

```html
<BackgroundImg src="img.jpg">
  {'Your conent...'}
</BackgroundImg>
```

NOTE: you can also reference it with kabab-case : background-img

<a href="https://codesandbox.io/s/vue-cloudimage-responsive-example-7dyqso"><img src="https://codesandbox.io/static/img/play-codesandbox.svg" alt="edit in codesandbox"/></a>

## <a name="configuration"></a> Config

### token

###### Type: **String** | Default: **"demo"** | _required_

Your Cloudimage customer token.
[Subscribe](https://www.cloudimage.io/en/register_page) for a
Cloudimage account to get one. The subscription takes less than a
minute and is totally free.

### customDomain

###### Type: **String** | Default: **"cloudimage.io"** | _optional_

If you use a custom CNAME for your cloudimage integration, you can set it here.
Note: this will disregard your token above as this should be built into the CNAME entry.

### baseURL

###### Type: **String** | Default: **"/"** | _optional_

Your image folder on server, this alows to shorten your origin image URLs.

### apiVersion

###### Type: **String** |Default: **'v7'** | _optional_

Allow to use a specific version of API.

- set a specific version of API
```javascript
const cloudimageConfig = {
  token: 'demo',
  baseURL: 'https://cdn.scaleflex.it/',
  apiVersion: 'v7'                            // optional
};
```
- disable API version
```javascript
const cloudimageConfig = {
  token: 'demo',
  baseURL: 'https://cdn.scaleflex.it/',
  apiVersion: null                            // optional
};
```

### doNotReplaceURL

###### Type: **bool** | Default: **false**

If set to **true** the plugin will only add query params to the given source of image.

### <a name="lazy_loading_config"></a>lazyLoading

###### Type: **Bool** | Default: **true** | _optional_

Only images close to the client's viewport will be loaded, hence accelerating the page loading time. The plugin uses
[vue-lazyload](https://github.com/hilongjw/vue-lazyload) library to achieve it.

### lazyLoadOffset

###### Type: **Number/Array(Number)** | Default: **100**

Say if you want to preload a component even if it's 100px below the viewport (user have to scroll 100px more to see this component), you can set offset props to 100. On the other hand, if you want to delay loading a component even if it's top edge has already appeared at viewport, set offset to negative number.

Library supports horizontal lazy load out of the box. So when you provide this prop with number like 100 it will automatically set left edge offset to 100 and top edge to 100;

If you provide this prop with array like [100, 200], it will set left edge offset to 100 and top offset to 200.

### params

###### Type: **String** | Default: **'org_if_sml=1'** | _optional_

Applies default Cloudimage operations/ filters to your image, e.g. brightness, contrast, rotation...
Multiple params can be applied, separated by "`&`" e.g. wat_scale=35&wat_gravity=northeast&wat_pad=10&grey=1

```javascript
params: 'org_if_sml=1'
```

#### alternative syntax: type: **Object**

```javascript
params: {
    org_if_sml: 1,
    grey: 1,
    ...
}
```

[Full cloudimage v7 documentation here.](https://docs.cloudimage.io/go/cloudimage-documentation-v7/en/introduction)

### placeholderBackground

###### Type: **String** | Default: **'#f4f4f4'** | _optional_

Placeholder colored background while the image is loading or use it to set your custom placeholder image or gif

for example

`placeholderBackground: "url('https://cdn.scaleflex.it/filerobot/red-loader.gif') 50% 50% no-repeat"`

### lowQualityPreview

###### Type: **Object**

- `lowQualityPreview.minImgWidth` number (default: 400) - minimal width of an image to load low quality preview image

Example:

```javascript
lowQualityPreview: {
  minImgWidth = 400
}
```

### presets

###### Type: **Object**

Default:

```javascript
const cloudimageConfig = {
  token: 'demo',
  baseUrl: 'https://cdn.scaleflex.it/',
  ...
  presets: {
      xs: '(max-width: 575px)', // up to 575    PHONE
      sm: '(min-width: 576px)', // 576 - 767    PHABLET
      md: '(min-width: 768px)', // 768 - 991    TABLET
      lg: '(min-width: 992px)', // 992 - 1199   SMALL_LAPTOP_SCREEN
      xl: '(min-width: 1200px)' // from 1200    USUALSCREEN
  }
};
```

Breakpoints shortcuts to use in image size property, can be overwridden.

### limitFactor

###### Type: **Number** | Default: **100** | _optional_

Rounds up size of an image to nearest limitFactor value.

For example

- for an image with width **358px** and limitFactor equals **100** the plugin will round up to 400px
- for an image with width **358px** and limitFactor equals **5** the plugin will round up to 360px

### devicePixelRatioList

###### Type: **[Number,...]** | Default: **[1, 1.5, 2]** | _optional_

List of supported device pixel ratios. If there is no need to support retina devices, you should set empty array `devicePixelRatioList: []`

### delay

###### Type: **Number** | _optional_

Delay for processing an image after rendering component.

**NOTE:** normally the parameter is not needed, but in some cases with integrating third part libraries it can fix wrong
calculation of image container.

### ImageSizeAttributes

###### Type: **String** | possible values: 'use', 'ignore', 'take-ratio' | Default: **'use'** 

If width and height attributes are set:

**use** - width & height attributes values will be used to calculate image size (according to user's DPR) and **ratio**. 

**take-ratio** - width & height attributes values will be used only to calculate **ratio**.

**ignore** - width & height attributes will be ignored.

If width and height attributes are NOT set, image container size will be detected to calculate result image size (according to user's DPR)

*Note*: If only width or height attributes is set, ratio is going to be taken from ci-ratio image attribute

## <a name="image_properties"></a> Image properties

### src

###### Type: **String** | Default: **undefined** | _required_

Original image hosted on your web server. You can use absolute path or
relative to baseUrl in your config.

**NOTES:**

The plugin uses a special algorithm to detect the width of image container and set the image size accordingly.
This is the recommended way of using the Cloudimage Responsive plugin.

### onImgLoad
###### Type: **function** | Default: **undefined**
A function to be executed after the image is loaded
```jsx
<Img
  src="dino-reichmuth-1.jpg"
  onImgLoad={(params)=>{console.log(params);}}/>
```
### width

###### Type: **String** (e.g. 300px, 20vw) | Default: **undefined**

If it's set the plugin will use width as fixed value and change only according device pixel ratio.

### height

###### Type: **String** (e.g. 300px, 20vh) | Default: **undefined**

If it's set the plugin will use height as fixed value and change only according device pixel ratio.

### params

###### Type: **String** | Default: **undefined** | _optional_

You can apply any Cloudimage operations/ filters to your image, e.g. brightness, contrast, rotation...
Multiple params can be applied, separated by "`&`" e.g. **wat_scale=35&wat_gravity=northeast&wat_pad=10&grey=1**

```javascript
params = 'gray=1&bright=10'
```
### doNotReplaceURL

###### Type: **bool** | Default: **false**

If set to **true** the plugin will only add query params to the given source of image.

#### alternative syntax: type: **Object**

```javascript
params={{
    bright: 10,
    grey: 1,
    ...
}}
```

[Full cloudimage v7 documentation here.](https://docs.cloudimage.io/go/cloudimage-documentation-v7/en/introduction)

### sizes

###### Type: **Object** | Default: **undefined**

**{preset breakpoint (xs,sm, md,lg,xl) or media query + ' ' + image params}**:
imageProps: **{ w, h, r, src }** where 

* **w** - width, 
* **h** - height, 
* **r** - ratio, 
* **src** - original image hosted on your web server. You can use absolute path or relative to the baseURL in your config.

```jsx
<Img
  src="dino-reichmuth-1.jpg"
  sizes="{
     '(max-width: 575px)': { w: 400, h: 150 },
     '(min-width): 576px)': { src: 'dino-reichmuth-square.jpg', r: 1 },
     '(min-width: 620px)': { h: 560 },
     '(min-width: 768px)': { w: '50vw' },
     lg: { w: '55vw', h: 300 },
     xl: { w: 1200 }
 }"/>
```

You can drop some breakpoints, for example:

```jsx
<Img
  src="dino-reichmuth-1.jpg"
  v-bind:sizes="{
    sm: { w: 400, h: 200 },
    '(min-width: 620px)': { w: 200, h: 60 }
  }"
/>
```

##### new experimental syntax

md: { w: '40vw', h: 350 } or md: { w: 250, h: '20vh' }

adds possibility to use fixed height or width and change dynamically other dimension

**NOTE:** if size is not set, the plugin uses a special algorithm to
detect the width of image container and set the image size accordingly. This is the recommended way of using the Cloudimage Responsive plugin.

### ratio

###### Type: **Number** | _optional_

It is recommended to prevent page layout jumping. The parameter is used to calculate image height to hold
the image position while image is loading.

To see the full cloudimage documentation [click here](https://docs.cloudimage.io/go/cloudimage-documentation)


## <a name="browser_support"></a>Browser support

Tested in all modern browsers and IE 11.

## <a name="ui_family"></a>Filerobot UI Familiy

## <a name="ui_family"></a>Filerobot UI Familiy
* [Cloudimage Responsive](https://github.com/scaleflex/js-cloudimage-responsive)
* [JS Cloudimage 360 view](https://github.com/scaleflex/js-cloudimage-360-view)
* [Image Editor](https://github.com/scaleflex/filerobot-image-editor)
* [Filerobot Media Asset Widget](https://scaleflex.cloudimg.io/v7/plugins/filerobot-widget/demo/index.html?vh=d6c246&func=proxy)

## <a name="contributing"></a>Contributing!

All contributions are super welcome!

## <a name="license"></a>License

Vue Cloudimage Responsive is provided under the [MIT License](https://opensource.org/licenses/MIT)
