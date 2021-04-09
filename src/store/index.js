import Vue from "vue";
import Vuex from "vuex";
import _ from "underscore";
import { groceriesRef } from "../main";

Vue.use(Vuex);
// function updateLocalStorage(cart) {
//   localStorage.setItem('cart-items', JSON.stringify(cart))
// }

export default new Vuex.Store({
  state: {

    StoreCart : localStorage.getItem('cart-items') !== null ? JSON.parse(localStorage.getItem('cart-items')) : [],
    fruit: {},
    fish: {},
    meat: {},
    sauce: {},
    spices: {},
    vegetables: {},
    bakery: {},
    beverages: {},
    shellfish: {},
    softDrinks: {},
    seasonals: {},
    dairy: {},
    notifications: [], 

    chooseHistory: false,
    firstName: "",
    lastName: "",
  },
  mutations: {
    setFirstName(state, payload) {
      state.firstName = payload;
    },
    setLastName(state, payload) {
      state.lastName = payload;
    },
    ADD_ITEM(state, id) {
      state.StoreCart.push(id);
      localStorage.setItem('cart-items', JSON.stringify(state.StoreCart));
    },

    REMOVE_ITEM(state, id) {      
      state.StoreCart.splice(id, 1);
      localStorage.setItem('cart-items', JSON.stringify(state.StoreCart));
    },

    DELETE_CART_ITEM(state, itemName) {
      let updatedStoreCart = _.reject(state.StoreCart, function(item) {
        return item.name == itemName
      })
      state.StoreCart = updatedStoreCart
      localStorage.setItem('cart-items', JSON.stringify(state.StoreCart));
    },
    EMPTY_CART(state){
      localStorage.removeItem('cart-items');
      state.StoreCart = [];
    },
    
    setChooseHistory(state, payload) {
      state.chooseHistory = payload;
    },
    getStoreApple(state) {
      groceriesRef
        .child("Fruits")
        .child("Apple")
        .get()
        .then((usersObject) => {
          state.fruit = usersObject.val();
        });
    },
    getStoreFish(state) {
      groceriesRef
        .child("fish")
        .child("salmon")
        .get()
        .then((usersObject) => {
          state.fish = usersObject.val();
        });
    },
    getStoreMeat(state) {
      groceriesRef
        .child("meat")
        .child("chicken")
        .get()
        .then((usersObject) => {
          state.meat = usersObject.val();
        });
    },
    getStoreSauce(state) {
      groceriesRef
        .child("sauce")
        .child("mustard")
        .get()
        .then((usersObject) => {
          state.sauce = usersObject.val();
        });
    },
    getStoreShrimp(state) {
      groceriesRef
        .child("shellfish")
        .child("shrimp")
        .get()
        .then((usersObject) => {
          state.shellfish = usersObject.val();
        });
    },
    getStoreSpices(state) {
      groceriesRef
        .child("spices")
        .child("chillipowder")
        .get()
        .then((usersObject) => {
          state.spices = usersObject.val();
        });
    },
    getStoreVegetables(state) {
      groceriesRef
        .child("vegtables")
        .child("carrot")
        .get()
        .then((usersObject) => {
          state.vegetables = usersObject.val();
        });
    },
    getStoreBakery(state) {
      groceriesRef
        .child("bakery")
        .child("bread")
        .get()
        .then((usersObject) => {
          state.bakery = usersObject.val();
        });
    },
    getStoreMango(state) {
      groceriesRef
        .child("seasonals")
        .child("mango")
        .get()
        .then((usersObject) => {
          state.seasonals = usersObject.val();
        });
    },
    getStoreBeverages(state) {
      groceriesRef
        .child("beverages")
        .child("juices")
        .get()
        .then((usersObject) => {
          state.beverages = usersObject.val();
        });
    },
    getStoreEggs(state) {
      groceriesRef
        .child("dairy")
        .child("eggs")
        .get()
        .then((usersObject) => {
          state.dairy = usersObject.val();
        });
    },
    getStoreSoftDrinks(state) {
      groceriesRef
        .child("softDrinks")
        .child("påskmust")
        .get()
        .then((usersObject) => {
          state.softDrinks = usersObject.val();
        });
    },
  },
  getters: {
 
    productQuantity(state,product) {
      const item = state.StoreCart.find(i => i.id === product.id)

      if(item) {
        return item.quantity
      } else {
        return null
      }

    },
    appleGetter(state) {
      return state.fruit;
    },
    fishGetter(state) {
      return state.fish;
    },
    meatGetter(state) {
      return state.meat;
    },
    sauceGetter(state) {
      return state.sauce;
    },
    spicesGetter(state) {
      return state.spices;
    },
    vegetablesGetter(state) {
      return state.vegetables;
    },
    bakeryGetter(state) {
      return state.bakery;
    },
    beveragesGetter(state) {
      return state.beverages;
    },
    softDrinkGetter(state) {
      return state.softDrinks;
    },
    eggsGetter(state) {
      return state.dairy;
    },
    mangoGetter(state) {
      return state.seasonals;
    },
    shrimpGetter(state) {
      return state.shellfish;
    },
    StoreCart: (state) => {
      return _.groupBy(state.StoreCart, 'name');
    },
    groupTotal(state) {
      let total = 0;
      for(let i = 0; i<state.StoreCart.length; i++) {
        total = total + state.StoreCart[i]['price']
      }
      return total;
    }
  },
  modules: {},
  actions: {
  
  addItem(context, id) {
    context.commit("ADD_ITEM", id);
  },
  removeItem(context, index) {
    context.commit("REMOVE_ITEM", index);
  },
  addToCart(context, data) {
    context.commit('ADD_ITEM', data);
  },
  deleteProducts(context, product) {
    context.commit('DELETE_CART_ITEM',product);
  },
  emptyCart(context){
    context.commit('EMPTY_CART')
  }
    
  },
});
