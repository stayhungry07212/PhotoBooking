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
              <td class="text-xs-left">{{ item.idFotograf }}</td>
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
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-layout>
  </v-container>
</template>

<script>
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
        if (element.idClient === this.user.id) {
          detalii.push(element);
        }
      });
      return detalii;
    },
  },
  methods: {
    getPhotographersData() {
      let x = [];
      this.$store.getters.usersDetails.filter((item) => {
        this.getBookingsForPhoto.forEach((photographer) => {
          if (photographer.idClient === item.idClient) {
            x.push(item);
          }
        });
      });
      this.data = x;
    },
  },
};
</script>
