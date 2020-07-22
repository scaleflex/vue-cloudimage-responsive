<template>
  <div>
    <!-- <VueLazyload>
      <div class="cloudimage-image loaded" :style="picture">
        <div :style="previewWrapper" v-if="data.preview && data.operation !=='bound'">
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
          @load="onImgLoad"
          :srcset="cloudimgSRCSET"
        />
      </div>
    </VueLazyload>-->

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
        v-bind:alt="alt"
        :style="imgStyle"
        v-bind:ratio="otherProps.ratio"
        v-bind:src="data.cloudimgURL"
        @load="onImgLoad"
        :srcset="cloudimgSRCSET"
      />
    </div>
  </div>
</template>

<script>
import { isServer, processReactNode } from 'cloudimage-responsive-utils';
// import VueLazyload from "vue-lazyload";
import { getFilteredProps } from '../utils';
import styles from './img.styles';

export default {
  // components: {
  //   VueLazyload
  // },
  inject: ['cloudProvider'],
  props: { src: String, ratio: Number, sizes: Object, params: String },
  data() {
    return {
      server: isServer(),
      cloudimgURL: '',
      processed: false,
      loaded: false,
      loadedImageWidth: '',
      loadedImageHeight: '',
      loadedImageRatio: '',
      data: '',
      properties: {
        src: this.src,
        ratio: this.ratio,
        sizes: this.sizes || {},
        params: this.params,
        config: this.cloudProvider.config
      },
      alt: '',
      className: '',
      lazyLoadConfig: '',
      preserveSize: '',
      imgNodeWidth: '',
      imgNodeHeight: '',
      otherProps: '',
      cloudimgSRCSET: '',
      imgStyle: '',
      picture: '',
      previewWrapper: '',
      previewImg: '',
      loadedStyle: ''
    };
  },
  mounted() {
    const {
      alt,
      className,
      lazyLoadConfig,
      preserveSize,
      imgNodeWidth,
      imgNodeHeight,
      ...otherProps
    } = getFilteredProps(this.properties);

    if (this.server) return;
    const {
      config: { delay }
    } = this.cloudProvider;

    if (typeof delay !== 'undefined') {
      setTimeout(() => {
        this.processImg();
      }, delay);
    } else {
      this.processImg();
    }

    this.alt = alt;
    this.className = className;
    this.lazyLoadConfig = lazyLoadConfig;
    this.preserveSize = preserveSize;
    this.imgNodeWidth = imgNodeWidth;
    this.imgNodeHeight = imgNodeHeight;
    this.otherProps = { ...otherProps };
  },
  updated() {
    if (this.data.cloudimgSRCSET) {
      const cloudimgSRCSET = this.data.cloudimgSRCSET
        .map(({ dpr, url }) => `${url} ${dpr}x`)
        .join(', ');
      this.cloudimgSRCSET = cloudimgSRCSET;
    }
  },

  watch: {
    'properties.config.innerWidth': function(newVal, oldVal) {
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
        config: { innerWidth }
      } = this.properties;

      this.previewWrapper = styles.previewWrapper();
      this.previewImg = styles.previewImg({ loaded, operation });
      this.imgStyle = styles.img({ preview, loaded, operation });
      this.picture = styles.picture({
        preserveSize,
        imgNodeWidth,
        imgNodeHeight,
        ratio: this.properties.ratio || this.loadedImageRatio,
        previewLoaded,
        loaded,
        placeholderBackground,
        operation
      });
      if (oldVal !== innerWidth) {
        this.processImg(true, innerWidth > oldVal);
      }
    },
    'properties.src': function(newVal, oldVal) {
      const { src } = this.properties;
      if (src !== oldVal.src) {
        this.processImg();
      }
    },
    loaded: function(newVal) {
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
        this.loadedStyle = [this.className, 'cloudimage-background', 'loaded']
          .join(' ')
          .trim();

        this.previewWrapper = styles.previewWrapper();
        this.previewImg = styles.previewImg({ loaded, operation });
        this.imgStyle = styles.img({ preview, loaded, operation });
        this.picture = styles.picture({
          preserveSize,
          imgNodeWidth,
          imgNodeHeight,
          ratio: this.properties.ratio || this.loadedImageRatio,
          previewLoaded,
          loaded,
          placeholderBackground,
          operation
        });
      } else {
        this.loadedStyle = [this.className, 'cloudimage-background', 'loading']
          .join(' ')
          .trim();
      }
    }
  },

  methods: {
    processImg(update, windowScreenBecomesBigger) {
      const imgNode = this.$el;

      const data = processReactNode(
        this.properties,
        imgNode,
        update,
        windowScreenBecomesBigger
      );

      this.data = data;
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

    onImgLoad(event) {
      this.updateLoadedImageSize(event.target);
      this.loaded = true;
    }
  }
};
</script>
