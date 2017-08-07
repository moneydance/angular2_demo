import {
	Component,
   	HostListener,
   	HostBinding,
	ContentChildren,
	QueryList,
} from '@angular/core';

import {
	HamburgerItemComponent,
	Position
} from './hamburger_item/hamburger_item.component';

@Component({
	selector: 'bp-hamburger',
	templateUrl: 'hamburger.html',
	styleUrls: ['hamburger.scss']
})
export class HamburgerComponent {
	public active: boolean = false;
	@ContentChildren(HamburgerItemComponent)
	private items: QueryList<HamburgerItemComponent>;

	private onClick(event) {
		this.active = !this.active;
		if (this.active) {
			this.items.forEach((item: HamburgerItemComponent, idx: number) => {
				const position: Position = { x: 100, y: 0, z: 0 };
				item.position = position;
			});
		} else {
			this.items.forEach((item: HamburgerItemComponent, idx: number) => {
				item.resetPosition();
			});
		}
	}
}
