import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DASHBOARD_MODULE_ROUTE } from './dashboard/dashboard.module';

const ROUTES:Routes = [
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
	{
		path: '',
		children: [
			DASHBOARD_MODULE_ROUTE
		]
	},
];

@NgModule({
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		RouterModule.forRoot(ROUTES, { useHash: true }),
	],
	declarations: [AppComponent],
	bootstrap: [AppComponent]
})
export class AppModule {}
