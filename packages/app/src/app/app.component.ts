import { Component } from '@angular/core';
import { Ng2StateDeclaration } from '@uirouter/angular';

@Component({
	selector: 'app',
	templateUrl: 'app.html'
})
export class AppComponent {
	public title = 'Angular2 Demo';
}

export const APPSTATE: Ng2StateDeclaration = {
	name: 'app',
	url: '/app',
	component: AppComponent
};
