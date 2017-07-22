import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { UIView, UIRouterModule } from '@uirouter/angular';

import {
	uiRouterConfig /*AUTHOM_UIROUTER_INSTANCE*/
} from 'core/uirouter/uirouter.config';
import { AppModule } from 'app/app.module';
import { CoreModule } from 'core/core.module';

@NgModule({
	imports: [
		UIRouterModule.forRoot({ config: uiRouterConfig }),
		BrowserModule,
		CoreModule.forRoot(),
		AppModule
	],
	bootstrap: [UIView]
})
export class RootModule {}
