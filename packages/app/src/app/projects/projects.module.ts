import { NgModule } from '@angular/core';
import { UIRouterModule } from '@uirouter/angular';

import { SharedModule } from 'core/shared.module';
import { ProjectsComponent, PROJECTS_STATE } from './projects.component';

const states = {
	states: [PROJECTS_STATE]
};

@NgModule({
	imports: [SharedModule, UIRouterModule.forChild(states)],
	declarations: [ProjectsComponent]
})
export class ProjectsModule {}
