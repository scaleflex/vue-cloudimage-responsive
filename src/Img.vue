<template>
  <lazy-component v-if="!server && properties.config.lazyLoading && lazyLoadActive" @show="handler">
    <img v-if="otherProps.disableAnimation" :alt="alt" :style="imgStyles" v-bind:ratio="otherProps.ratio" @load="_onImgLoad" />

    <div v-else :class="loadedStyle" :style="picture">
      <div :style="previewWrapper" v-if="processedImage.preview && processedImage.operation !== 'bound'">
        <img :style="previewImg" v-bind:src="processedImage.previewCloudimgURL" alt="low quality preview for {{alt}}"
          @load="onPreviewLoaded" />
      </div>
      <img v-bind:alt="alt" :style="imgStyle" v-bind:src="processedImage.cloudimgURL"
        v-bind:ratio="otherProps.ratio" @load="_onImgLoad" :srcset="cloudimgSRCSET" />
    </div>
  </lazy-component>

  <template v-else-if="!server">
    <img v-if="otherProps.disableAnimation" :alt="alt" :style="imgStyles" v-bind:ratio="otherProps.ratio" @load="_onImgLoad" />

    <div v-else :class="loadedStyle" :style="picture">
      <div :style="previewWrapper" v-if="processedImage.preview && processedImage.operation !== 'bound'">
        <img :style="previewImg" v-bind:src="processedImage.previewCloudimgURL" alt="low quality preview for {{alt}}"
          @load="onPreviewLoaded" />
      </div>
      <img v-bind:alt="alt" :style="imgStyle" v-bind:src="processedImage.cloudimgURL"
        v-bind:ratio="otherProps.ratio" @load="_onImgLoad" :srcset="cloudimgSRCSET" />
    </div>
  </template>
</template>

