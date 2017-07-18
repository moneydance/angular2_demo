import { NgModule } from '@angular/core';
import { UIRouterModule } from '@uirouter/angular';

import { SharedModule } from 'core/shared.module';
import { HomeComponent, HOME_STATE } from './home.component';

const states = {
	states: [HOME_STATE]
};

@NgModule({
	imports: [SharedModule, UIRouterModule.forChild(states)],
	providers: [{ provide: 'DEFAULT_STATE', useValue: HOME_STATE.name }],
	declarations: [HomeComponent]
})
export class HomeModule {}
