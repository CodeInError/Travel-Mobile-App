import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: "dashboard",
    loadComponent: () => import("../app/page/dashboard/dashboard.component").then((mod) => mod.DashboardComponent),
    data: {
            headerSideBar: true,
            pageTitle: "Dashboard",
          },
  },
  {
    path: "user-registration",
    loadComponent: () => import("../app/page/user-registration-sara-sansar/user-registration-sara-sansar.component").then((mod) => mod.UserRegistrationSaraSansarComponent),
    data: {
            headerSideBar: true,
            pageTitle: "Dashboard",
          },
  },
  {
    path: 'search-place-table',
    loadComponent: () => import('./page/search-place-table/search-place-table.page').then( m => m.SearchPlaceTablePage)
  }
];
