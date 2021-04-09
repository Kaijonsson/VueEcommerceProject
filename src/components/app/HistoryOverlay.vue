<template>
  <div id="overlaySubContainer">
    <nav id="overlayNav">
      <div id="overlayNavNav">
        <p @click.prevent="openUserProfile" class="navName">
          {{ showUserName }}
        </p>
        <p @click.prevent="openUserHistory" class="navName">User History</p>
      </div>
      <p class="navName" id="navNameButton" @click.prevent="goBack">back</p>
    </nav>
    <div id="overlayListContainer">
      <ul id="currentCartUl" v-if="receipts.userReceipts">
        <li>Receipts</li>
        <li
          class="receiptCards"
          v-for="index of customerDb"
          :key="index.key"
          @click.prevent="getReceipt(index.key)"
        >
          {{ index.key }}
        </li>
      </ul>
      <ul id="currentCartUl" v-if="userProfile.showUserProfile">
        <li style="color: white">Profile</li>
      </ul>
      <div class="receiptsSection" v-if="receipts.userReceipts">
        <b-table
          striped
          hover
          :items="receipts.items"
          :fields="receipts.fields"
        ></b-table>
      </div>
      <div class="receiptsSection" v-if="userProfile.showUserProfile">
        <form id="profileContainer">
          <b-row class="my-1">
            <b-col sm="2">
              <label
                @click="changeOrSave(userProfile.profile.firstName)"
                class="changeOrSave"
                >{{ userProfile.profile.firstNameChangeOrSaveButton }}</label
              >
            </b-col>
            <b-col sm="10">
              <b-form-input
                :disabled="userProfile.profile.firstNameBoolean"
                class="input-large"
                size="lg"
                :placeholder="userProfile.profile.firstName"
                v-model="userProfile.profile.firstName"
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col sm="2">
              <label
                @click="changeOrSave(userProfile.profile.lastName)"
                class="changeOrSave"
                >{{ userProfile.profile.lastNameChangeOrSaveButton }}</label
              >
            </b-col>
            <b-col sm="10">
              <b-form-input
                :disabled="userProfile.profile.lastNameBoolean"
                class="input-large"
                size="lg"
                :placeholder="userProfile.profile.lastName"
                v-model="userProfile.profile.lastName"
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col sm="2">
              <label
                @click="changeOrSave(userProfile.profile.email)"
                class="changeOrSave"
                >{{ userProfile.profile.emailChangeOrSaveButton }}</label
              >
            </b-col>
            <b-col sm="10">
              <b-form-input
                :disabled="userProfile.profile.emailBoolean"
                class="input-large"
                size="lg"
                :placeholder="userProfile.profile.email"
                v-model="userProfile.profile.email"
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col sm="2">
              <label
                @click="changeOrSave(userProfile.profile.number)"
                class="changeOrSave"
                >{{ userProfile.profile.numberChangeOrSaveButton }}</label
              >
            </b-col>
            <b-col sm="10">
              <b-form-input
                :disabled="userProfile.profile.numberBoolean"
                class="input-large"
                size="lg"
                :placeholder="userProfile.profile.number"
                v-model="userProfile.profile.number"
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col sm="2">
              <label
                @click="changeOrSave(userProfile.profile.address)"
                class="changeOrSave"
                >{{ userProfile.profile.addressChangeOrSaveButton }}</label
              >
            </b-col>
            <b-col sm="10">
              <b-form-input
                :disabled="userProfile.profile.addressBoolean"
                class="input-large"
                size="lg"
                :placeholder="userProfile.profile.address"
                v-model="userProfile.profile.address"
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col sm="2">
              <label
                @click="changeOrSave(userProfile.profile.city)"
                class="changeOrSave"
                >{{ userProfile.profile.cityChangeOrSaveButton }}</label
              >
            </b-col>
            <b-col sm="10">
              <b-form-input
                :disabled="userProfile.profile.cityBoolean"
                class="input-large"
                size="lg"
                :placeholder="userProfile.profile.city"
                v-model="userProfile.profile.city"
              ></b-form-input>
            </b-col>
          </b-row>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { receiptsRef, firebaseAuth, usersRef } from "../../main";
import Vue from "vue";

