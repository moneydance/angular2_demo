import { Component } from '@angular/core';
import { Ng2StateDeclaration } from '@uirouter/angular';

@Component({
	selector: 'home',
	templateUrl: 'home.html'
})
export class HomeComponent {
	public home = 'Home';
}

export const HOME_STATE: Ng2StateDeclaration = {
	name: 'app.home',
	url: '/home',
	component: HomeComponent,
	data: {
		dashboard: {
			name: 'Home',
			order: 0
		}
	}
};
