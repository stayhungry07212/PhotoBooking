<template>
  <v-container>
    <v-toolbar height="200px" class="header-profile"> </v-toolbar>
    <v-card>
      <v-tabs vertical>
        <v-tab class="tab-style">
          <v-icon left>
            mdi-account
          </v-icon>
          Show my details
        </v-tab>
        <v-tab class="tab-style">
          <v-icon left>
            mdi-email
          </v-icon>
          My email address
        </v-tab>
        <v-tab class="tab-style">
          <v-icon left>
            mdi-lock
          </v-icon>
          Change password
        </v-tab>

        <v-tab-item class="tab-item-style">
          <v-col cols="12" md="6">
            <v-text-field
              prepend-icon="mdi-account"
              name="nume"
              label="Nume"
              id="nume"
              :v-model="name"
              :value="thisUserDetails.nume"
              :disabled="disabledDetails"
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-text-field
              prepend-icon="mdi-account"
              name="prenume"
              label="Prenume"
              id="prenume"
              :value="thisUserDetails.prenume"
              :disabled="disabledDetails"
            ></v-text-field>
            <v-text-field
              prepend-icon="mdi-account"
              name="telefon"
              label="Telefon"
              id="telefon"
              :value="thisUserDetails.telefon"
              :disabled="disabledDetails"
            ></v-text-field>
            <v-autocomplete
              prepend-icon="mdi-account"
              name="sex"
              id="sex"
              label="Gender"
              :value="thisUserDetails.sex"
              :disabled="disabledDetails"
              :items="gender"
            ></v-autocomplete>

            <v-card-actions>
              <v-spacer></v-spacer>
              <div
                v-if="changeDetails === false"
                @click="(changeDetails = true) && (disabledDetails = false)"
              >
                <v-btn> Edit </v-btn>
              </div>
              <div v-if="changeDetails === true" @click="saveDetails()">
                <v-btn> Save </v-btn>
              </div>
            </v-card-actions>
          </v-col>
        </v-tab-item>

        <v-tab-item class="tab-item-style">
          <v-col cols="12" md="6">
            <v-text-field
              prepend-icon="mdi-email"
              name="oldEmail"
              id="oldEmail"
              label="Current email address"
              :value="thisUserDetails.email"
              :disabled="disabledDetails"
            ></v-text-field>
            <v-text-field
              prepend-icon="mdi-email"
              v-model="email2"
              label="New email address"
            >
            </v-text-field>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="updateEmail()">
                Update email
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-tab-item>
        <v-tab-item class="tab-item-style">
          <v-col cols="12" md="6">
            <v-text-field
              prepend-icon="mdi-lock"
              v-model="password4"
              :rules="[comparePasswordsActual]"
              :append-icon="show1 ? 'mdi-eye-off' : 'mdi-eye'"
              :type="show1 ? 'text' : 'password'"
              @click:append="show1 = !show1"
              label="Current password"
            >
            </v-text-field>
            <v-text-field
              prepend-icon="mdi-lock"
              v-model="password2"
              id="pass"
              :append-icon="show2 ? 'mdi-eye-off' : 'mdi-eye'"
              :type="show2 ? 'text' : 'password'"
              @click:append="show2 = !show2"
              label="New password"
            >
            </v-text-field>
            <v-text-field
              prepend-icon="mdi-lock"
              v-model="passwordConfirm"
              :append-icon="show2 ? 'mdi-eye-off' : 'mdi-eye'"
              :type="show2 ? 'text' : 'password'"
              @click:append="show2 = !show2"
              :rules="[comparePasswords]"
              label="Retype the new password"
            >
            </v-text-field>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="updatePassword()">
                Update password
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </v-container>
</template>
<script>
/* eslint-disable */
import firebase from "firebase";
export default {
  name: "Profile",
  data() {
    return {
      birthday: null,
      menu: false,
      loading: false,
      disabledDetails: true,
      changeDetails: false,
      name: "",
      dialog: false,
      dialogEmail: false,
      show1: false,
      show2: false,
      show3: false,
      show4: false,
      email2: "",
      oldEmail: "",
      password2: "",
      password3: "",
      password4: "",
      passwordConfirm: "",
      univType: ["Stat", "Privat"],
      gender: ["F", "M"],
      numeUniv: "",
      nameUniversity: "",
      descriptionUniv: "",
      siteUniv: "",
      locationUniv: "",
      photosUniv: "",
      logoUniv: "",
      typeUniv: "",
      facilitiesUniv: "",
      numeFac: "",
      descriptionFac: "",
      logoFac: "",
      typeFac: "",
      downloadURL: "",
      sendEmail: false,
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    usersDetails() {
      return this.$store.getters.photographersDetails;
    },
    thisUserDetails() {
      let detalii = null;
      this.usersDetails.forEach((element) => {
        if (element.idFotograf === this.user.id) {
          detalii = element;
        }
      });
      return detalii;
    },
    comparePasswords() {
      return this.password2 !== this.passwordConfirm
        ? "Parolele nu coincid"
        : false;
    },
    comparePasswordsActual() {
      return this.password4 !== this.thisUserDetails.parola
        ? "Parola actuala este incorecta"
        : false;
    },
  },
  methods: {
    saveDetails() {
      var name = document.getElementById("nume").value;
      var surname = document.getElementById("prenume").value;
      var birthday = document.getElementById("birthday").value;
      var phone = document.getElementById("telefon").value;
      var sex = document.getElementById("sex").value;
      this.disabledDetails = true;
      this.changeDetails = false;
      firebase
        .database()
        .ref("fotografi/" + this.user.id)
        .update({
          nume: name,
          prenume: surname,
          dataNastere: birthday,
          sex: sex,
          telefon: phone,
        });
    },
    updateEmail() {
      firebase
        .database()
        .ref("fotografi/" + this.user.id)
        .update({
          email: this.email2,
        });
    },
    updatePassword() {
      this.dialog = true;
      if (this.thisUserDetails.parola === this.password4) {
        firebase
          .database()
          .ref("fotografi/" + this.user.id)
          .update({
            parola: this.password2,
          });
      } else {
        this.sendPsw = true;
      }
    },
  },
};
</script>

<style>
#centru {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
