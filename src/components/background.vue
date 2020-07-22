<template>
  <div :class="loadedStyle" :style="container">
    <div v-if="data.preview" :style="previewBgWrapper">
      <div :style="previewBg" />
    </div>

    <div
      v-if="data.preview"
      class="cloudimage-background-content"
      style="position: relative "
    >
      <slot></slot>
    </div>
    <slot v-else></slot></div
></template>

<script>
import { isServer, processReactNode } from 'cloudimage-responsive-utils';
import styles from './background.styles';
import { getFilteredBgProps } from '../utils.js';
export default {
  inject: ['cloudProvider'],
  props: {
    src: String,
    params: String,
    styles: Object
  },
  data() {
    return {
      server: isServer(),
      cloudimgURL: '',
      processed: false,
      loaded: false,
      data: '',
      properties: {
        src: this.src,
        params: this.params ? this.params : undefined,
        config: this.cloudProvider.config,
        style: this.styles
      },
      container: '',
      previewBgWrapper: '',
      previewBg: '',
      className: '',
      lazyLoadConfig: '',
      otherProps: '',
      loadedStyle: ''
    };
  },
  mounted() {
    if (this.server) return;

    const { className } = getFilteredBgProps(this.properties);
    this.className = className;

    this.processBg();
  },
  methods: {
    processBg(update, windowScreenBecomesBigger) {
      const bgNode = this.$el;
      const data = processReactNode(
        this.properties,
        bgNode,
        update,
        windowScreenBecomesBigger
      );

      if (!data) {
        return;
      }

      this.data = data;
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
    'properties.config.innerWidth': function(newVal, oldVal) {
      const style = this.properties.style;
      const cloudimgURL = this.data.cloudimgURL;
      const previewCloudimgURL = this.data.previewCloudimgURL;
      const loaded = this.loaded;

      if (this.server) return;

      const {
        config: { innerWidth }
      } = this.properties;

      if (oldVal !== innerWidth) {
        this.processBg(true, innerWidth > oldVal);
      }

      this.container = styles.container({ style, cloudimgURL });
      this.previewBgWrapper = styles.previewBgWrapper({ loaded });
      this.previewBg = styles.previewBg({ previewCloudimgURL });
    },
    'properties.src': function(newVal, oldVal) {
      const { src } = this.properties;
      if (src !== oldVal.src) {
        this.processBg();
      }
    },
    loaded: function(newVal) {
      const loaded = newVal;
      if (loaded) {
        const style = this.properties.style;
        const cloudimgURL = this.data.cloudimgURL;
        const previewCloudimgURL = this.data.previewCloudimgURL;
        const loaded = this.loaded;

        this.loadedStyle = [this.className, 'cloudimage-background', 'loaded']
          .join(' ')
          .trim();

        this.container = styles.container({ style, cloudimgURL });
        this.previewBgWrapper = styles.previewBgWrapper({ loaded });
        this.previewBg = styles.previewBg({ previewCloudimgURL });
      } else {
        this.loadedStyle = [this.className, 'cloudimage-background', 'loading'];
      }
    },

    'data.cloudimgURL': function(newVal) {
      const {
        config: { delay }
      } = this.cloudProvider;

      if (typeof delay !== 'undefined') {
        setTimeout(() => {
          this.preLoadImg(newVal);
        }, delay);
      } else {
        this.preLoadImg(newVal);
      }
    }
  }
};
</script>
