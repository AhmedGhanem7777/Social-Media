import { Component, input, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../../../shared/components/navbar/navbar';
import { Sidebar } from '../../../shared/components/sidebar/sidebar';
import { BottomNav } from '../../../shared/components/bottom-nav/bottom-nav';

@Component({
  selector: 'app-blank-layout',
  imports: [Navbar, RouterOutlet, Sidebar, BottomNav],
  templateUrl: './blank-layout.html',
  styleUrl: './blank-layout.css',
})
export class BlankLayout {
  readonly showSidebar = input(true);
}
