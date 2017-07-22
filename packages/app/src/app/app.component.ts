import { Inject, Component } from '@angular/core';
import { UIRouter, Ng2StateDeclaration } from '@uirouter/angular';

@Component({
	selector: 'app',
	templateUrl: 'app.html'
})
export class AppComponent {
	public title: string = 'hey';
	public states: Ng2StateDeclaration = this.uiRouter.stateService.get();
	constructor(@Inject(UIRouter) private uiRouter: UIRouter) {
		console.log(uiRouter);
		console.log(this.states);
	}
}

export const APP_STATE: Ng2StateDeclaration = {
	name: 'app',
	url: '/app',
	component: AppComponent,
	data: {
		auth: true
	}
};
