<template>
  <modal :show.sync="showDialog" :title="title" max-width="400px">
    <template v-slot:content>
      <slot name="confirmContent"></slot>
    </template>
    <template v-slot:actions>
      <v-btn color="blue darken-1" @click="showDialog = false"> Cancel </v-btn>
      <v-btn color="error darken-1" @click="confirm"> Confirm </v-btn>
    </template>
  </modal>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    show: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    showDialog: {
      get() {
        return this.show
      },
      set(value) {
        this.$emit('update:show', value)
      },
    },
  },
  methods: {
    confirm() {
      this.$emit('confirm')
      this.showDialog = false
    },
  },
}
</script>
