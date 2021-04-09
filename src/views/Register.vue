<template>
  <form @submit.prevent="pressed" novalidate>
    <div class="background">
      <div class="inner-background">
        <h1>Register</h1>
        <div class="registerError" v-if="registerUser.EmptyError">
          {{ registerUser.EmptyError }}
        </div>
        <div class="registerError" v-if="registerUser.error">
          {{ registerUser.error }}
        </div>
        <div id="register-style">
          <input
            type="fName"
            v-model="registerUser.fName"
            placeholder="first name"
          />
        </div>
        <div id="register-style">
          <input
            type="lName"
            v-model="registerUser.lName"
            placeholder="last name"
          />
        </div>
        <div id="register-style">
          <input
            type="phone"
            v-model="registerUser.phone"
            placeholder="phone number"
          />
        </div>
        <div id="register-style">
          <input type="city" v-model="registerUser.city" placeholder="city" />
        </div>
        <div id="register-style">
          <input
            type="adress"
            v-model="registerUser.adress"
            placeholder="adress"
          />
        </div>
        <div class="email" id="register-style">
          <input
            type="email"
            v-model="registerUser.email"
            placeholder="email"
          />
        </div>
        <div class="password" id="register-style">
          <input
            type="password"
            v-model="registerUser.password"
            placeholder="Password"
          />
        </div>
        <button type="submit">
          Sign Up
        </button>
        <div class="register">
          <br />
          <p>
            Already have an account?
            <router-link to="login">Login here</router-link>
          </p>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import { db } from "../main";
import * as crypto from "crypto-js";

export default {
  methods: {
    pressed: function() {
      const postEmtyError = () => {
        this.registerUser.EmptyError = "Can't submit empty field/fields";
      };
      if (
        !this.registerUser.fName ||
        !this.registerUser.lName ||
        !this.registerUser.phone ||
        !this.registerUser.city ||
        !this.registerUser.adress ||
        !this.registerUser.email ||
        !this.registerUser.password
      ) {
        postEmtyError();
      } else {
        const user = firebase
          .auth()
          .createUserWithEmailAndPassword(
            this.registerUser.email,
            crypto.SHA256(this.registerUser.password).toString()
          )
          .then(() => {
            const userId = firebase.auth().currentUser.uid;
            const firstName = this.registerUser.fName;
            const lastName = this.registerUser.lName;
            const phone = this.registerUser.phone;
            const city = this.registerUser.city;
            const adress = this.registerUser.adress;
            const email = this.registerUser.email;
            db.ref("Client_Users/" + userId).set({
              first_Name: firstName,
              last_Name: lastName,
              city: city,
              phone: phone,
              adress: adress,
              email: email,
            });
            this.$router.replace({ name: "home" });
            console.log(user);
          })
          .catch((err) => {
            if (err) {
              this.registerUser.error = err;
              console.log(err);
            }
          });
      }
    },

  },
  data() {
    return {
      registerUser: {
        fName: "",
        lName: "",
        phone: "",
        city: "",
        adress: "",
        error: "",
        email: "",
        password: "",
      },
    };
  },
};
</script>

<style>
.registerError {
  color: red;
}

#register-style {
  padding: 10px;
}

input {
  box-sizing: border-box;
  border: 2.5px solid black;
  border-radius: 5px;
  width: 15rem;
  height: 40px;
}

button {
  background-color: white;
  color: black;
  border: 2px solid black;
  padding: 10px 24px;
  transition-duration: 0.4s;
}

button:hover {
  background-color: #17a2b8;
}

</style>