export default {
  data() {
    return {
      customerDb: [],
      receipts: {
        fields: ["groceries", "units", "price"],
        items: [],
        userReceipts: true,
      },

      userProfile: {
        profile: {
          firstName: "",
          firstNameBoolean: true,
          firstNameChangeOrSaveButton: "Change",
          lastName: "",
          lastNameBoolean: true,
          lastNameChangeOrSaveButton: "Change",
          email: "",
          emailBoolean: true,
          emailChangeOrSaveButton: "Change",
          number: "",
          numberBoolean: true,
          numberChangeOrSaveButton: "Change",
          address: "",
          addressBoolean: true,
          addressChangeOrSaveButton: "Change",
          city: "",
          cityBoolean: true,
          cityChangeOrSaveButton: "Change",
        },
        showUserProfile: false,
      },
    };
  },

  computed: {
    showUserName() {
      return this.$store.state.firstName + " " + this.$store.state.lastName;
    },
  },

  created() {
    receiptsRef.get().then((snapshot) => {
      snapshot.forEach((childSnapshot) => {
        if (!childSnapshot.key === false) this.customerDb.push(childSnapshot);
      });
    });
    const userId = firebaseAuth.currentUser.uid;
    Vue.prototype.$currentUsersRef = usersRef.child(userId);
    usersRef
      .child(userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
          if (childSnapshot.key === "first_Name") {
            this.$store.commit("setFirstName", childSnapshot.val() + " ");
          }
          if (childSnapshot.key === "last_Name") {
            this.$store.commit("setLastName", childSnapshot.val());
          }
        });
      });
  },
  methods: {
    changeOrSave(string) {
      if (string === this.userProfile.profile.firstName) {
        this.userProfile.profile.firstNameBoolean = !this.userProfile.profile
          .firstNameBoolean;
        if (this.userProfile.profile.firstNameBoolean === false) {
          this.userProfile.profile.firstNameChangeOrSaveButton = "Save";
        } else {
          this.userProfile.profile.firstNameChangeOrSaveButton = "Change";
        }

        this.$currentUsersRef
          .child("first_Name")
          .get()
          .then((snapshot) => {
            if (snapshot.val() != string) {
              this.$store.commit("setFirstName", string);
              this.$currentUsersRef.update({
                first_Name: string,
              });
            }
          });
      }
      if (string === this.userProfile.profile.lastName) {
        this.userProfile.profile.lastNameBoolean = !this.userProfile.profile
          .lastNameBoolean;
        if (this.userProfile.profile.lastNameBoolean === false) {
          this.userProfile.profile.lastNameChangeOrSaveButton = "Save";
        } else {
          this.userProfile.profile.lastNameChangeOrSaveButton = "Change";
        }
        this.$currentUsersRef
          .child("last_Name")
          .get()
          .then((snapshot) => {
            if (snapshot.val() != string) {
              this.$store.commit("setLastName", string);
              this.$currentUsersRef.update({
                last_Name: string,
              });
            }
          });
      }
      if (string === this.userProfile.profile.email) {
        this.userProfile.profile.emailBoolean = !this.userProfile.profile
          .emailBoolean;
        if (this.userProfile.profile.emailBoolean === false) {
          this.userProfile.profile.emailChangeOrSaveButton = "Save";
        } else {
          this.userProfile.profile.emailChangeOrSaveButton = "Change";
        }
        this.$currentUsersRef
          .child("email")
          .get()
          .then((snapshot) => {
            if (snapshot.val() != string) {
              this.$currentUsersRef.update({
                email: string,
              });
            }
          });
      }
      if (string === this.userProfile.profile.number) {
        this.userProfile.profile.numberBoolean = !this.userProfile.profile
          .numberBoolean;
        if (this.userProfile.profile.numberBoolean === false) {
          this.userProfile.profile.numberChangeOrSaveButton = "Save";
        } else {
          this.userProfile.profile.numberChangeOrSaveButton = "Change";
        }
        this.$currentUsersRef
          .child("phone")
          .get()
          .then((snapshot) => {
            if (snapshot.val() != string) {
              this.$currentUsersRef.update({
                phone: string,
              });
            }
          });
      }
      if (string === this.userProfile.profile.address) {
        this.userProfile.profile.addressBoolean = !this.userProfile.profile
          .addressBoolean;
        if (this.userProfile.profile.addressBoolean === false) {
          this.userProfile.profile.addressChangeOrSaveButton = "Save";
        } else {
          this.userProfile.profile.addressChangeOrSaveButton = "Change";
        }
        this.$currentUsersRef
          .child("adress")
          .get()
          .then((snapshot) => {
            if (snapshot.val() != string) {
              this.$currentUsersRef.update({
                adress: string,
              });
            }
          });
      }
      if (string === this.userProfile.profile.city) {
        this.userProfile.profile.cityBoolean = !this.userProfile.profile
          .cityBoolean;
        if (this.userProfile.profile.cityBoolean === false) {
          this.userProfile.profile.cityChangeOrSaveButton = "Save";
        } else {
          this.userProfile.profile.cityChangeOrSaveButton = "Change";
        }
        this.$currentUsersRef
          .child("city")
          .get()
          .then((snapshot) => {
            if (snapshot.val() != string) {
              this.$currentUsersRef.update({
                city: string,
              });
            }
          });
      }
    },

    openUserProfile() {
      this.userProfile.showUserProfile = true;
      this.receipts.userReceipts = false;

      if (!this.userProfile.items) {
        this.profile();
      } else {
        this.userProfile.items = [];
        this.profile();
      }
    },

    profile() {
      for (let i = 0; i < 6; i++) {
        switch (i) {
          case 0:
            this.$currentUsersRef
              .child("email")
              .get()
              .then((snapshot) => {
                this.userProfile.profile.email = snapshot.val();
              });
            break;
          case 1:
            this.$currentUsersRef
              .child("first_Name")
              .get()
              .then((snapshot) => {
                this.userProfile.profile.firstName = snapshot.val();
              });
            break;
          case 2:
            this.$currentUsersRef
              .child("last_Name")
              .get()
              .then((snapshot) => {
                this.userProfile.profile.lastName = snapshot.val();
              });
            break;
          case 3:
            this.$currentUsersRef
              .child("phone")
              .get()
              .then((snapshot) => {
                this.userProfile.profile.number = snapshot.val();
              });
            break;
          case 4:
            this.$currentUsersRef
              .child("adress")
              .get()
              .then((snapshot) => {
                this.userProfile.profile.address = snapshot.val();
              });
            break;
          case 5:
            this.$currentUsersRef
              .child("city")
              .get()
              .then((snapshot) => {
                this.userProfile.profile.city = snapshot.val();
              });
            break;
        }
      }
    },

    openUserHistory() {
      this.userProfile.showUserProfile = false;
      this.receipts.userReceipts = true;
    },

    goBack() {
      this.$store.commit("setChooseHistory", false);
    },

    getReceipt(receipt) {
      if (!this.receipts.items) {
        this.groceryIndex(receipt);
      } else {
        this.receipts.items = [];
        this.groceryIndex(receipt);
      }
    },
    groceryIndex(info) {
      const Receiptsdb = receiptsRef.child(info);
      Receiptsdb.child("groceries")
        .get()
        .then((snapshot) => {
          snapshot.forEach((childSnapshot) => {
            const object = {
              units: "",
              groceries: "",
              price: "",
            };
            object.groceries = childSnapshot.key;

            Receiptsdb.child("groceries")
              .child(childSnapshot.key)
              .child("units")
              .get()
              .then((snapshot) => {
                object.units = snapshot.val();
              });
            Receiptsdb.child("groceries")
              .child(childSnapshot.key)
              .child("total price")
              .get()
              .then((snapshot) => {
                object.price = snapshot.val();
              });
            this.receipts.items.push(object);
          });
        });
    },
  },
};
</script>

