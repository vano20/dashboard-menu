<template>
  <v-dialog v-model="showDialog" scrollable :max-width="maxWidth">
    <v-card>
      <v-card-title v-if="title">
        <span class="headline">{{ title }}</span>
      </v-card-title>
      <v-card-text>
        <slot name="content"></slot>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <slot name="actions"></slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
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
    maxWidth: {
      type: String,
      default: '600px',
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
}
</script>
