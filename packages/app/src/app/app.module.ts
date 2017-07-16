import { NgModule } from '@angular/core';
import { UIRouterModule } from '@uirouter/angular';

import { SharedModule } from 'shared/shared.module';
import { AppComponent, APPSTATE } from './app.component';

const states = {
	states: [APPSTATE],
	otherwise: { state: APPSTATE.name }
};

@NgModule({
	imports: [SharedModule, UIRouterModule.forRoot(states)],
	declarations: [AppComponent]
})
export class AppModule {}
