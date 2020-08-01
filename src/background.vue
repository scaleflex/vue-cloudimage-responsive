<template>
  <div>
    <lazy-component v-if="properties.config.lazyLoading && lazyLoadActive" @show="handler">
      <div :class="loadedStyle" :style="container">
        <div v-if="data.preview" :style="previewBgWrapper">
          <div :style="previewBg" />
        </div>

        <div v-if="data.preview" class="cloudimage-background-content" style="position: relative ">
          <slot></slot>
        </div>
        <slot v-else></slot>
      </div>
    </lazy-component>
    <div v-else :class="loadedStyle" :style="container">
      <div v-if="data.preview" :style="previewBgWrapper">
        <div :style="previewBg " />
      </div>

      <div v-if="data.preview" class="cloudimage-background-content" style="position: relative ">
        <slot></slot>
      </div>
      <slot v-else></slot>
    </div>
    <div v-if="processed">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { isServer, processReactNode } from "cloudimage-responsive-utils";
import styles from "./background.styles";
import { getFilteredBgProps } from "./utils.js";
export default {
  // geting the data from the provider
  inject: ["cloudProvider"],
  props: {
    src: String,
    params: String,
    styles: Object
  },
  data() {
    return {
      server: isServer(),
      lazyLoadActive: true,
      cloudimgURL: "",
      processed: false,
      loaded: false,
      data: "",
      properties: {
        src: this.src,
        params: this.params,
        config: this.cloudProvider.config,
        style: this.styles
      },
      container: "",
      previewBgWrapper: "",
      previewBg: "",
      className: "",
      lazyLoadConfig: "",
      otherProps: "",
      loadedStyle: ""
    };
  },
  mounted() {
    if (this.server) return;

    const style = this.properties.style;
    const { className } = getFilteredBgProps(this.properties);
    const cloudimgURL = this.data.cloudimgURL;
    const previewCloudimgURL = this.data.previewCloudimgURL;
    const loaded = this.loaded;

    this.className = className;

    //initial loading style
    this.loadedStyle = [this.className, "cloudimage-background", "loading"];

    //initial value preview wrapper style
    this.previewBgWrapper = styles.previewBgWrapper({ loaded });

    this.processBg();
  },
  methods: {
    handler(component) {
    const style = this.properties.style;
    const cloudimgURL = this.data.cloudimgURL;
    const previewCloudimgURL = this.data.previewCloudimgURL;
    const loaded = this.loaded;

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
        this.data = data;
      }
    },
    preLoadImg(cloudimgURL) {
      const img = new Image();

      img.onload = this.onImgLoad;

      img.src = cloudimgURL;
    },

    onImgLoad() {
      this.loaded = true;
    }
  },

  watch: {
    "properties.config.innerWidth": function(newVal, oldVal) {
      const style = this.properties.style;
      const cloudimgURL = this.data.cloudimgURL;
      const previewCloudimgURL = this.data.previewCloudimgURL;
      const loaded = this.loaded;

      if (this.server) return;

      const {
        config: { innerWidth }
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
    "properties.src": function(newVal, oldVal) {
      const { src } = this.properties;
      if (src !== oldVal.src) {
        this.processBg();
      }
    },
    loaded: function(newVal) {
      const loaded = newVal;
      const style = this.properties.style;
      const cloudimgURL = this.data.cloudimgURL;
      const previewCloudimgURL = this.data.previewCloudimgURL;

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

    lazyLoadActive: function() {
      if (!this.lazyLoadActive) {
        const {
          config: { delay }
        } = this.cloudProvider;

        if (typeof delay !== "undefined") {
          setTimeout(() => {
            this.preLoadImg(this.data.cloudimgURL);
          }, delay);
        } else {
          this.preLoadImg(this.data.cloudimgURL);
        }
      }
    }
  }
};
</script>
