import { NgModule } from '@angular/core';
import { UIRouterModule } from '@uirouter/angular';

import { CoreModule } from 'core/core.module';
import { ProjectsComponent, PROJECTS_STATE } from './projects.component';

const states = {
	states: [PROJECTS_STATE]
};

@NgModule({
	imports: [CoreModule, UIRouterModule.forChild(states)],
	declarations: [ProjectsComponent]
})
export class ProjectsModule {}
