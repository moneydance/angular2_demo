import './HelloWorld';

/**
 * this is a simple Greeter Class
 *
 */
export class Greeter {
	/**
	 * @param greeting public string property
	 */
	constructor(public greeting: string) {}

	/**
	 * @returns [[Greeter.greeting]]
	 */
	greet() {
		let x = 1;
		x++;
		return this.greeting;
	}
}

const greeter = new Greeter('heyaa');
console.log(greeter.greet());
