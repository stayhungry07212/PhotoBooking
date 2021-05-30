<template>
  <v-app>
    <!-- continut ce se afiseaza pe toate paginile, indiferent de continut (valabil doar in fisierul App.vue) -->
    <v-app-bar app>
      <div class="headline">
        <router-link :to="'/Home'">
          <div class="white--text">
            <span class="text-uppercase yellow-text">Photo</span>
            <span class="font-weight-light">Booking</span>
          </div>
        </router-link>
      </div>
      <v-spacer></v-spacer>
      <v-btn
        @click="dialogLogIn = !dialogLogIn"
        text
        v-if="!logout"
        class="white--text"
      >
        Login
      </v-btn>
      <v-btn @click="dialogSignUp = !dialogSignUp" v-if="!logout">
        Sign up
      </v-btn>
      <v-btn router to="/Test" v-if="user && user.id">
        Test
      </v-btn>
      <v-menu offset-y v-if="user && user.id">
        <template v-slot:activator="{ attrs, on }">
          <v-btn v-bind="attrs" v-on="on">
            <div>Cont</div>
          </v-btn>
        </template>

        <v-list>
          <div v-if="user && user.type === 'client'">
            <router-link to="/ProfilClient" style="cursor:pointer">
              <div class='menu-list'>Details</div>
            </router-link>
          </div>
          <div v-if="user && user.type === 'photo'">
            <router-link to="/ProfilFotograf" style="cursor:pointer">
              <div class='menu-list'>Details</div>
            </router-link>
          </div>
          <div v-if="user && user.type === 'client'">
            <router-link to="/CereriTrimise" style="cursor:pointer">
              <div class='menu-list'>Requests</div>
            </router-link>
          </div>
          <div v-if="user && user.type === 'photo'">
            <router-link to="/CereriAcceptDecline" style="cursor:pointer">
              <div class='menu-list'>Requests</div>
            </router-link>
          </div>
        </v-list>
      </v-menu>

      <v-btn @click="signOut()" v-if="logout" text>
        Logout
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>

    <v-dialog v-model="dialogLogIn" max-width="50%" scrollable>
      <v-row class="container-style">
        <v-col cols="12" sm="6" align="center" justify="space-around">
          <div class="img-container">
            <img
              src="./assets/login-bg.jpg"
              style="width: 100%; overflow: hidden"
            />
            <v-btn text class="register-btn" @click="goToRegister()">
              Create your account &#x2192;
            </v-btn>
          </div>
        </v-col>

        <v-col cols="12" sm="6">
          <div class="login-text">
            Login
          </div>
          <v-card-text>
            <v-text-field
              v-model="formSignIn.email"
              required
              placeholder="Email address"
            >
            </v-text-field>
            <v-text-field
              v-model="formSignIn.password"
              placeholder="Password"
              required
              :append-icon="show ? 'mdi-eye-off' : 'mdi-eye'"
              :type="show ? 'text' : 'password'"
              @click:append="show = !show"
            >
            </v-text-field>
            <v-switch
              v-model="formSignIn.switch"
              :label="
                formSignIn.switch
                  ? 'Sign in as photographer'
                  : 'Sign in as a customer'
              "
            >
            </v-switch>
            <v-alert
              :value="true"
              type="error"
              v-if="errorLogin !== null"
              style="margin-bottom: 0px"
            >
              {{ errorLogin }}
            </v-alert>
          </v-card-text>

          <v-card-actions class="actions-style">
            <v-btn
              class="forgot-psw-btn"
              type="submit"
              @click="forgotPassword()"
            >
              Forgot password?
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              type="submit"
              @click="userSign"
              :disabled="!verifyFormErrorsSignIn"
            >
              Login
            </v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-dialog>

    <v-dialog v-model="dialogSignUp" max-width="60%" scrollable>
      <v-row class="container-style">
        <v-col cols="12" sm="6">
          <div class="img-container">
            <img
              src="./assets/signup-bg.jpg"
              style="height: 100%; overflow: hidden"
            />
            <v-btn text class="to-login-btn" @click="goToLogin()">
              Already have an account? Login &#x2192;
            </v-btn>
          </div>
        </v-col>
        <v-col cols="12" sm="6">
          <div class="register-text">
            Create an account
          </div>
          <v-card-text>
            <v-text-field
              v-model="formSignUp.name"
              required
              placeholder="Name"
              class="field-style"
            >
              Name
            </v-text-field>
            <v-text-field
              v-model="formSignUp.surname"
              required
              placeholder="Surname"
            >
              Surname
            </v-text-field>

            <v-select
              :items="gender"
              placeholder="Gender"
              required
              v-model="formSignUp.sex"
            ></v-select>
            <v-text-field
              v-model="formSignUp.email2"
              required
              placeholder="Email address"
            >
              Email
            </v-text-field>
            <v-text-field
              v-model="formSignUp.phone"
              required
              placeholder="Phone"
            >
              Phone
            </v-text-field>
            <v-switch
              v-model="formSignUp.switch"
              :label="
                formSignUp.switch
                  ? 'Register as photographer'
                  : 'Register as a customer'
              "
            ></v-switch>
            <v-text-field
              v-model="formSignUp.password2"
              required
              :append-icon="show1 ? 'mdi-eye-off' : 'mdi-eye'"
              :type="show1 ? 'text' : 'password'"
              @click:append="show1 = !show1"
              placeholder="Password"
            >
              Password
            </v-text-field>
            <v-text-field
              v-model="formSignUp.passwordConfirm"
              required
              :append-icon="show2 ? 'mdi-eye-off' : 'mdi-eye'"
              :type="show2 ? 'text' : 'password'"
              @click:append="show2 = !show2"
              :rules="[comparePasswords]"
              placeholder="Retype your password"
            >
              Retype your password
            </v-text-field>
            <v-checkbox
              label="Acceptance of personal data processing"
              v-model="formSignUp.gdpr"
              required
            >
            </v-checkbox>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              type="submit"
              @click="newAccount()"
              :disabled="!verifyFormErrorsSignUp"
            >
              Register account
            </v-btn>
          </v-card-actions>
          <v-alert :value="true" type="error" v-if="errorSignUp !== null">
            {{ errorSignUp }}
          </v-alert>
        </v-col>
      </v-row>
    </v-dialog>
  </v-app>
