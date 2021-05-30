import Vue from "vue";
import Router from "vue-router";
import App from "@/App";
import Home from "@/components/Home";
import Test from "@/components/Test";
import CereriAcceptDecline from "@/components/Fotograf/CereriAcceptDecline";
import ProfilFotograf from "@/components/Fotograf/ProfilFotograf";
import ProfilClient from "@/components/Client/ProfilClient";
import CereriTrimise from "@/components/Client/CereriTrimise";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "App",
      component: App,
      redirect: "Home",
    },
    {
      path: "/Home",
      name: "Home",
      component: Home,
    },
    {
      path: "/CereriAcceptDecline",
      name: "CereriAcceptDecline",
      component: CereriAcceptDecline,
    },
    {
      path: "/ProfilFotograf",
      name: "ProfilFotograf",
      component: ProfilFotograf,
    },
    {
      path: "/ProfilClient",
      name: "ProfilClient",
      component: ProfilClient,
    },
    {
      path: "/CereriTrimise",
      name: "CereriTrimise",
      component: CereriTrimise,
    },
    {
      path: "/Test",
      name: "Test",
      component: Test,
    },
  ],
});
