<template>
  <div class="login">
    <h1>Login</h1>
    <div class="format">
      <div>
        <input
          type="email"
          v-model="userToLogin.email"
          placeholder="email"
          class="login-style"
        />
      </div>
      <div>
        <input
          type="password"
          v-model="userToLogin.password"
          placeholder="password"
          class="login-style"
        />
      </div>
      <button class="form-input" @click.prevent="login">Login</button>
    </div>
    <div class="register">
      <p>
        Don't have a account?
        <router-link to="register">Register here</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import * as crypto from "crypto-js";

export default {
  data() {
    return {
      userToLogin: {
        email: "",
        password: "",
        error: "",
        emptyError: "",
      },
    };
  },
  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(
          this.userToLogin.email,
          crypto.SHA256(this.userToLogin.password).toString()
        )
        .catch((err) => {
          console.log(err.message);
          if (err.message == "The email address is badly formatted.") {
            console.log("Du får inte vara med.");
          }

          this.userToLogin.error = err.message;
          if (err.code === "auth/user-not-found") {
            this.userToLogin.error = "User does not exist";
          }
        })
        .then((response) => {
          console.log("logged in");
          console.log(response);
          this.$router.replace({ name: "home" });
        });
    },
  },
};
</script>

<style>
.form-input {
  margin: 10px;
}

.login-style {
  margin: 10px;
}
</style>
