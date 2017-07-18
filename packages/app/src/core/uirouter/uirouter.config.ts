import { Injector } from '@angular/core';
import { UIRouter } from '@uirouter/angular';

export function uiRouterConfig(uiRouter: UIRouter, injector: Injector) {
	uiRouter.urlMatcherFactory.strictMode(false);
	uiRouter.urlService.rules.otherwise({ state: injector.get('DEFAULT_STATE') });
}
