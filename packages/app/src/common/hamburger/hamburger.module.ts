import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HamburgerComponent } from './hamburger.component';
import {
	HamburgerItemComponent
} from './hamburger_item/hamburger_item.component';

@NgModule({
	imports: [CommonModule],
	exports: [HamburgerComponent, HamburgerItemComponent],
	declarations: [HamburgerComponent, HamburgerItemComponent]
})
export class HamburgerModule {}