<style scoped>
#overlaySubContainer {
  background-color: white;
  width: 80%;
  height: 80%;
}
#overlayNav {
  background-color: #17a2b8;
  width: 80%;
  height: 40px;
  margin: 20px auto 20px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
}

.navName {
  color: white;
  font-size: 20;
  margin-right: 15px;
  border: 1px solid rgba(0, 0, 0, 0.125);
  padding: 3px;
  color: white;
  font-weight: lighter;
}

.navName:hover {
  border: 1px solid white;
  border-radius: 10px;
}

#overlayListContainer {
  justify-content: space-between;
  display: flex;
  width: 80%;
  height: 80%;
  margin: 0 auto;
}
#currentCartUl {
  list-style: none;
  text-align: left;
  padding: 10px;
  font-size: 18px;
  background-color: #17a2b8;
  margin: 0;
}
.receiptCards {
  border: 1px solid rgba(0, 0, 0, 0.125);
  margin-top: 10px;
  padding: 10px;
  color: white;
  font-weight: lighter;
}

.receiptCards:hover {
  border: 1px solid white;
  border-radius: 10px;
}

.receiptsSection {
  border: 1px solid black;
  margin-left: 20px;
  flex-grow: 1;
  overflow-y: scroll;
  overflow-x: scroll;
}
#overlayNavNav {
  display: flex;
}
p {
  margin: 0;
  margin-left: 15px;
}

#navNameButton {
  font-size: 18px;
  margin-right: 15px;
  border: 1px solid rgba(0, 0, 0, 0.125);
  padding: 3px;
  color: white;
  font-weight: lighter;
}
#navNameButton:hover {
  border: 1px solid white;
  border-radius: 10px;
}

#profileContainer {
  margin-left: 20px;
  margin-top: 20px;
}

.changeOrSave {
  background-color: #17a2b8;
  font-size: 18px;
  margin-right: 15px;
  border: 1px solid rgba(0, 0, 0, 0.125);
  padding: 3px;
  color: white;
  font-weight: lighter;
}
.changeOrSave:hover {
  border: 1px solid white;
  border-radius: 10px;
  cursor: pointer;
}
</style>