<script>
import {
  isServer, processReactNode, generateAlt, imgStyles as styles
} from "cloudimage-responsive-utils";
import { getFilteredProps } from "./utils";

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
      loadedImageWidth: "",
      loadedImageHeight: "",
      loadedImageRatio: "",
      processedImage: {
        operation: "",
        ratio: 1,
        preview: "",
        cloudimgSRCSET: [],
      },
      properties: {
        src: this.src,
        width: this.width,
        height: this.height,
        params: this.params,
        sizes: this.sizes,
        ratio: this.ratio,
        alt: this.alt || generateAlt(this.src),
        className: this.className,
        config: this.cloudProvider.config,
        onImgLoad: this.onImgLoad,
        doNotReplaceURL: this.doNotReplaceURL
      },
      preserveSize: "",
      imgNodeWidth: "",
      imgNodeHeight: "",
      otherProps: "",
      cloudimgSRCSET: "",
      imgStyle: "",
      picture: "",
      previewWrapper: "",
      previewImg: "",
      loadedStyle: "",
    };
  },
  mounted() {
    if (this.server) return;

    const operation = this.processedImage.operation;
    const preview = this.processedImage.preview;
    const loaded = this.loaded;
    const previewLoaded = this.previewLoaded;
    const placeholderBackground = this.cloudProvider.config
      .placeholderBackground;
    const {
      preserveSize,
      imgNodeWidth,
      imgNodeHeight,
      ...otherProps
    } = getFilteredProps(this.properties);

    const {
      config: { delay },
    } = this.cloudProvider;

    if (typeof delay !== "undefined") {
      setTimeout(() => {
        this.processImg();
      }, delay);
    } else {
      this.processImg();
    }

    //initial loading style
    this.loadedStyle = `${this.className} cloudimage-background loading`
      .trim();
    //initial value preview wrapper style
    this.previewWrapper = styles.previewWrapper();
    //initial value preview img style
    this.previewImg = styles.previewImg({ loaded, operation });
    //initial value img style
    this.imgStyle = styles.img({ preview, loaded, operation });

    this.imgStyles = styles.image({
      preserveSize,
      imgNodeWidth,
      imgNodeHeight,
      operation,
    });

    //initial value picture style
    this.picture = styles.picture({
      preserveSize,
      imgNodeWidth,
      imgNodeHeight,
      ratio: this.processedImage.ratio || this.loadedImageRatio,
      previewLoaded,
      loaded,
      placeholderBackground,
      operation,
    });
    //the value from filter and passing to data
    this.preserveSize = preserveSize;
    this.imgNodeWidth = imgNodeWidth;
    this.imgNodeHeight = imgNodeHeight;
    this.otherProps = { ...otherProps };
  },
  updated() {
    //srcset value after processing image
    if (this.processedImage.cloudimgSRCSET) {
      const cloudimgSRCSET = this.processedImage.cloudimgSRCSET
        .map(({ dpr, url }) => `${url} ${dpr}x`)
        .join(", ");
      this.cloudimgSRCSET = cloudimgSRCSET;
    }
  },

  methods: {
    handler() {
      setTimeout(() => {
        this.lazyLoadActive = false;
      }, 100);
    },
    processImg(update, windowScreenBecomesBigger) {
      const imgNode = this.$el;

      const data = processReactNode(
        this.properties,
        imgNode,
        update,
        windowScreenBecomesBigger
      );

      if (data) {
        //if size is defined so data is defined if not error well appear
        this.processedImage = data;
      }
    },

    onPreviewLoaded(event) {
      if (this.previewLoaded) return;

      this.updateLoadedImageSize(event.target);
      this.previewLoaded = true;
    },
    updateLoadedImageSize(image) {
      this.loadedImageWidth = image.naturalWidth;
      this.loadedImageHeight = image.naturalHeight;
      this.loadedImageRatio = image.naturalWidth / image.naturalHeight;
    },

    _onImgLoad(event) {
      this.updateLoadedImageSize(event.target);
      this.loaded = true;

      const { onImgLoad } = this.properties;
      if (typeof onImgLoad === "function") {
        onImgLoad(event);
      }
    },
  },

  watch: {
    "properties.config.innerWidth": function (_, oldVal) {
      if (this.server) return;
      const operation = this.processedImage.operation;
      const preview = this.processedImage.preview;
      const loaded = this.loaded;
      const { preserveSize, imgNodeWidth, imgNodeHeight } = getFilteredProps(
        this.properties
      );
      const previewLoaded = this.previewLoaded;
      const placeholderBackground = this.cloudProvider.config
        .placeholderBackground;

      const {
        config: { innerWidth },
      } = this.properties;

      if (oldVal !== innerWidth) {
        //if width changed update the data from proccesing image
        this.processImg(true, innerWidth > oldVal);
      }

      // updating preview wrapper style if width changed
      this.previewWrapper = styles.previewWrapper();
      // updating preview img if width change
      this.previewImg = styles.previewImg({ loaded, operation });
      // updating img style if width changed
      this.imgStyle = styles.img({ preview, loaded, operation });
      // updating picture style if width change
      this.picture = styles.picture({
        preserveSize,
        imgNodeWidth,
        imgNodeHeight,
        ratio: this.processedImage.ratio || this.loadedImageRatio,
        previewLoaded,
        loaded,
        placeholderBackground,
        operation,
      });
    },
    "properties.src": function (_, oldVal) {
      const { src } = this.properties;
      if (src !== oldVal.src) {
        this.processImg();
      }
    },
    loaded: function (newVal) {
      const operation = this.processedImage.operation;
      const preview = this.processedImage.preview;
      const loaded = newVal;

      const { preserveSize, imgNodeWidth, imgNodeHeight } = getFilteredProps(this.properties);
      const previewLoaded = this.previewLoaded;
      const placeholderBackground = this.cloudProvider.config.placeholderBackground;

      if (loaded) {
        // updating preview wrapper style if page loaded
        this.previewWrapper = styles.previewWrapper();
        // updating preview img if page loaded
        this.previewImg = styles.previewImg({ loaded, operation });
        // updating img style if page loaded
        this.imgStyle = styles.img({ preview, loaded, operation });
        // updating picture style if page loaded

        this.picture = styles.picture({
          preserveSize,
          imgNodeWidth,
          imgNodeHeight,
          ratio: this.processedImage.ratio || this.loadedImageRatio,
          previewLoaded,
          loaded,
          placeholderBackground,
          operation,
        });
      }
      this.loadedStyle = `${this.className} cloudimage-background ${loaded ? 'loaded' : 'loading'}`
        .trim();
    },
  },
};
</script>
