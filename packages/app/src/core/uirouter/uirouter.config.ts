import { Injector, Provider } from '@angular/core';
import { uiRouterFactory, UIRouter,
   	StateObject, StateDeclaration,
	LocationStrategy, RootModule,
   	StatesModule,

} from '@uirouter/angular';

export function uiRouterConfig(uiRouter: UIRouter, injector: Injector) {
	uiRouter.urlMatcherFactory.strictMode(false);
	uiRouter.urlService.rules.otherwise({ state: injector.get('DEFAULT_STATE') });
}

function authomeUIRouterFactory(locationStrategy: LocationStrategy, rootModules: RootModule[], modules: StatesModule[], injector: Injector) {
	const uiRouter = uiRouterFactory(locationStrategy, rootModules, modules, injector);
	const register = this.uiRouter.stateRegistry.constructor
		.prototype.register;
	uiRouter.stateRegistry.constructor.prototype.register = this.register;
	uiRouter.stateRegistry.decorator('data', this.registerButts);
	console.log(uiRouter.stateRegistry);
	return uiRouter;

	function registerButts(state: StateObject): any {
		console.log(state);
		state.data = state.self.data = { butts: true };
		return state.data;
	}

	function register(stateDefinition: StateDeclaration): StateObject {
		console.log(stateDefinition);
		if (stateDefinition.data.auth) {
			return register(stateDefinitionstateDefinition);
		}
	};
}

export const AUTHOM_UIROUTER_INSTANCE: Provider = {
	provide: UIRouter, useFactory: authomUIRouterFactory,
	deps: [
		LocationStrategy, UIROUTER_ROOT_MODULE,
 	   	UIROUTER_MODULE_TOKEN, Injector]
  }
];

