<template>
  <div id="app">
    <CloudImageProvider v-bind:cloudImageConfig="cloudImageConfig">
      <section class="home">
        <div class="container">
          <a
            class="logo"
            href="https://scaleflex.github.io/vue-cloudimage-responsive/"
          >Vue Cloudimage Responsive</a>
          <p>(Low quality preview version)</p>
          <div class="reference-buttons">
            <a
              class="github-button"
              target="_blank"
              href="https://github.com/Scaleflex/vue-cloudimage-responsive/subscription"
              data-icon="octicon-eye"
              aria-label="Watch Scaleflex/vue-cloudimage-responsive on GitHub"
            >Watch</a>
            <a
              class="github-button"
              target="_blank"
              href="https://github.com/Scaleflex/vue-cloudimage-responsive"
              data-icon="octicon-star"
              aria-label="Star Scaleflex/vue-cloudimage-responsive on GitHub"
            >Star</a>
            <a
              class="github-button"
              target="_blank"
              href="https://github.com/Scaleflex/vue-cloudimage-responsive/fork"
              data-icon="octicon-repo-forked"
              aria-label="Fork Scaleflex/vue-cloudimage-responsive on GitHub"
            >Fork</a>
            <a
              class="twitter-share-button btn btn-info"
              target="_blank"
              href="https://twitter.com/intent/tweet?text=Responsive%20images,%20now%20easier%20than%20ever&url=https://scaleflex.github.io/vue-cloudimage-responsive/&via=cloudimage&hashtags=images,cloudimage,responsive_images,lazy_loading,web_acceleration,image_optimization,image_CDN,image_CDNwebp,jpeg_xr,jpg_optimization,image_resizing_and_CDN,cropresize"
            >
              <i></i>
              <span>Tweet</span>
            </a>
          </div>
          <h1>
            <strong>Responsive images</strong>, now easier than ever.
          </h1>
          <h2>
            Make your existing images
            <strong>responsive</strong> without creating new images.
            <strong>Upload</strong>
            one high quality original image and the plugin will{{ ' ' }}
            <strong>resize, compress and accelerate</strong>
            images across the World in your site for all devices. The plugin
            supports{{ ' ' }}
            <strong>lazy load</strong> with
            <strong>fancy animation</strong>
            {{ ' ' }}
            on image load.
          </h2>
          <div class="actions-wrapper">
            <a
              id="view-github-btn"
              href="https://github.com/scaleflex/vue-cloudimage-responsive"
              class="btn btn-primary"
              target="_blank"
            >View on GitHub</a>
            <a
              href="https://codesandbox.io/s/vue-cloudimage-resposnove-example-bqg7g"
              style="margin-left: 5px"
              class="btn btn-light"
              target="_blank"
            >Edit on CodeSandbox</a>
          </div>
        </div>
        <a href="https://github.com/scaleflex/vue-cloudimage-responsive" target="_blank">
          <img
            class="fork-me-on-github"
            src="https://s3.amazonaws.com/github/ribbons/forkme_right_gray_6d6d6d.png"
            alt="Fork me on GitHub"
          />
        </a>

        <a href="https://www.filerobot.com/" class="robot-icon">
          <img
            style=" width: 100%"
            id="robot-icon"
            src="https://demo.cloudimg.io/width/800/q35.foil1/https://cdn.scaleflex.it/filerobot/assets/robot-icon-left.png"
            alt
          />
        </a>
      </section>
      <section class="container-box-wrapper" style="margin: 0">
        <ContainerBox v-bind:config="cloudImageConfig" />
        <Img v-bind:src="images[0].src" v-bind:ratio="images[0].ratio" />
      </section>
      <div style=" background: #fff">
        <section class="container ready-to-start">
          <h2 class="text-center">Features</h2>

          <ul>
            <li>
              <strong>Resize large images</strong> to the size needed by your
              design and
              <strong>generate multiple images</strong> for different
              device screen size
            </li>
            <li>
              Strip all unnecessary metadata and{{ ' ' }}
              <strong>optimize JPEG, PNG and GIF compression</strong>
            </li>
            <li>
              Efficiently
              <strong>lazy load images</strong> to speed initial page load and
              save bandwidth
            </li>
            <li>
              Use the low quality image with "blur-up" technique to{{ ' ' }}
              <strong>show a preview</strong> of the image
              <strong>while it loads</strong>
            </li>
            <li>
              <strong>Hold the image position</strong> so your page doesn't jump
              while images load
            </li>
          </ul>
        </section>
      </div>
      <section class="container ready-to-start">
        <h2 class="text-center">How it works</h2>
        <p>
          The plugin detects the
          <strong>width of image's container</strong>
          {{ ' ' }} and
          <strong>pixel ratio density</strong> of your device to
          load the exact image size you need. It
          <strong>processes</strong>
          images via{{ ' ' }}
          <a href="https://www.cloudimage.io/en/home">Cloudimage.io</a>
          {{ ' ' }} service which offers comprehensive{{ ' ' }}
          <strong>automated image optimization</strong> solutions.
        </p>
        <p style=" marginTop: 20px ">
          When an image is first loaded on your website or mobile app,
          Cloudimage's resizing servers will
          <strong>download</strong> your origin image from your origin server,
          <strong>resize</strong>
          it and{{ ' ' }}
          <strong>deliver</strong>
          to your user via lightning-fast Content Delivery Networks (CDNs). Once
          the image is resized in the format of your choice, Cloudimage will
          send it to a Content Delivery Network, which will in turn deliver it
          rocket fast to your visitors,{{ ' ' }}
          <strong>responsively across various screen sizes</strong>.
        </p>
        <p style=" marginTop: 20px ">
          Read the following{{ ' ' }}
          <a
            href="https://medium.com/cloudimage/cloudimage-resizes-your-images-saves-time-accelerates-your-website-and-increases-your-conversion-eb128903d4c2"
          >article</a>
          {{ ' ' }} to learn more about Cloudimage.io service.
        </p>
      </section>
      <div style=" background: #fff">
        <section class="container ready-to-start">
          <h2 class="text-center">In numbers</h2>

          <p>
            We have original image stored via CDN with{{ ' ' }}
            <strong>6240×4160 px resolution</strong>
            and{{ ' ' }}
            <strong>8.7 mb size</strong>
            :{{ ' ' }}
            <code>https://cdn.scaleflex.it/demo/redcharlie.jpg</code>
            {{ ' ' }}
            <a
              target="_blank"
              href="https://cdn.scaleflex.it/demo/redcharlie.jpg"
            >link</a>
            {{ ' ' }}
            In the table below we can see what size and resolution will be
            loaded depending on the image's container.
          </p>

          <table class="table table-bordered">
            <thead>
              <tr>
                <th>container size</th>
                <th>pixel ratio density</th>
                <th>calculated width</th>
                <th>result: dimantion | size | link</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td rowspan="2" style="verticalAlign: middle ">400px</td>
                <td>1</td>
                <td>400px</td>
                <td>
                  400×267 | 18.7 kb |{{ ' ' }}
                  <a
                    target="_blank"
                    href="https://demo.cloudimg.io/width/400/q35.foil1/https://cdn.scaleflex.it/demo/redcharlie.jpg"
                  >link</a>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>800px</td>
                <td>
                  800×533 | 58.1 kb |{{ ' ' }}
                  <a
                    target="_blank"
                    href="https://demo.cloudimg.io/width/800/q35.foil1/https://cdn.scaleflex.it/demo/redcharlie.jpg"
                  >link</a>
                </td>
              </tr>

              <tr>
                <td rowspan="2" style=" verticalAlign:middle ">570px</td>
                <td>1</td>
                <td>600px</td>
                <td>
                  600×400 | 35.4 kb |{{ ' ' }}
                  <a
                    target="_blank"
                    href="https://demo.cloudimg.io/width/600/q35.foil1/https://cdn.scaleflex.it/demo/redcharlie.jpg"
                  >link</a>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>1200px</td>
                <td>
                  1200x800 | 119 kb |{{ ' ' }}
                  <a
                    target="_blank"
                    href="https://demo.cloudimg.io/width/1200/q35.foil1/https://cdn.scaleflex.it/demo/redcharlie.jpg"
                  >link</a>
                </td>
              </tr>

              <tr>
                <td rowspan="2" style=" verticalAlign: 'middle' ">720px</td>
                <td>1</td>
                <td>800px</td>
                <td>
                  800×533 | 58.1 kb |{{ ' ' }}
                  <a
                    target="_blank"
                    href="https://demo.cloudimg.io/width/800/q35.foil1/https://cdn.scaleflex.it/demo/redcharlie.jpg"
                  >link</a>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>1600px</td>
                <td>
                  1600px×1066 | 200 kb |{{ ' ' }}
                  <a
                    target="_blank"
                    href="https://demo.cloudimg.io/width/1600/q35.foil1/https://cdn.scaleflex.it/demo/redcharlie.jpg"
                  >link</a>
                </td>
              </tr>

              <tr>
                <td rowspan="2" style=" verticalAlign: 'middle' ">1170px</td>
                <td>1</td>
                <td>1200px</td>
                <td>
                  1200x800 | 119 kb |{{ ' ' }}
                  <a
                    target="_blank"
                    href="https://demo.cloudimg.io/width/1200/q35.foil1/https://cdn.scaleflex.it/demo/redcharlie.jpg"
                  >link</a>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>2400px</td>
                <td>
                  2400x1600 | 405 kb |{{ ' ' }}
                  <a
                    target="_blank"
                    href="https://demo.cloudimg.io/width/2400/q35.foil1/https://cdn.scaleflex.it/demo/redcharlie.jpg"
                  >link</a>
                </td>
              </tr>
            </tbody>
          </table>

          <p>
            * The plugin
            <strong>rounds container width</strong> to next possible value which
            can be divided by 100 without the remainder. It's done for
            <strong>cache reasons</strong> so that we cache not all images
            different by 1px, but only 100px, 200px, 300px …
          </p>
        </section>
      </div>
      <section class="ready-to-start">
        <div class="container">
          <h2 class="text-center">Gallery demo</h2>

          <p>
            Change the size of your browser's window and reload the page to see
            how the Cloudimage Responsive plugin will deliver an optimized image
            for the screen size.
          </p>
        </div>
        <div
          class="container-fluid"
          style="
              maxWidth: 1200px;
              marginLeft: auto;
              marginRight: auto;
              paddingTop: 20px;
              "
        >
          <div class="row images-in-columns">
            <div class="col-12">
              <div class="container-box-wrapper">
                <ContainerBox />
                <Img v-bind:src="images[8].src" v-bind:ratio="images[8].ratio" />
              </div>
            </div>

            <div v-for="(image, index) in imagesSliced" :key="index" class="col-6">
              <div class="container-box-wrapper">
                <ContainerBox />
                <Img v-bind:src="image.src" v-bind:ratio="image.ratio" />original:
                <i>{{ image.original_size }}</i>
                {{ ' ' }}
                <a
                  :href="
                    'https://cloudimage.public.airstore.io/demo/' + image.src
                  "
                  target="_blank"
                >link</a>
                <br />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 col-lg-7">
              <Img
                :src="images[17].src"
                :sizes="{
                  '(max-width: 575px)': { w: 400, h: 150 },
                  '(min-width: 576px)': { r: 1 },
                  '(min-width: 620px)': { h: 560 },
                  '(min-width: 768px)': { w: '50vw' },
                  '(min-width: 992px)': { w: '55vw', h: 300 },
                  '(min-width: 1200px)': { w: 1200 }
                }"
              />
              <small>
                original:
                <i>{{ images[17].original_size }}</i>
                {{ ' ' }}
                <a
                  :href="
                    'https://cloudimage.public.airstore.io/demo/' +
                      images[17].src
                  "
                  target="_blank"
                >link</a>
                <br />
              </small>
            </div>
            <div class="col-md-6 col-lg-5 desc-wrapper-with-media-query">
              <h4>
                You can control your image size/ratio/crop with media query
                breakpoints
              </h4>
              <p>Resize your browser window to see how it works</p>
              <Prism style="prism-dark">{{ syntaxHighlight1 }}</Prism>
            </div>
          </div>
        </div>
      </section>
      <section class="ready-to-start">
        <div class="container">
          <h2 class="text-center">Crop your images</h2>

          <div class="row">
            <div class="col-md-4">
              <p>Original Images</p>
              <div>
                <div style=" width: 200px">
                  <div class="container-width-box">
                    container
                    <span>200</span>x
                    <span>200</span>px
                  </div>
                </div>
                <div
                  class="container-box-wrapper"
                  style="
                      display: inline-block;
                      width: 200px;
                      height: 200px;
                      position: relative
                    "
                >
                  <img src="https://doc.cloudimg.io/v7/sample.li/boat.jpg" />
                  <div class="border-box" />
                </div>
              </div>
              <Prism>{{syntaxHighlight2}}</Prism>
            </div>

            <div class="col-md-4">
              <p>Crop</p>
              <div>
                <div style=" width: 200px">
                  <div class="container-width-box">
                    container
                    <span>200</span>x
                    <span>200</span>px
                  </div>
                </div>

                <div
                  class="container-box-wrapper"
                  style="
                      display: inline-block;
                      width: 200px;
                      height: 200px;
                      position: relative
                    "
                >
                  <Img src="boat.jpg" params="func=crop" />
                  <div class="border-box" />
                </div>
              </div>
              <Prism>{{syntaxHighlight3}}</Prism>
            </div>

            <div class="col-md-4">
              <p>Auto crop</p>
              <div>
                <div style="width: 200px">
                  <div class="container-width-box">
                    container
                    <span>200</span>x
                    <span>200</span>px
                  </div>
                </div>
                <div
                  class="container-box-wrapper"
                  style="
                      display: inline-block;
                      width: 200px;
                      height: 200px;
                      position: relative;
                    "
                >
                  <Img src="boat.jpg" params="func=crop&gravity=auto" />
                  <div class="border-box" />
                </div>
              </div>
              <Prism>{{syntaxHighlight4}}</Prism>
            </div>
          </div>
        </div>
      </section>
      <section class="ready-to-start">
        <div class="container">
          <h2 class="text-center">Use with background images</h2>
          <Prism>{{syntaxHighlight5}}</Prism>
        </div>

        <BackgroundImg
          src="ameen-fahmy.jpg"
          params="func=crop&ci_info=0"
          :styles="{
            background: 'transparent 50% 50% / cover no-repeat',
            color: '#fff',
            position:'relative'
          }"
        >
          <div style="background: rgba(0,0,0,.6); padding: 40px ">
            <div class="container">
              <h2>What is Lorem Ipsum?</h2>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
            </div>
          </div>
        </BackgroundImg>
      </section>
      <section class="container ready-to-start">
        <h2 class="text-center">Ready to get started?</h2>
        <p>
          To use the plugin, you will need a Cloudimage token. Don't worry, it
          only takes seconds to get one by registering{{ ' ' }}
          <a
            href="https://www.cloudimage.io/en/register_page"
          >here</a>. Once
          your token is created, you can configure it as described below. This
          token allows you to use 25GB of image cache and 25GB of worldwide CDN
          traffic per month for free.
        </p>
      </section>
      <section class="container">
        <div class="text-center">
          <div id="plugin-version-switcher" class="plugin-version-switcher btn-group btn-toggle"></div>
        </div>
      </section>
      <section class="container">
        <div class="text-center">
          <div id="plugin-version-switcher" class="plugin-version-switcher btn-group btn-toggle"></div>
        </div>

        <div id="js-version-box">
          <div class="action-wrapper first-action">
            <p>Install using npm</p>
            <figure class="highlight">
              <pre>
                  <code class="javascript">
                    npm install --save vue-cloudimage-responsive-plain vue-lazyload
                  </code>
                </pre>
            </figure>
          </div>

          <div>
            <div class="action-wrapper second-action">
              <p>
                initialize it with your
                <strong>token</strong>
                and the{{ ' ' }}
                <strong>baseURL</strong>
                of your image storage using{{ ' ' }}
                <strong>CloudimageProvider</strong>
              </p>
              <Prism language="js">{{syntaxHighlight6}}</Prism>
              <Prism>{{syntaxHighlight7}}</Prism>
              <p>
                Get your Cloudimage tokens{{ ' ' }}
                <a
                  href="https://www.cloudimage.io/en/register_page"
                >here</a>.
              </p>
            </div>

            <div class="action-wrapper third-action">
              <p>Implement it, just using the Img component:</p>
              <prism>{{ syntaxHighlight8 }}</prism>
              <p>
                <small>
                  NOTE: "ratio" is recommended to prevent page layout jumping.{{  
                  ' '}} The parameter is used to calculate image height to hold the
                  image position while image is loading.
                </small> 
              </p>
            </div>

            <div class="action-wrapper forth-action">
              <p>
                …and you're done!{{ ' ' }}
                <a
                  href="https://github.com/scaleflex/vue-cloudimage-responsive#table-of-contents"
                  target="_blank"
                >{{ ' ' }} Visit the full documentation here.</a>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section style="text-align: center">
        <div class="container ready-to-start">
          <h2>Any questions?</h2>
          <p>
            Contact us at{{ ' ' }}
            <a href="mailto:hello@cloudimage.io">hello@cloudimage.io</a>, our
            experts will be happy to help!
          </p>
        </div>
      </section>
      <footer>
        <div style=" background: #fff ">
          <section class="container ready-to-start filerobot-ui-family">
            <div class="row">
              <div
                class="col-sm-3 filerobot-ui-family-label"
                style=" max-width: 200px; min-width: 200px; "
              >
                <h5>Filerobot UI family:</h5>
              </div>
              <div
                class="col-sm-9 filerobot-ui-family-libs"
                style=" max-width: 'calc(100% - 200px)' "
              >
                <ul>
                  <li>
                    <a
                      target="_blank"
                      href="https://github.com/scaleflex/js-cloudimage-responsive"
                    >JS Cloudimage Responsive</a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      href="https://github.com/scaleflex/ng-cloudimage-responsive"
                    >Angular Cloudimage Responsive</a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      href="https://github.com/scaleflex/js-cloudimage-360-view"
                    >JS Cloudimage 360 view</a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      href="https://github.com/scaleflex/filerobot-uploader"
                    >Uploader</a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      href="https://github.com/scaleflex/filerobot-image-editor"
                    >Image Editor</a>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>
        <hr />
        <div class="copyright">
          <div class="container">
            <div class="row">
              <div class="team-desc col-sm-9">
                <div>
                  Made with ❤ in 2019 in Paris, Munich and Sofia by the
                  Scaleflex team, the guys behind{{ ' ' }}
                  <a
                    href="https://www.cloudimage.io/en/home"
                    target="_blank"
                  >Cloudimage.io</a>
                  .
                </div>
                <div style="margin-top: 10px ">
                  Powered by{{ ' ' }}
                  <a
                    href="https://www.scaleflex.it/en/home"
                    target="_blank"
                  >Scaleflex team</a>
                  . All rights reserved.
                </div>
              </div>
              <div class="footer-menu col-sm-3">
                <ul>
                  <li>
                    <a
                      href="https://github.com/scaleflex/vue-cloudimage-responsive"
                      target="_blank"
                    >View GitHub</a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/scaleflex/vue-cloudimage-responsive/issues"
                      target="_blank"
                    >Current Issues</a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/scaleflex/vue-cloudimage-responsive#table-of-contents"
                      target="_blank"
                    >Documentation</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <div id="device-pixel-ratio" class="device-pixel-ratio">
        <div class="label">Your device pixel ratio:</div>
        {{ ' ' }}
        <span>{{ devicePixelRatio }}</span>
        <hr />
        <div class="label">Your device width:</div>
        <div class="window-width-box">
          <span>{{ innerWidth }} px</span>
        </div>
      </div>
    </CloudImageProvider>
  </div>
