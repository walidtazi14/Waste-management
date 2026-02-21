import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './core/sidebar/sidebar';
import { Navbar } from './core/navbar/navbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Sidebar, Navbar],
  templateUrl: './app.html'
})
export class App {
  // All the old logic is gone! The layout is managed by app.html
}