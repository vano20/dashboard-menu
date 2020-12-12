<template>
  <v-list>
    <template v-for="(item, i) in items">
      <v-list-group
        v-if="item.subItems"
        :key="i"
        :value="true"
        @mouseover="$emit('set-minivariant', false)"
        @mouseleave="$emit('set-minivariant', true)"
      >
        <template v-slot:activator>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item
          v-for="(subItem, subIndex) in item.subItems"
          :key="subIndex"
          :to="subItem.to"
          sub-group
          router
          exact
          @mouseover="$emit('set-minivariant', false)"
          @mouseleave="$emit('set-minivariant', true)"
        >
          <v-list-item-action>
            <v-icon>{{ subItem.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="subItem.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
      <v-list-item
        v-else
        :key="i"
        :to="item.to"
        router
        exact
        @mouseover="$emit('set-minivariant', false)"
        @mouseleave="$emit('set-minivariant', true)"
      >
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="item.title" />
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-list>
</template>
<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
}
</script>
