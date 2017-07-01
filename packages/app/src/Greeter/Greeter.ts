/**
 * this is a simple Greeter Class
 *
 */
export class Greeter {
  /**
   * @param greeting public string property
   */
  constructor(public greeting: string) { }

  /**
   * @returns [[Greeter.greeting]]
   */
  greet() {
    return this.greeting;
  }
};

var greeter = new Greeter("sup sup sup");
console.log(greeter.greet());
