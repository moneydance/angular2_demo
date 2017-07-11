import './HelloWorld';

/**
 * this is a simple Greeter Class
 *
 */
export class Greeter {
	/**
	 * @param greeting public string property
	 */
	constructor(public greeting: string, public num: number) {
		const x = {
			greeting: 'hey',
			user: {
				hometown: 'wayne, Pa',
				job: 'programmer',
				name: 'ben',
				school: 'boston university'
			}
		};
	}

	/**
	 * @returns [[Greeter.greeting]]
	 */
	public greet() {
		return this.greeting;
	}
}

const greeter = new Greeter('hey there', 1);
console.log(greeter.greet());
