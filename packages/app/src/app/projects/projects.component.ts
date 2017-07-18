import { Component } from '@angular/core';
import { AuthomStateDeclaration } from 'common/uirouter';

@Component({
	selector: 'projects',
	templateUrl: 'projects.html'
})
export class ProjectsComponent {
	public project = 'Project';
}

export const PROJECTS_STATE: AuthomStateDeclaration = {
	name: 'app.projects',
	url: '/projects',
	component: ProjectsComponent
};
