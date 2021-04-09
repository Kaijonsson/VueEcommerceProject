<template>
  <div class="contact">
    <router-link to="/">Home</router-link> ||
    <router-link to="login">Login</router-link> ||

    <router-link to="contact">Contact us</router-link> ||
    <router-link to="/cart">Cart</router-link>

    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">Banana-Commerce 🍌</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <router-link to="/cart" class=" ml-2 my-sm-0 menu-item navIcons">

            <b-icon icon="cart4" scale="2" variant="dark" class="cartIcon" ></b-icon>
            <span v-if="StoreCart" class="cart-counter">({{ Object.keys(StoreCart).length }})</span>
            <span v-if="!StoreCart" class="cart-counter">({{ StoreCart.length }})</span>
            </router-link>
          <b-nav-item-dropdown right v-if="loggedIn">
            <!-- Using 'button-content' slot -->
            <template #button-content>

              <router-link to="/cart" class=" ml-2 my-sm-0 menu-item navIcons">

            <b-icon icon="cart4" scale="1.5" variant="dark" class="cartIcon" ></b-icon>
            </router-link>

              <em>{{ showUserName }}</em>
            </template>
            <b-dropdown-item @click.prevent="showOverlay" href="#"
              >Profile</b-dropdown-item
            >
            <b-dropdown-item @click.prevent="signOut" href="#"
              >Sign Out</b-dropdown-item
            >
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { firebaseAuth, usersRef } from "../../main";

export default {
  data() {
    return {
      loggedIn: false,
    };
  },
  computed: {
    cartCounter() {
      return this.$store.getters.storeQuantity;
    },
    StoreCart() {
      return this.$store.getters.StoreCart;
    },
    showUserName() {
      return this.$store.state.firstName;
    },
  },
  created() {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        const userId = firebaseAuth.currentUser.uid;
        this.loggedIn = true;
        usersRef
          .child(userId)
          .child("first_Name")
          .get()
          .then((snapshot) => {
            console.log(snapshot.val());
            this.$store.commit("setFirstName", snapshot.val());
          });
      } else {
        this.loggedIn = false;
      }
    });
  },
  methods: {
    showOverlay() {
      this.$store.commit("setChooseHistory", true);
    },

    log() {
      console.log("pressed");
    },

    signOut() {
      try {
        console.log("clicked");
        const data = firebaseAuth.signOut();
        console.log(data);
        this.$router.replace({ name: "login" });
        this.user = "";
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style>
.cartIcon {
  margin-left: 18px;
  margin-right: 18px;
  margin-top: 16%;
}
.cart-counter {
  color: rgb(136, 54, 54);
  margin-left: -11px;
  margin-right: 30px;
}
</style>
