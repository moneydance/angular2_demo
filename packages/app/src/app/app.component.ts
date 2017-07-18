import { Inject, Component } from '@angular/core';
import { UIRouter } from '@uirouter/angular';
import { AuthomStateDeclaration } from 'common/uirouter';

@Component({
	selector: 'app',
	templateUrl: 'app.html'
})
export class AppComponent {
	public title: string = 'hey';
	public states: AuthomStateDeclaration = this.uiRouter.stateService.get();
	constructor(@Inject(UIRouter) private uiRouter: UIRouter) {
		console.log(uiRouter);
		console.log(this.states);
	}
}

export const APP_STATE: AuthomStateDeclaration = {
	name: 'app',
	url: '/app',
	component: AppComponent,
	data: {
		auth: true
	}
};
