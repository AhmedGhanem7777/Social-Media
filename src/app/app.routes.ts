import { Routes } from '@angular/router';
import { authGuard } from './core/guard/auth-guard';
import { isLoggedGuard } from './core/guard/is-logged-guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: '', loadComponent: () => import('./core/layouts/auth-layout/auth-layout').then(c => c.AuthLayout),
        children: [
            { path: 'login', canActivate: [isLoggedGuard], loadComponent: () => import('./core/auth/login/login').then(c => c.Login), title: 'Login Page' },
            { path: 'register', canActivate: [isLoggedGuard], loadComponent: () => import('./core/auth/register/register').then(c => c.Register), title: 'Register Page' },
        ]
    },
    {
        path: '', loadComponent: () => import('./core/layouts/blank-layout/blank-layout').then(c => c.BlankLayout),
        children: [
            { path: 'home', canActivate: [authGuard], loadComponent: () => import('./features/home/home').then(c => c.Home), title: 'Home Page' }
        ]
    },
    {
        path: '**', loadComponent: () => import('./shared/components/not-found/not-found').then(c => c.NotFound),
    }
];
