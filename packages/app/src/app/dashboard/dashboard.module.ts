import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'shared/shared.module';
import { HamburgerModule } from 'common/hamburger';
import { HOME_MODULE_ROUTE  } from './home/home.module';
import { PROJECTS_MODULE_ROUTE } from './projects/projects.module';
import { DashboardComponent } from './dashboard.component';

const ROUTES:Routes = [
	{
		path: '',
		component: DashboardComponent,
		children: [
			PROJECTS_MODULE_ROUTE,
			HOME_MODULE_ROUTE
		]
	},
];

export const DASHBOARD_MODULE_ROUTE = {
	path: '',
	loadChildren: () => DashboardModule
};

@NgModule({
	imports: [
		RouterModule.forChild(ROUTES),
		SharedModule,
		HamburgerModule,
	],
	declarations: [DashboardComponent]
})
export class DashboardModule {}
