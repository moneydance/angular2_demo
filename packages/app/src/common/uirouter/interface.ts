import { Ng2StateDeclaration } from '@uirouter/angular';

export interface AuthomStateDeclaration extends Ng2StateDeclaration {
	data?: {
		dashboard?: {order:number, name:string};
		auth?: boolean;
	};
}
