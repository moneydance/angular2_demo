import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HamburgerComponent } from './hamburger.component';

@NgModule({
	imports: [CommonModule],
	exports: [HamburgerComponent],
	declarations: [HamburgerComponent]
})
export class HamburgerModule {}
