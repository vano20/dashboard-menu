<template>
  <v-speed-dial
    v-model="showFab"
    direction="left"
    open-on-hover
    transition="slide-x-reverse-transition"
  >
    <template v-slot:activator>
      <v-btn v-model="showFab" :ripple="false" small dark fab text>
        <v-icon v-if="showFab"> mdi-close </v-icon>
        <v-icon v-else> mdi-dots-horizontal </v-icon>
      </v-btn>
    </template>
    <slot name="actions"></slot>
  </v-speed-dial>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    showFab: {
      get() {
        return this.show
      },
      set(value) {
        this.$emit('update:show', value)
      },
    },
  },
}
</script>
