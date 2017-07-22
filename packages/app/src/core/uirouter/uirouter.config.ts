import { Injector } from '@angular/core';
import { UIRouter } from '@uirouter/angular';
import { AuthomRouter } from 'common/uirouter';

export function uiRouterConfig(uiRouter: UIRouter, injector: Injector) {
	uiRouter.plugin(AuthomRouter);
	uiRouter.urlMatcherFactory.strictMode(false);
	uiRouter.urlService.rules.otherwise({
		state: injector.get('DEFAULT_STATE')
	});
}
