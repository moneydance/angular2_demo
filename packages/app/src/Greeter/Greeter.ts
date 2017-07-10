import './HelloWorld';

/**
 * this is a simple Greeter Class
 *
 */
export class Greeter {
	/**
	 * @param greeting public string property
	 */
	constructor(public greeting: string) {
		console.log('I am constructing something its really really really cool');
	}

	/**
	 * @returns [[Greeter.greeting]]
	 */
	public greet() {
		let x = 1;
		x++;
		return this.greeting;
	}
}

const greeter = new Greeter('heyaa');
console.log(greeter.greet());
