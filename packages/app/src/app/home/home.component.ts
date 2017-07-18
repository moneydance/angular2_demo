import { Component } from '@angular/core';
import { AuthomStateDeclaration } from 'common/uirouter';

@Component({
	selector: 'home',
	templateUrl: 'home.html'
})
export class HomeComponent {
	public home = 'Home';
}

export const HOME_STATE: AuthomStateDeclaration = {
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