</template>
<script>
/* eslint-disable no-console */
/* eslint-disable */
import rules from "./components/formRules";
import router from "@/router";
import firebase from "firebase";
export default {
  name: "App",
  data() {
    return {
      formSignUp: {
        name: "",
        password2: "",
        passwordConfirm: "",
        email2: "",
        surname: "",
        birthday: null,
        phone: null,
        gdpr: false,
        switch: false,
      },
      formSignIn: {
        email: "",
        password: "",
        switch: false,
      },
      userType: null,
      userLogged: false,
      menu: false,
      show: false,
      show1: false,
      show2: false,
      gender: ["Female", "Male"],
      sex: null,
      dialogLogIn: false,
      dialogSignUp: false,
      errorLogin: null,
      errorSignUp: null,
      rules: null,
    };
  },
  // functii ce se apeleaza de fiecare data cand o valoare din interior se modifica. Numele functiei se poate utiliza si pe post de variabila daca aceasta 'return'-eaza
  computed: {
    logout() {
      if (!this.user) {
        return false;
      } else if (!this.user.type) {
        return false;
      } else {
        return true;
      }
    },
    user() {
      return this.$store.getters.user;
    },
    verifyFormErrorsSignIn() {
      return (
        this.formSignIn.password.length > 3 &&
        /.+@.+/.test(this.formSignIn.email)
      );
    },
    verifyFormErrorsSignUp() {
      return (
        this.formSignUp.password2.length > 3 &&
        /.+@.+/.test(this.formSignUp.email2) &&
        this.formSignUp.name.length > 3 &&
        this.formSignUp.surname.length > 3 &&
        this.formSignUp.sex !== null &&
        this.formSignUp.password2.length > 3 &&
        this.comparePasswords !== "Passwords do not match"
      );
    },
    error() {
      return this.$store.getters.error;
    },
    comparePasswords() {
      return this.formSignUp.password2 !== this.formSignUp.passwordConfirm
        ? "Passwords do not match"
        : false;
    },
  },
  // functii ce se apeleaza la cerere
  methods: {
    goToRegister() {
      this.dialogSignUp = true;
      this.dialogLogIn = false;
    },
    goToLogin() {
      this.dialogLogIn = true;
      this.dialogSignUp = false;
    },
    userSign(email, password) {
      if (this.formSignIn.switch === true) {
        let details = this.$store.getters.photographersDetails;
        details.forEach((element) => {
          if (
            element.email === this.formSignIn.email &&
            element.parola === this.formSignIn.password
          ) {
            this.$store.dispatch("loginUser", {
              type: "photo",
              id: element.idFotograf,
            });
            this.dialogLogIn = false;
            this.formSignIn.email = "";
            this.formSignIn.password = "";
            this.errorLogin = null;
          } else {
            this.errorLogin = "Invalid email or password";
          }
        });
      } else {
        let details = this.$store.getters.usersDetails;
        details.forEach((element) => {
          if (
            element.email === this.formSignIn.email &&
            element.parola === this.formSignIn.password
          ) {
            this.$store.dispatch("loginUser", {
              type: "client",
              id: element.idClient,
            });
            this.dialogLogIn = false;
            this.formSignIn.email = "";
            this.formSignIn.password = "";
            this.errorLogin = null;
          } else {
            this.errorLogin = "Invalid email or password";
          }
        });
      }
    },
    newAccount() {
      if (this.formSignUp.switch === true) {
        firebase
          .database()
          .ref("fotografi/")
          .push({
            dataInregistrare: new Date(),
            nume: this.formSignUp.name,
            parola: this.formSignUp.passwordConfirm,
            email: this.formSignUp.email2,
            prenume: this.formSignUp.surname,
            telefon: this.formSignUp.phone,
            dataNastere: this.formSignUp.birthday,
            sex: this.sex,
            idFotograf: "test",
          })
          .then((ceva) => {
            this.dialogSignUp = false;
            this.dialogLogIn = true;
          })
          .then((snap) => {
            firebase
              .database()
              .ref("fotografi/" + snap.key)
              .update({
                idFotograf: snap.key,
              });
          });
      } else {
        firebase
          .database()
          .ref("clienti/")
          .push({
            dataInregistrare: new Date(),
            nume: this.formSignUp.name,
            parola: this.formSignUp.passwordConfirm,
            email: this.formSignUp.email2,
            prenume: this.formSignUp.surname,
            telefon: this.formSignUp.phone,
            dataNastere: this.formSignUp.birthday,
            sex: this.sex,
            idClient: "test",
          })
          .then((snap) => {
            firebase
              .database()
              .ref("clienti/" + snap.key)
              .update({
                idClient: snap.key,
              });
          });
        this.dialogSignUp = false;
        this.dialogLogIn = true;
      }
    },
    forgotPassword() {
      const adresaEmail = prompt("Introduceti adresa de email", "");
      if (adresaEmail) {
        firebase
          .auth()
          .sendPasswordResetEmail(adresaEmail)
          .then(function() {
            window.alert(
              "Un email de recuperare a parolei a fost trimis pe adresa: " +
                adresaEmail
            );
          })
          .catch((error) => {
            window.alert(error.message);
          });
      }
    },
    signOut() {
      this.$store.dispatch("loginUser", { type: null });
      localStorage.clear();
      router.push("/Home");
    },
  },
  // LIFECYCLE: functie ce se apeleaza inainte de construirea DOM-ului
  created() {
    var altArray = [];
    var bookingsDetails = {};
    this.rules = rules;
    this.$store.dispatch("readUsers");
    this.$store.dispatch("readPhotographers");
    this.$store.dispatch("readPortofolios");
    this.$store.dispatch("readBookings");
    this.$store.dispatch("verifyUserLogged");
    this.$store.dispatch("getArrayOfPortofoloos");
  },
  // LIFECYCLE: functie ce se apeleaza in timpul construirii DOM-ului
  mounted() {},
};
</script>

