import { Routes } from '@angular/router';
import { Home } from '../components/home/home';
import { UserHome } from '../components/user-home/user-home';
import { ErrorPage } from '../services/error-page/error-page';
import { AuthGuard } from '../services/auth-guard';
import { EventDetail } from '../components/event-detail/event-detail';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'dashboard', component: UserHome, canActivate: [AuthGuard] },
  { path: 'openEvent/:id', component: EventDetail},
  { path: '**', component: ErrorPage }
];
