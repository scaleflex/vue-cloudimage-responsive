<template>
  <div v-if="processed">
    <slot></slot>
  </div>
  <lazy-component
    v-else-if="properties.config.lazyLoading && lazyLoadActive"
    @show="handler"
  >
    <div :class="loadedStyle" :style="container">
      <div v-if="processedImage.preview" :style="previewBgWrapper">
        <div :style="previewBg" />
      </div>

      <div
        v-if="processedImage.preview"
        class="cloudimage-background-content"
        style="position: relative"
      >
        <slot></slot>
      </div>
      <slot v-else></slot>
    </div>
  </lazy-component>
  <div v-else :class="loadedStyle" :style="container">
    <div v-if="processedImage.preview" :style="previewBgWrapper">
      <div :style="previewBg" />
    </div>
    <div
      v-if="processedImage.preview"
      class="cloudimage-background-content"
      style="position: relative"
    >
      <slot></slot>
    </div>
    <slot v-else></slot>
  </div>
</template>

<script>
import { isServer, processReactNode } from "cloudimage-responsive-utils";
import { backgroundStyles as styles } from "cloudimage-responsive-utils";
export default {
  // geting the data from the provider
  inject: ["cloudProvider"],
  props: {
    src: {
      type: String,
      default: undefined,
      required: true,
    },
    width: {
      type: String,
      default: undefined,
    },
    height: {
      type: String,
      default: undefined,
    },
    params: {
      type: String,
      default: undefined,
    },
    sizes: {
      type: Object,
      default: undefined,
    },
    ratio: {
      type: Number,
    },
    alt: {
      type: String,
    },
    className: {
      type: String,
    },
    styles: {
      type: Object,
    },
    onImgLoad: {
      type: Function,
      default: undefined,
    },
    doNotReplaceURL: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      server: isServer(),
      lazyLoadActive: true,
      cloudimgURL: "",
      processed: false,
      loaded: false,
      processedImage: {},
      properties: {
        src: this.src,
        params: this.params,
        config: this.cloudProvider.config,
        style: this.styles,
        width: this.width,
        height: this.height,
        sizes: this.sizes,
        ratio: this.ratio,
        alt: this.alt,
        className: this.className,
        onImgLoad: this.onImgLoad,
        doNotReplaceURL: this.doNotReplaceURL
      },
      container: {},
      previewBgWrapper: {},
      previewBg: "",
      lazyLoadConfig: {},
      otherProps: {},
      loadedStyle: {},
    };
  },
  mounted() {
    if (this.server) return;
    const loaded = this.loaded;

    //initial loading style
    this.loadedStyle = [this.className, "cloudimage-background", "loading"];

    //initial value preview wrapper style
    this.previewBgWrapper = styles.previewBgWrapper({ loaded });

    this.processBg();
  },
  methods: {
    handler() {
      const style = this.properties.style;
      const cloudimgURL = this.processedImage.cloudimgURL;
      const previewCloudimgURL = this.processedImage.previewCloudimgURL;

      this.lazyLoadActive = false;
      //initial value container style
      this.container = styles.container({ style, cloudimgURL });
      //initial value preview style
      this.previewBg = styles.previewBg({ previewCloudimgURL });
    },
    processBg(update, windowScreenBecomesBigger) {
      const bgNode = this.$el;
      const data = processReactNode(
        this.properties,
        bgNode,
        update,
        windowScreenBecomesBigger
      );

      if (data) {
        this.processedImage = data;
      }
    },
    preLoadImg(cloudimgURL) {
      const img = new Image();

      img.onload = this._onImgLoad;

      img.src = cloudimgURL;
    },

    _onImgLoad(event) {
      this.loaded = true;

      const { onImgLoad } = this.properties;
      if (typeof onImgLoad === "function") {
        onImgLoad(event);
      }
    },
  },

  watch: {
    "properties.config.innerWidth": function (_, oldVal) {
      const style = this.properties.style;
      const cloudimgURL = this.processedImage.cloudimgURL;
      const previewCloudimgURL = this.processedImage.previewCloudimgURL;
      const loaded = this.loaded;

      if (this.server) return;

      const {
        config: { innerWidth },
      } = this.properties;

      if (oldVal !== innerWidth) {
        //if width changed update the data from proccesing background image
        this.processBg(true, innerWidth > oldVal);
      }
      //updating value of container style if width changed
      this.container = styles.container({ style, cloudimgURL });
      //updating value of preview wrapper style if width changed
      this.previewBgWrapper = styles.previewBgWrapper({ loaded });
      //updating value of preview style if width changed
      this.previewBg = styles.previewBg({ previewCloudimgURL });
    },
    "properties.src": function (_, oldVal) {
      const { src } = this.properties;
      if (src !== oldVal.src) {
        this.processBg();
      }
    },
    loaded: function (newVal) {
      const loaded = newVal;
      const style = this.properties.style;
      const cloudimgURL = this.processedImage.cloudimgURL;
      const previewCloudimgURL = this.processedImage.previewCloudimgURL;

      if (loaded) {
        //if loaded change style to loaded
        this.loadedStyle = [this.className, "cloudimage-background", "loaded"]
          .join(" ")
          .trim();
        //updating value of container style if page loaded
        this.container = styles.container({ style, cloudimgURL });
        //updating value of preview wrapper style if page loaded
        this.previewBgWrapper = styles.previewBgWrapper({ loaded });
        //updating value of preview style if page loaded
        this.previewBg = styles.previewBg({ previewCloudimgURL });
      } else {
        //if still loading change to loading
        this.loadedStyle = [this.className, "cloudimage-background", "loading"];
      }
    },

    lazyLoadActive: function () {
      if (!this.lazyLoadActive) {
        const {
          config: { delay },
        } = this.cloudProvider;

        if (typeof delay !== "undefined") {
          setTimeout(() => {
            this.preLoadImg(this.processedImage.cloudimgURL);
          }, delay);
        } else {
          this.preLoadImg(this.processedImage.cloudimgURL);
        }
      }
    },
  },
};
</script>
