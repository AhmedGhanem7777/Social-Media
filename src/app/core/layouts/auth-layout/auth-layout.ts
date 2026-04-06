import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Navbar } from '../../../shared/components/navbar/navbar';
import { RouterOutlet } from "@angular/router";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-auth-layout',
  imports: [Navbar, RouterOutlet],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.css',
})
export class AuthLayout implements OnInit {
  private readonly cookieService = inject(CookieService);
  ngOnInit() {
    this.cookieService.set('isLogin', 'false');
  }
}