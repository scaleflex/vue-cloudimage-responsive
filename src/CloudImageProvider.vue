<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
import { CONSTANTS, processParams } from 'cloudimage-responsive-utils'
import { debounce } from 'throttle-debounce'

export default {
  props: { cloudImageConfig: Object },
  data() {
    return {
      config: {
        token: this.cloudImageConfig.token || '',
        domain: this.cloudImageConfig.customDomain || 'cloudimg.io',
        customDomain: (this.cloudImageConfig.customDomain) || false,
        lazyLoading: this.cloudImageConfig.lazyLoading || true,
        lazyLoadOffset: this.cloudImageConfig.lazyLoadOffset || 100,
        placeholderBackground:
          this.cloudImageConfig.placeholderBackground || '#f4f4f4',
        baseURL: this.cloudImageConfig.baseUrl || this.cloudImageConfig.baseURL,
        ratio: 1.5,
        delay: this.cloudImageConfig.delay || 0,
        exactSize: false,
        presets: this.cloudImageConfig.presets
          ? this.cloudImageConfig.presets
          : {
              xs: '(max-width: 575px)', // to 575       PHONE
              sm: '(min-width: 576px)', // 576 - 767    PHABLET
              md: '(min-width: 768px)', // 768 - 991    TABLET
              lg: '(min-width: 992px)', // 992 - 1199   SMALL_LAPTOP_SCREEN
              xl: '(min-width: 1200px)' // from 1200    USUALSCREEN
            },
        params: this.cloudImageConfig.params ? processParams(this.cloudImageConfig.params) :'org_if_sml=1',
        apiVersion: this.cloudImageConfig.apiVersion || null,
        imageSizeAttributes: this.cloudImageConfig.imageSizeAttributes || 'use',
        innerWidth: typeof window !== 'undefined' ? window.innerWidth : null,
        previewQualityFactor: 10,
        doNotReplaceURL: this.cloudImageConfig.doNotReplaceURL || false,
        devicePixelRatioList:
          this.cloudImageConfig.devicePixelRatioList ||
          CONSTANTS.DEVICE_PIXEL_RATIO_LIST,
        limitFactor: this.cloudImageConfig.limitFactor || 100,
        minLowQualityWidth: this.cloudImageConfig.lowQualityPreview.minImgWidth,
        xs: '(max-width: 575px)',
        sm: '(min-width: 576px)',
        md: '(min-width: 768px)',
        lg: '(min-width: 992px)',
        xl: '(min-width: 1200px)'
      }
    }
  },
  created() {
    if (typeof window !== 'undefined') {
      window.addEventListener(
        'resize',
        debounce(100, () => {
          this.config.innerWidth = window.innerWidth
        })
      )
    }
  },

  beforeUnmount() {
    window.removeEventListener(
      'resize',
      debounce(100, () => {
        this.config.innerWidth = window.innerWidth
      })
    )
  },
  // to able to use the data in image and background
  provide() {
    const cloudProvider = {}
    Object.defineProperty(cloudProvider, 'config', {
      enumerable: true,
      get: () => this.config
    })
    return { cloudProvider }
  }
}
</script>
