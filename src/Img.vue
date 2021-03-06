<template>
  <img v-if="server" :alt="alt" :src="BASE_64_PLACEHOLDER" />
  <lazy-component
    v-else-if="!server && properties.config.lazyLoading && lazyLoadActive"
    @show="handler"
  >
    <div :class="loadedStyle" :style="picture">
      <div
        :style="previewWrapper"
        v-if="data.preview && data.operation !== 'bound'"
      >
        <img
          :style="previewImg"
          v-bind:src="data.previewCloudimgURL"
          alt="low quality preview image"
          @load="onPreviewLoaded"
        />
      </div>
      <img
        :alt="alt"
        :style="imgStyle"
        v-bind:ratio="otherProps.ratio"
        @load="_onImgLoad"
      />
    </div>
  </lazy-component>

  <div v-else :class="loadedStyle" :style="picture">
    <div
      :style="previewWrapper"
      v-if="data.preview && data.operation !== 'bound'"
    >
      <img
        :style="previewImg"
        v-bind:src="data.previewCloudimgURL"
        alt="low quality preview image"
        @load="onPreviewLoaded"
      />
    </div>
    <img
      v-bind:alt="alt"
      :style="imgStyle"
      v-bind:ratio="otherProps.ratio"
      v-bind:src="data.cloudimgURL"
      @load="_onImgLoad"
      :srcset="cloudimgSRCSET"
    />
  </div>
</template>

<script>
import { isServer, processReactNode } from "cloudimage-responsive-utils";
import { BASE_64_PLACEHOLDER } from "cloudimage-responsive-utils/dist/constants";
import { getFilteredProps } from "./utils";
import { imgStyles as styles } from "cloudimage-responsive-utils";

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
  },
  data() {
    return {
      server: isServer(),
      BASE_64_PLACEHOLDER,
      lazyLoadActive: true,
      cloudimgURL: "",
      processed: false,
      loaded: false,
      loadedImageWidth: "",
      loadedImageHeight: "",
      loadedImageRatio: "",
      data: "",
      properties: {
        src: this.src,
        width: this.width,
        height: this.height,
        params: this.params,
        sizes: this.sizes,
        ratio: this.ratio,
        alt: this.alt,
        className: this.className,
        config: this.cloudProvider.config,
        onImgLoad: this.onImgLoad,
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

    const operation = this.data.operation;
    const preview = this.data.preview;
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

    //initial loading style
    this.loadedStyle = [this.className, "cloudimage-background", "loading"]
      .join(" ")
      .trim();
    //initial value preview wrapper stylr
    this.previewWrapper = styles.previewWrapper();
    //initial value preview img style
    this.previewImg = styles.previewImg({ loaded, operation });
    //initial value img style
    this.imgStyle = styles.img({ preview, loaded, operation });
    //initial value picture style

    this.picture = styles.picture({
      preserveSize,
      imgNodeWidth,
      imgNodeHeight,
      ratio: this.data.ratio || this.loadedImageRatio || this.properties.ratio,
      previewLoaded,
      loaded,
      placeholderBackground,
      operation,
    });

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

    //the value from filter and passing to data
    this.preserveSize = preserveSize;
    this.imgNodeWidth = imgNodeWidth;
    this.imgNodeHeight = imgNodeHeight;
    this.otherProps = { ...otherProps };
  },
  updated() {
    //srcset value after processing image
    if (this.data.cloudimgSRCSET) {
      const cloudimgSRCSET = this.data.cloudimgSRCSET
        .map(({ dpr, url }) => `${url} ${dpr}x`)
        .join(", ");
      this.cloudimgSRCSET = cloudimgSRCSET;
    }

    // console.log(this.properties.src, this.data.ratio);
    // console.log(this.properties.src, this.properties.ratio);
    // console.log(this.properties.src, this.loadedImageRatio);
    // console.log(this);
  },

  methods: {
    handler(component) {
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
        this.data = data;
      }
    },

    onPreviewLoaded(event) {
      if (this.previewLoaded) return;
      // console.log(event.target);
      this.updateLoadedImageSize(event.target);
      this.previewLoaded = true;
    },
    updateLoadedImageSize(image) {
      // console.log(image.naturalWidth, image.naturalHeight);
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
    "properties.config.innerWidth": function (newVal, oldVal) {
      if (this.server) return;
      const operation = this.data.operation;
      const preview = this.data.preview;
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
        ratio: this.data.ratio || this.loadedImageRatio,
        previewLoaded,
        loaded,
        placeholderBackground,
        operation,
      });
    },
    "properties.src": function (newVal, oldVal) {
      const { src } = this.properties;
      if (src !== oldVal.src) {
        this.processImg();
      }
    },
    loaded: function (newVal) {
      const operation = this.data.operation;
      const preview = this.data.preview;
      const loaded = newVal;
      const { preserveSize, imgNodeWidth, imgNodeHeight } = getFilteredProps(
        this.properties
      );
      const previewLoaded = this.previewLoaded;
      const placeholderBackground = this.cloudProvider.config
        .placeholderBackground;

      if (loaded) {
        this.loadedStyle = [this.className, "cloudimage-background", "loaded"]
          .join(" ")
          .trim();

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
          ratio: this.data.ratio || this.loadedImageRatio,
          previewLoaded,
          loaded,
          placeholderBackground,
          operation,
        });
      } else {
        //if still loading change to loading
        this.loadedStyle = [this.className, "cloudimage-background", "loading"]
          .join(" ")
          .trim();
      }
    },
  },
};
</script>
