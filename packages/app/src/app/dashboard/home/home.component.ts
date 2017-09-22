import { Component } from '@angular/core';
import { Ng2StateDeclaration } from '@uirouter/angular';

@Component({
	selector: 'home',
	styleUrls: ['home.scss'],
	templateUrl: 'home.html',
})
export class HomeComponent {
	public home = 'Home';
}
