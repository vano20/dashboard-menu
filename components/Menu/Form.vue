<template>
  <v-form ref="menuForm" v-model="valid" lazy-validation>
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="productName"
            :rules="nameRules"
            label="Product name"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="productKind"
            :rules="kindRules"
            label="Kind"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="productBrand"
            :rules="brandRules"
            label="Brand"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="supplierPrice"
            :rules="supplierRules"
            label="Product Supplier Price"
            type="number"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="sellPrice"
            :rules="sellRules"
            label="Product Sell Price"
            type="number"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="profit"
            label="Product Profit"
            type="number"
            readonly
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4" md="2">
          <v-text-field
            v-model="productQuantity"
            :rules="quantityRules"
            label="Qty"
            type="number"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="productLink"
            :rules="linkRules"
            label="Product Link"
            required
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
<script>
export default {
  props: {
    currentEdit: {
      type: Object,
      default: () => {
        return {
          name: '',
          kind: '',
          brand: '',
          supplierPrice: 0,
          sellPrice: 0,
          quantity: 0,
          link: '',
          actionFab: false,
        }
      },
    },
  },
  data() {
    return {
      valid: true,
      sellPrice: this.currentEdit.sellPrice,
      supplierPrice: this.currentEdit.supplierPrice,
      nameRules: [(v) => !!v || 'Product name is required'],
      kindRules: [(v) => !!v || 'Product kind is required'],
      brandRules: [(v) => !!v || 'Product brand is required'],
      supplierRules: [(v) => !!v || 'Product supplier price is required'],
      sellRules: [(v) => !!v || 'Product sell price is required'],
      quantityRules: [(v) => !!v || 'Product quantity is required'],
      linkRules: [(v) => !!v || 'Product link is required'],
    }
  },
  computed: {
    profit() {
      return this.sellPrice - this.supplierPrice
    },
    productName: {
      get() {
        return this.currentEdit?.name
      },
      set(value) {
        this.currentEdit.name = value
        this.$emit('update:currentEdit', this.currentEdit)
      },
    },
    productKind: {
      get() {
        return this.currentEdit?.kind
      },
      set(value) {
        this.currentEdit.kind = value
        this.$emit('update:currentEdit', this.currentEdit)
      },
    },
    productBrand: {
      get() {
        return this.currentEdit?.brand
      },
      set(value) {
        this.currentEdit.brand = value
        this.$emit('update:currentEdit', this.currentEdit)
      },
    },
    productSupplierPrice: {
      get() {
        return this.currentEdit?.supplierPrice
      },
      set(value) {
        this.currentEdit.supplierPrice = value
        this.$emit('update:currentEdit', this.currentEdit)
      },
    },
    productSellPrice: {
      get() {
        return this.currentEdit?.sellPrice
      },
      set(value) {
        this.currentEdit.sellPrice = value
        this.$emit('update:currentEdit', this.currentEdit)
      },
    },
    productQuantity: {
      get() {
        return this.currentEdit?.quantity
      },
      set(value) {
        this.currentEdit.quantity = value
        this.$emit('update:currentEdit', this.currentEdit)
      },
    },
    productLink: {
      get() {
        return this.currentEdit?.link
      },
      set(value) {
        this.currentEdit.link = value
        this.$emit('update:currentEdit', this.currentEdit)
      },
    },
  },
  watch: {
    currentEdit(value) {
      if (value) {
        this.sellPrice = value.sellPrice
        this.supplierPrice = value.supplierPrice
      }
    },
    sellPrice(value) {
      this.currentEdit.sellPrice = value
      this.$emit('update:currentEdit', this.currentEdit)
    },
    supplierPrice(value) {
      this.currentEdit.supplierPrice = value
      this.$emit('update:currentEdit', this.currentEdit)
    },
  },
}
</script>
