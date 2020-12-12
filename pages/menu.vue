<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <v-layout align-center justify-space-between>
          <v-flex xs8 sm8 md2>
            <v-btn color="primary" @click.stop="showAdd">Add</v-btn>
            <v-btn
              v-if="selected.length > 0"
              color="error"
              @click.stop="confirmDelete"
              >Delete</v-btn
            >
          </v-flex>
          <v-flex xs8 sm8 md2>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-flex>
        </v-layout>

        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="debounceItems"
          :search="search"
          :loading="loading"
          show-select
        >
          <template v-slot:[`item.profit`]="{ item }">
            {{ item.sellPrice - item.supplierPrice }}
          </template>
          <template v-slot:[`item.link`]="{ item }">
            <speed-dial :show.sync="item.actionFab">
              <template v-slot:actions>
                <v-btn color="primary" fab dark small @click="showEdit(item)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn
                  color="primary"
                  fab
                  dark
                  small
                  @click.stop="goTo(item.link)"
                >
                  <v-icon>mdi-link-variant</v-icon>
                </v-btn>
              </template>
            </speed-dial>
          </template>
        </v-data-table>
        <modal-confirmation
          :show.sync="deleteDialog"
          title="Deleting menus"
          @confirm="deleteMenu"
        >
          <template v-slot:confirmContent>
            <v-row justify="start" style="padding: 10px 5px">
              Are you sure you want to delete
              {{ isSelectedAll ? 'ALL' : 'selected' }} items?
            </v-row>
            <v-row v-if="!isSelectedAll" justify="start">
              <ul>
                <li v-for="(item, index) in selected" :key="index">
                  {{ `${item.brand} ${item.name} ${item.kind}` }}
                </li>
              </ul>
            </v-row>
          </template>
        </modal-confirmation>
        <modal :show.sync="editDialog" title="Edit menu" max-width="800px">
          <template v-slot:content>
            <MenuForm :current-edit="currentEdit" />
          </template>
          <template v-slot:actions>
            <v-btn @click="closeMenu"> Cancel </v-btn>
            <v-btn color="primary darken-1" @click="saveMenu"> Save </v-btn>
          </template>
        </modal>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Vue from 'vue'
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  data() {
    return {
      timeoutId: null,
      loading: true,
      search: '',
      selected: [],
      deleteDialog: false,
      editDialog: false,
      editedIndex: -1,
      currentEdit: {},
      headers: [
        {
          text: 'Product Name',
          align: 'start',
          value: 'name',
        },
        {
          text: 'Kind',
          value: 'kind',
        },
        {
          text: 'Brand',
          value: 'brand',
        },
        {
          text: 'Supplier Price',
          value: 'supplierPrice',
        },
        {
          text: 'Sell Price',
          value: 'sellPrice',
        },
        {
          text: 'Profit',
          value: 'profit',
        },
        {
          text: 'Quantity',
          value: 'quantity',
        },
        {
          text: 'Link',
          value: 'link',
          sortable: false,
        },
      ],
      debounceItems: [],
    }
  },
  computed: {
    ...mapState({
      menus: (state) => state.menu.menus,
    }),
    isSelectedAll() {
      return this.selected.length === this.menus.length
    },
  },
  async created() {
    await this.fetchMenus()
    this.createTimeout(this.menus, 1000)
  },
  methods: {
    ...mapActions({
      fetchMenus: 'menu/fetchMenus',
      addMenu: 'menu/addMenu',
    }),
    ...mapMutations({
      setMenus: 'menu/SET_MENU',
      updateOneMenu: 'menu/UPDATE_ONE_MENU',
    }),
    createTimeout(items, times) {
      if (this.timeoutId) clearTimeout(this.timeoutId)
      this.timeoutId = setTimeout(() => {
        this.debounceItems = items.slice()
        this.loading = false
        this.timeoutId = null
      }, times)
    },
    showAdd() {
      this.editDialog = true
      this.editMenu()
    },
    showEdit(item) {
      this.editDialog = true
      this.editMenu(item)
    },
    editMenu(item = null) {
      if (item) {
        this.editedIndex = this.menus.findIndex((find) => find.id === item.id)
        this.currentEdit = { ...item }
      } else {
        this.editedIndex = -1
        this.currentEdit = {}
      }
    },
    confirmDelete() {
      this.deleteDialog = true
    },
    deleteMenu() {
      const newMenu = this.menus.reduce((carry, item) => {
        const isSelected = this.selected.find((select) => select.id === item.id)
        if (!isSelected) carry.push({ ...item })
        return carry
      }, [])
      this.setMenus(newMenu)
      this.debounceItems = this.menus.slice()
      this.selected = []
    },
    goTo(url) {
      window.open(url, '_blank')
    },
    closeMenu() {
      this.editDialog = false
      this.editedIndex = -1
      this.currentEdit = {}
    },
    async saveMenu() {
      if (this.editedIndex > -1) {
        this.updateOneMenu({ index: this.editedIndex, value: this.currentEdit })
        Vue.set(this.debounceItems, this.editedIndex, this.currentEdit)
      } else {
        const lastId = this.items.reduce(
          (carry, item) => (carry > item.id ? carry : item.id),
          0
        )
        const id = lastId + 1
        this.currentEdit = { ...this.currentEdit, actionFab: false, id }
        await this.addMenu(this.currentEdit)
        this.debounceItems = this.menus.slice()
      }
      this.closeMenu()
    },
  },
}
</script>
