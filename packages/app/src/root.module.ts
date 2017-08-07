import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { UIView, UIRouterModule } from '@uirouter/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
	uiRouterConfig /*AUTHOM_UIROUTER_INSTANCE*/
} from 'core/uirouter/uirouter.config';
import { AppModule } from 'app/app.module';
import { CoreModule } from 'core/core.module';

@NgModule({
	imports: [
		UIRouterModule.forRoot({ config: uiRouterConfig, useHash: true }),
		BrowserModule,
		BrowserAnimationsModule,
		CoreModule.forRoot(),
		AppModule
	],
	bootstrap: [UIView]
})
export class RootModule {}
