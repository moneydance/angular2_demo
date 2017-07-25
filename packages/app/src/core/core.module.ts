import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/*
 * App service providers go here.
 */
@NgModule({
	imports: [CommonModule, FormsModule],
	exports: [CommonModule, FormsModule]
})
export class CoreModule {
	public static forRoot() {
		return {
			ngModule: CoreModule,
			providers: []
		};
	}
}
