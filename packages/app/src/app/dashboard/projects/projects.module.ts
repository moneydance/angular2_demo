import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'shared/shared.module';
import { ProjectsComponent } from './projects.component';

const ROUTES: Routes = [
	{
		path: '',
		component: ProjectsComponent
	}
];

export const PROJECTS_MODULE_ROUTE = {
	path: 'projects',
	loadChildren: () => ProjectsModule
};

@NgModule({
	imports: [
		SharedModule,
 	   	RouterModule.forChild(ROUTES)
	],
	declarations: [ProjectsComponent]
})
export class ProjectsModule {}
