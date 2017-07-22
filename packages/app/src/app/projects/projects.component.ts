import { Component } from '@angular/core';
import { Ng2StateDeclaration } from '@uirouter/angular';

@Component({
	selector: 'projects',
	templateUrl: 'projects.html'
})
export class ProjectsComponent {
	public project = 'Project';
}

export const PROJECTS_STATE: Ng2StateDeclaration = {
	name: 'app.projects',
	url: '/projects',
	component: ProjectsComponent
};
