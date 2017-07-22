import { Provider, Injector } from '@angular/core';
import { LocationStrategy } from '@angular/common';
import {
	uiRouterFactory as ogUIRouterFactory,
	UIRouter,
	StateObject,
	Ng2StateDeclaration,
	RootModule,
	StatesModule,
	UIROUTER_ROOT_MODULE,
	UIROUTER_MODULE_TOKEN
} from '@uirouter/angular';

export function uiRouterOverride(
	locationStrategy: LocationStrategy,
	rootModules: RootModule[],
	modules: StatesModule[],
	injector: Injector
) {
	const uiRouter = ogUIRouterFactory(
		locationStrategy,
		rootModules,
		modules,
		injector
	);
	const ogRegister = uiRouter.stateRegistry.constructor.prototype.register;
	uiRouter.stateRegistry.constructor.prototype.register = register;
	uiRouter.stateRegistry.decorator('data', registerStuff);
	console.log(uiRouter.stateRegistry);
	return uiRouter;

	function registerStuff(state: StateObject): any {
		console.log(state);
		state.data = state.self.data = { stuff: true };
		return state.data;
	}

	function register(stateDefinition: Ng2StateDeclaration): StateObject {
		console.log(stateDefinition);
		if (stateDefinition.data.auth) {
			return ogRegister(stateDefinition);
		}
	}
}

export const UIROUTER_INSTANCE: Provider = {
	provide: UIRouter,
	useFactory: uiRouterOverride,
	deps: [
		LocationStrategy,
		UIROUTER_ROOT_MODULE,
		UIROUTER_MODULE_TOKEN,
		Injector
	]
};