</template>

<script>
import ContainerBox from "./components/ContainerBox";
import CloudImageProvider from "../../src/CloudImageProvider";
import Img from "../../src/Img";
import BackgroundImg from "../../src/background";
import { images } from "./mock";
import "prismjs";
import "prismjs/themes/prism-okaidia.css";
import "prismjs/components/prism-scss.min";
import "prismjs/plugins/autolinker/prism-autolinker.min";
import "prismjs/plugins/autolinker/prism-autolinker.css";
import Prism from "vue-prism-component";

//cloud configuration
const cloudImageConfig = {
  token: "demo",
  baseURL: "https://cloudimage.public.airstore.io/demo/",
  params: "ci_info=1&org_if_sml=1",
  placeholderBackground: "#e1e1e1",
  limitFactor: 10,
  lowQualityPreview: {
    minImgWidth: 150
  }
};

const imagesSliced = images.slice(1, 7);

export default {
  name: "app",
  components: {
    ContainerBox,
    CloudImageProvider,
    Img,
    BackgroundImg,
    Prism
  },
  // passing to config to provider
  props: ["cloudimageConfig"],
  mounted() {
    const self = this;

    window.addEventListener("resize", () => {
      self.innerWidth = window.innerWidth;
    });
  },

  data() {
    return {
      syntaxHighlight1: `<Img
  src="images[17].src"
  sizes="{
    '(max-width: 575px)': { w: 400, h: 150 },
    '(min-width: 576px)': { r: 1 },
    '(min-width: 620px)': { h: 560 },
    '(min-width: 768px)': { w: '50vw' },
    '(min-width: 992px)': { w: '55vw', h: 300 },
    '(min-width: 1200px)': { w: 1200 }
  }"
/>`,
      syntaxHighlight2: `<div style=" width: 200px, height: 200px ">
  <img 
    src="https://doc.cloudimg.io/v7/sample.li/boat.jpg"
  />
</div>`,
      syntaxHighlight3: `<div style=" width: 200px, height: 200px ">
  <Img 
    src="boat.jpg" 
    params="func=crop"
  />
</div>`,
      syntaxHighlight4: `<div style=" width: 200px, height: 200px ">
  <Img 
    src="boat.jpg" 
    params="func=crop&gravity=auto"
  />
</div>`,
      syntaxHighlight5: `<BackgroundImg
  src="ameen-fahmy.jpg" 
  params="func=crop" 
  style="background: transparent 50% 50% / cover no-repeat">...</BackgroundImg>`,

      syntaxHighlight6: `import Vue from 'vue';
import App from './App.vue';
import VueLazyload from 'vue-lazyload';

Vue.use(VueLazyload, {
  lazyComponent: true
});
new Vue({
  render: h => h(App)
}).$mount('#app');`,
      syntaxHighlight7: `import Vue from 'vue';
import Img, { CloudimageProvider } from 'vue-cloudimage-responsive';

const cloudimageConfig = {
  token: 'demo',
  baseURL: 'https://jolipage.airstore.io/'
};

<template>
<CloudimageProvider config={cloudimageConfig}>
 <h1>Simple demo of vue-cloudimage-responsive</h1>
<Img src="img.jpg" alt="Demo image" ratio=1.5 />
</CloudimageProvider>
</template>

<script>
'export default{
    components:{
    CloudimageProvider,
    Img
    }
}
'
< /script>
`,
      syntaxHighlight8: `
    <Img src="img.jpg" alt="Demo image"  />
`,

      images,
      imagesSliced,
      cloudImageConfig,
      innerWidth: window.innerWidth,
      devicePixelRatio: (window.devicePixelRatio || 1).toFixed(1)
    };
  }
};
</script>
