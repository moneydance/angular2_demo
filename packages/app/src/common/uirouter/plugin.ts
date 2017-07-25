import { UIRouterPlugin } from '@uirouter/angular';

export class AuthomRouter implements UIRouterPlugin {
	public name: string = 'AuthomRouter';

	public dispose() {
		return null;
	}
}
