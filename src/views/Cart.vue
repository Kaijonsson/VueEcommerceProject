<template>

  <div>
    <div v-if="Object.values(StoreCart).length > 0">
      <div class="productHeader">
        <div>Product</div>
        <div>Name</div>
        <div>Quantity</div>
        <div>Price</div>
        <div>Total</div>
      </div>
      <div
        v-for="category in StoreCart"
        :key="'category_' + category"
        class="productItems"
      >
        <div
          class="groceryNameContainer"
          style="margin-top: 5px; margin-bottom: 5px"
          v-if="category[0]"
        >
          <div><img :src="category[0].url" alt="" class="cartImage" /></div>
          <div class="cartItemName">{{ category[0].name }}</div>

          <div>
            <a class="a-less" @click="lessClick(category[0])">-</a>
            {{ category.length }}
            <a class="a-add" @click="addClick(category[0])">+</a>
          </div>
          <div class="cartItemName">{{ category[0].price }}kr/st</div>
          <div class="cartItemName">
            {{ category.length * category[0].price }}kr
            <span @click="emptyItems(category[0].name)"
              ><b-icon
                icon="trash"
                scale="1"
                variant="dark"
                class="trashIcon"
              ></b-icon
            ></span>
          </div>
        </div>
      </div>
      <div class="totalCost">
        <div class="totalDiv">
          <p>Total: </p><span>{{ groupTotal }}kr</span>
        </div>
      </div>
      <div class="cart-buttons">
        <router-link to="/"
          ><b-button variant="primary">Continue Shopping</b-button></router-link
        >
        <b-button  variant="primary" @click="checkOut()">
          Checkout
        
          <router-link to="/buy" class=" ml-2 my-sm-0">
        </router-link>
          </b-button
        >
      </div>
    </div>
    <div v-if="Object.values(StoreCart) == 0">  Cart is empty. Please select items to buy from Homepage</div>
  </div>
</template>

<script>

import Buy from "../views/Buy.vue";

export default {
  name: "cart",
  components: {
  Buy,
   },
  computed: {
    groupTotal() {
      return this.$store.getters.groupTotal;
    },
    StoreCart() {
      return this.$store.getters.StoreCart;
    },
  },
  mounted() {
    console.log(this.StoreCart);
  },
  methods: {
    lessClick(item) {
      this.$store.dispatch("removeItem", item);
    },
    addClick(item) {
      this.$store.dispatch("addItem", item);
    },
    removeItem(index) {
      this.$store.dispatch("removeItem", index);
    },
    emptyItems(index) {
      this.$store.dispatch("deleteProducts", index);
      alert('Deleted from cart')
    },
    checkOut(){
      this.$store.dispatch("emptyCart").then(() => {
         this.$router.push('/buy')
      })
    }
  },
};
</script>
<style scoped>
.productHeader {
  display: flex;
  justify-content: space-around;
  font-weight: 900;
  font-size: 24px;
  margin-left: 9%;
  margin-right: 12%;
  margin-top: 6%;
}
.productItems {
  display: flex;
  justify-content: left;
  flex-direction: column;
}
.coverContainer {
  min-width: 100%;
}
.page-heading {
  margin-top: 50px;
}
.prodContainer {
  width: 100%;
  flex-direction: column;
}
.infoContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
}
.groceryNameContainer {
  display: flex;
  justify-content: flex;
  align-items: center;
  margin: 5px 10%;
  border: 1px black solid;
}
.productItems > div:last-child {
  border-bottom: 1px black solid;
}
a {
  text-decoration: none !important;
}
.a-less {
  font-size: 27px;
  color: black;
}
.a-add {
  font-size: 22px;
  color: black;
}
.a-less:hover,
.a-add:hover {
  cursor: pointer;
}
.cartImage {
  padding: 11px;
  height: 120px;
  width: 120px;
}
.cartItemName {
  font-weight: 600;
}
.trashIcon {
  cursor: pointer;
}
.totalDiv {
  display: flex;
  justify-content: space-evenly;
  margin-left: 49%;
  margin-top: 2%;
  margin-bottom: 2%;
  
}
.totalDiv > p, .totalDiv > span {
  font-weight: 900;
  font-size: 24px;
}
.totalDiv > span {
  margin-right: 32px;
}
.cart-buttons {
  display: flex;
  justify-content: space-around;
  width: 50%;
  margin-left: 47%;
}
</style>
