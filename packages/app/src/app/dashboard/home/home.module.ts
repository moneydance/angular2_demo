import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'shared/shared.module';
import { HomeComponent } from './home.component';

const ROUTES:Routes = [
	{
		path: '',
		component: HomeComponent
	}
];

export const HOME_MODULE_ROUTE = {
	path: 'home',
	loadChildren: () => HomeModule
};

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(ROUTES)
	],
	declarations: [HomeComponent]
})
export class HomeModule {}
