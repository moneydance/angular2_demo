import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { UIView } from '@uirouter/angular';

import { AppModule } from './app/app.module';
import { CoreModule } from './core/core.module';

@NgModule({
	imports: [BrowserModule, CoreModule, AppModule],
	bootstrap: [UIView]
})
export class RootModule {}
