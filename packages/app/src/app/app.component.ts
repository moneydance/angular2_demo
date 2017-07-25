import { Component } from '@angular/core';
import { Ng2StateDeclaration } from '@uirouter/angular';

@Component({
	selector: 'app',
	templateUrl: 'app.html',
	styleUrls: ['app.scss']
})
export class AppComponent {
	public states: any[] = [
		{ name: 'Home', state: 'app.home' },
		{ name: 'Projects', state: 'app.projects' }
	];
}

export const APP_STATE: Ng2StateDeclaration = {
	name: 'app',
	url: '/app',
	component: AppComponent
};
