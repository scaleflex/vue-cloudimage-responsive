<template>
  <div ref="vueref0" class="container-width-box">
    container {{ isHeight ? '' : 'width:' }}
    <span>{{ width }}</span>
    {{ ' ' }} {{ isHeight ? `x ${height}` : '' }} px
  </div>
</template>

<script>
import { debounce } from 'throttle-debounce';

export default {
  data() {
    return {
      width: '---',
      height: '---',
      isHeight: this.isHeight || false
    };
  },

  mounted() {
    this.box = this.$refs;
    this.width = this.box.vueref0.parentNode.offsetWidth;
    this.height = this.box.vueref0.parentNode.offsetHeight;

    window.addEventListener(
      'resize',
      debounce(400, () => {
        if (this.box.vueref0) {
          this.width = this.box.vueref0.parentNode.offsetWidth;
          this.height = this.box.vueref0.parentNode.offsetHeight;
        }
      })
    );
  }
};
</script>