<style>
:root {
  --yellow: #ffd53d;
  --aquamarine: #40b0df;
  --blue-grotto: #0067b3;
  --blue: #0000a3;
  --white: #f8f9f9;
  --box-shadow: 0 0px 9px 0px lightgrey;
  --gray-text: rgba(17, 23, 29, 0.6);
  --black-text: #0e1318;
  --border-radius: 8px;
}
.v-application--wrap {
  background-color: var(--white);
  color: var(--black-text);
}
.v-btn {
  background-color: var(--yellow) !important;
  margin: 3px;
}
.v-btn--text {
  background-color: transparent !important;
}
.v-btn--text .v-btn__content {
  color: var(--white) !important;
}
.v-btn .v-btn__content {
  color: var(--blue-grotto);
}
.theme--light.v-app-bar.v-toolbar.v-sheet {
  background-color: var(--blue-grotto) !important;
}
.v-application a {
  text-decoration: none;
}
.yellow-text {
  color: var(--yellow);
}
.v-btn--disabled {
  background-color: transparent !important;
  cursor: not-allowed !important;
}
.container-style {
  padding: 0px;
  background-color: var(--white);
  overflow: hidden;
}
.register-btn {
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translate(-50%, -50%);
}
.to-login-btn {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translate(-50%, -50%);
}
.login-text {
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 20%;
  margin-bottom: 10%;
  color: var(--blue-grotto);
  margin-left: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  overflow: hidden;
}
.register-text {
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 10%;
  margin-bottom: 10px;
  color: var(--blue-grotto);
  margin-left: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  overflow: hidden;
}
.img-container {
  position: relative;
  text-align: center;
  color: white;
  overflow: hidden;
}
.actions-style {
  margin-top: 8%;
}
.forgot-psw-btn {
  background-color: transparent !important;
  box-shadow: none;
}
.field-style {
  margin-top: 0px;
  padding-top: 0px;
}
.menu-list {
padding: 5px 8px 8px 5px
}
</style>
