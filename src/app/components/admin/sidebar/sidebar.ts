import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
//h
@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
toggleSidebar() {
throw new Error('Method not implemented.');
}
}
