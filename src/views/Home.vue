<template>
  <div class="home">
    <h1 v-if="route">This is our {{ route }} page</h1>
    <div id="flexContainer">
      <div
        class="groceryNameContainer"
        v-for="grocery in groceries"
        :key="grocery.id"
      >
        <b-card
          title=""
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 20rem"
          class="mb-2"
          ><b-card-img v-if="grocery.url" :src="grocery.url"></b-card-img>
          <b-card-text class="mt-3" style="font-size: 18px">
            {{ grocery.description }}
          </b-card-text>
          <b-card-text style="font-weight: 700" class="mb-0">
            {{ grocery.price }}kr
          </b-card-text>
          <b-card-text style="font-size: 12px">
            {{ grocery.comparison }}
          </b-card-text>
          <b-button href="#" variant="primary" @click="addToCart(grocery)"
            >Add to Cart</b-button
          >
        </b-card>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import _ from "underscore";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      underscore: _,
      route: "",
    };
  },

  computed: {
    ...mapGetters(["StoreCart"]),
    groceries: function() {
      var groceriesArray = [];
      groceriesArray.push(this.$store.getters.appleGetter);
      groceriesArray.push(this.$store.getters.fishGetter);
      groceriesArray.push(this.$store.getters.meatGetter);
      groceriesArray.push(this.$store.getters.sauceGetter);
      groceriesArray.push(this.$store.getters.spicesGetter);
      groceriesArray.push(this.$store.getters.vegetablesGetter);
      groceriesArray.push(this.$store.getters.bakeryGetter);
      groceriesArray.push(this.$store.getters.beveragesGetter);
      groceriesArray.push(this.$store.getters.shrimpGetter);
      groceriesArray.push(this.$store.getters.softDrinkGetter);
      groceriesArray.push(this.$store.getters.mangoGetter);
      groceriesArray.push(this.$store.getters.eggsGetter);

      return groceriesArray;
    },
  },
  created() {
    this.$store.commit("getStoreApple");
    this.$store.commit("getStoreFish");
    this.$store.commit("getStoreMeat");
    this.$store.commit("getStoreSauce");
    this.$store.commit("getStoreSpices");
    this.$store.commit("getStoreVegetables");
    this.$store.commit("getStoreBakery");
    this.$store.commit("getStoreBeverages");
    this.$store.commit("getStoreShrimp");
    this.$store.commit("getStoreSoftDrinks");
    this.$store.commit("getStoreMango");
    this.$store.commit("getStoreEggs");

    this.route = this.$route.name;
  },
  methods: {
    addToCart(grocery) {
      this.$store.dispatch("addToCart", grocery);
      alert('Added to cart')
    },
  },
};
</script>

<style>
.nestedGroceryInfoContainer {
  border: 1px solid black;
  margin: 10px;
  padding: 15px;
  border-radius: 5px;
}

.descriptionContainer {
  font-weight: 500;
  padding-top: 200;
  color: rgb(6, 6, 43);
}

.nav-text-collapse {
  background-color: rgb(0, 255, 13);
}
.nameContainer {
  font-weight: bold;
  text-decoration: underline;
}
.priceContainer {
  position: absolute;
  margin-top: 13%;
  border: none;
  font-weight: bold;
  font-size: 30px;
}

.groceryNameContainer > * {
  flex-basis: 45%;
  margin-right: 10px;
}

#flexContainer {
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
}
.innerProductContainer {
  margin-left: 28%;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
  margin-top: -65%;
  width: 30%;
  height: 46%;
}
.productImage {
  margin-left: 55px;
  height: 150px;
  width: 160px;
}
.detailsContainer {
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
}
.comparisonContainer {
  color: #2f2626;
}
</style>
