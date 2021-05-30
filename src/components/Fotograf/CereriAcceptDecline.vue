<template>
  <v-container fluid grid-list-xl>
    <v-layout align-center justify-space-around row>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                Client
              </th>
              <th class="text-left">
                Period start
              </th>
              <th class="text-left">
                Period end
              </th>
              <th class="text-left">
                Status
              </th>
              <th class="text-left"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in getBookingsForPhoto" :key="item.prenume">
              <td class="text-xs-left">{{ item.idClient }}</td>
              <td class="text-xs-left">{{ item.dataStart }}</td>
              <td class="text-xs-left">{{ item.dataEnd }}</td>
              <td
                v-bind:class="{
                  'red--text': item.status === 'pending',
                  'green--text': item.status === 'approved',
                  'orange--text': item.status === 'declined',
                }"
              >
                {{ item.status }}
              </td>
              <td v-if="item.status === 'pending'">
                <v-btn text small color="green" @click="aprove(item.idCerere)">
                  Aproba cerere
                </v-btn>
                <v-btn
                  text
                  small
                  color="orange"
                  @click="decline(item.idCerere)"
                >
                  Respinge cerere
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      send: false,
      status: [],
      statuses: [
        {
          text: "Aprobate",
          value: "approved",
        },
        {
          text: "Anulate",
          value: "declined",
        },
        {
          text: "In asteptare",
          value: "pending",
        },
      ],
      items: [],
      id: null,
      headers: [
        {
          text: "Client",
          align: "left",
          value: "user",
        },
        {
          text: "Perioada solicitata",
          value: "university",
        },
        {
          text: "status",
          value: "statuses",
        },
        {
          text: "",
          value: "actions",
        },
      ],
      indexes: null,
      data: [],
    };
  },
  computed: {
    bookingDetails() {
      return this.$store.getters.bookingsDetails;
    },
    user() {
      return this.$store.getters.user;
    },
    getBookingsForPhoto() {
      let detalii = [];
      this.bookingDetails.forEach((element) => {
        if (element.idFotograf === this.user.id) {
          detalii.push(element);
        }
      });
      return detalii;
    },
  },
  methods: {
    getPhotographersData() {
      let x = [];
      this.$store.getters.photographersDetails.filter((item) => {
        this.getBookingsForPhoto.forEach((photographer) => {
          if (photographer.idFotograf === item.idFotograf) {
            x.push(item);
          }
        });
      });
      this.data = x;
    },
    aprove(value) {
      firebase
        .database()
        .ref("rezervari/" + value)
        .update({
          status: "approved",
        });
    },
    decline(value) {
      firebase
        .database()
        .ref("rezervari/" + value)
        .update({
          status: "declined",
        });
    },
  },
};
</script>
