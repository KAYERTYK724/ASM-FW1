import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { Footer } from '../../components/client/footer/footer';
import { Header } from '../../components/client/header/header';

@Component({
  selector: 'app-client-layout',
  imports: [RouterOutlet, Footer, Header],
  templateUrl: './client-layout.html',
  styleUrl: './client-layout.scss',
})
export class ClientLayout {}
