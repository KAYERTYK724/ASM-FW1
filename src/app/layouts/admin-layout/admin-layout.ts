import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { AdminHeader } from "../../components/admin/admin-header/admin-header";
import { Sidebar } from '../../components/admin/sidebar/sidebar';
import { Dashboard } from '../../pages/admin/dashboard/dashboard';
// import { Header } from "../../components/client/header/header";

@Component({
  selector: 'app-admin-layout',
  imports: [Sidebar, RouterOutlet, AdminHeader],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.scss',
})
export class AdminLayout {}
