<template>
  <div>
    <div class="container">
      <v-img
        src="../assets/background.png"
        cover
        style="width:100vw; height: 70vh;"
      ></v-img>
      <div class="centered" style="color: var(--white);">
        <div id="columnChart" style="height: 100px;"></div>
        Choosing a photographer is a challenge for many, due to the large number
        of people who can provide such services. The
        <span style="font-weight: bold;"
          ><span style="color: var(--yellow);">PHOTO</span>Booking</span
        >
        application aims to simplify this process, by choosing the most suitable
        artists, according to the client's selection criteria.

        <p style="font-size: small;font-weight: 200;">
          This app is created using Vue, Vuetify, Firebase and GitHub.
        </p>
      </div>
    </div>
    <v-container align-content-center class="authors">
      <v-flex xs2 sm2 md2 xl2 lg2 ma-3>
        <v-img src="https://avatars0.githubusercontent.com/u/28501996"></v-img>
        <strong>Gheorghe Madalina Eleonora</strong>
      </v-flex>
      <v-flex xs2 sm2 md2 xl2 lg2 ma-3>
        <v-img src="https://avatars0.githubusercontent.com/u/36141252"></v-img>
        <strong>Stalinescu Adrian</strong>
      </v-flex>
      <v-flex xs2 sm2 md2 xl2 lg2 ma-3>
        <v-img src="https://avatars0.githubusercontent.com/u/16782460"></v-img>
        <strong>Jora Stefan Danut</strong>
      </v-flex>
      <v-flex xs2 sm2 md2 xl2 lg2 ma-3>
        <v-img src="https://avatars0.githubusercontent.com/u/30498113"></v-img>
        <strong
          >Badea Narcisa
          <div style="font-size: small;font-weight: 200;">
            (our redesign helper)
          </div></strong
        >
      </v-flex>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({}),
  computed: {
    arrayOfPortofolios(){
      return this.$store.getters.arrayPortofolios
    },
    numarPozeCategorii() {
      let tags = {};
      this.arrayOfPortofolios.forEach((item) => {
        tags[item.tag] = (tags[item.tag] || 0) + 1;
      });
      return tags;
    },
  },
  methods: {
    drawChart() {
       var chart1 = this.numarPozeCategorii["botez"];
    var chart2 = this.numarPozeCategorii["nunta"];
    var chart3 = this.numarPozeCategorii["produse"];
    var chart4 = this.numarPozeCategorii["evenimente"];
    var chart5 = this.numarPozeCategorii["locatie"];

    var data = window.google.visualization.arrayToDataTable([
      ["Type", "", { role: 'style' }],
      ["Baby showers", chart1, '#ffd53d'],
      ["Wedding", chart2, '#40b0df'],
      ["Products", chart3, '#0067b3'],
      ["Events", chart4, '#0000a3'],
      ["Locations", chart5, 'rgba(17, 23, 29, 0.6)'],
    ]);

    var chart = new window.google.visualization.ColumnChart(
      document.getElementById('columnChart'));

    chart.draw(data, {legend: { position: "none" }});
    }
  },
  mounted() {
    window.google.charts.load('current', {packages: ['corechart', 'bar']});
window.google.charts.setOnLoadCallback(this.drawChart);
  },
};
</script>

<style scoped>
.container {
  position: relative;
  text-align: center;
  padding: 0;
}
.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  line-height: 2.2rem;
  font-size: larger;
  transform: translate(-50%, -50%);
}
.authors {
  display: flex;
  flex-flow: wrap;
}
@media (min-width: 960px) {
  .container {
    max-width: unset;
  }
}
.authors {
  justify-content: space-evenly;
}
.authors strong {
  color: var(--blue-grotto);
  font-size: small;
}
.authors img {
  filter: grayscale(1);
}
.authors:hover {
  filter: none;
}
</style>
