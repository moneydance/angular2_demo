import { NgModule } from '@angular/core';
import { UIRouterModule } from '@uirouter/angular';

import { CoreModule } from 'core/core.module';
import { HamburgerModule } from 'common/hamburger';

import { HomeModule } from './home/home.module';
import { ProjectsModule } from './projects/projects.module';
import { AppComponent, APP_STATE } from './app.component';

const states = {
	states: [APP_STATE]
};

@NgModule({
	imports: [
		UIRouterModule.forChild(states),
		CoreModule,
		HamburgerModule,
		HomeModule,
		ProjectsModule
	],
	declarations: [AppComponent]
})
export class AppModule {}
