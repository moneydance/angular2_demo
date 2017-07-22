import {
	UIRouter,
	Ng2StateDeclaration,
	StateObject,
	UIRouterPlugin
} from '@uirouter/angular';

export class AuthomRouter implements UIRouterPlugin {
	public name: string = 'AuthomRouter';
	public ogRegister: (x: Ng2StateDeclaration) => StateObject;

	constructor(uiRouter: UIRouter, options: any) {
		this.ogRegister = uiRouter.stateRegistry.constructor.prototype.register;
		uiRouter.stateRegistry.constructor.prototype.register = this.register;
	}

	public dispose() {
		return null;
	}

	private register(stateDefinition: Ng2StateDeclaration): StateObject {
		if (stateDefinition.data && stateDefinition.data.auth) {
			return this.ogRegister(stateDefinition);
		}
	}
}
