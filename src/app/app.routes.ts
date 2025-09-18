import { Routes } from '@angular/router';
import { LegalNotice } from './shared/legal-notice/legal-notice';
import { PrivacyPolicy } from './shared/privacy-policy/privacy-policy';
import { DashboardWrapper } from './dashboard-wrapper/dashboard-wrapper';

export const routes: Routes = [
    { path: '', component: DashboardWrapper }, // Hauptseite = WeatherDashboard, DashboardWrapper als Transporter
    { path: 'legalNotice', component: LegalNotice },
    { path: 'privacyPolicy', component: PrivacyPolicy }
];
