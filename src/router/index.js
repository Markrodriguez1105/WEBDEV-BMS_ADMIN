/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../pages/Dashboard.vue";
import BarangayInfo from "../pages/BarangayInfo.vue";
import Business from "../pages/Business.vue";
import Household from "../pages/Household.vue";
import Resident from "../pages/Resident.vue"
import Report from "../pages/Report.vue";
import Request from "../pages/Request.vue";
import Treasury from "../pages/Treasury.vue";
import Landing from "../components/Landing.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
    },
    {
      path: '/BarangayInfo',
      name: 'Barangay Information',
      component: BarangayInfo,
    },
    {
      path: '/Household',
      name: 'Household Record',
      component: Household,
    },
    {
      path: '/Resident',
      name: 'Resident Record',
      component: Resident,
    },
    {
      path: '/Business',
      name: 'Business Record',
      component: Business,
    },
    {
      path: '/Request',
      name: 'Request Documents',
      component: Request,
    },
    {
      path: '/Report',
      name: 'Report',
      component: Report,
    },
    {
      path: '/Treasury',
      name: 'Treasury',
      component: Treasury,
    },
    {
      path: '/Landing',
      name: 'Landing',
      component: Landing,
    }
  ]
});

export default router;
