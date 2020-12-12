import Vue from 'vue'
export const state = () => ({
  menus: [],
})

export const mutations = {
  SET_MENU(state, value) {
    state.menus = value
  },
  UPDATE_ONE_MENU(state, { index, value }) {
    Vue.set(state.menus, index, value)
  },
}

export const getters = {
  totalMenus: (state) => state.menus.length,
}

export const actions = {
  fetchMenus({ commit }) {
    const menus = [
      {
        id: 1,
        name: 'Nugget',
        kind: 'Original',
        brand: 'Gold Star',
        supplierPrice: 22000,
        sellPrice: 25000,
        quantity: 2,
        link: 'https://shopee.co.id/search?keyword=nugget',
        actionFab: false,
      },
      {
        id: 2,
        name: 'Nugget',
        kind: 'Angka',
        brand: 'Gold Star',
        supplierPrice: 23000,
        sellPrice: 26000,
        quantity: 1,
        link: 'https://shopee.co.id/search?keyword=nugget',
        actionFab: false,
      },
      {
        id: 3,
        name: 'Pempek',
        kind: 'Campur',
        brand: 'Bicek',
        supplierPrice: 23000,
        sellPrice: 25000,
        quantity: 3,
        link: 'https://shopee.co.id/search?keyword=pempek',
        actionFab: false,
      },
      {
        id: 4,
        name: 'Cireng',
        kind: 'Rujak',
        brand: 'Aneka Jajan',
        supplierPrice: 15000,
        sellPrice: 18000,
        quantity: 5,
        link: 'https://shopee.co.id/search?keyword=cireng',
        actionFab: false,
      },
    ]
    commit('SET_MENU', menus)
    return Promise.resolve({})
  },
  addMenu({ state, commit }, { value }) {
    const menus = state.menus
    menus.push(value)
    commit('SET_MENU', menus)
    return Promise.resolve({})
  },
}
