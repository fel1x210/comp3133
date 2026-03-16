export class Customer {
    private firstName: string;
    private lastName: string;
    private _age: number;

    constructor(firstName: string, lastName: string, Age: number) {
        this.firstName = firstName;
        this.lastName = lastName;
        this._age = Age;
    }

    public greeter() {
        console.log(`Hello ${this.firstName} ${this.lastName}!`);
    }

    public GetAge() {
        console.log(`Age: ${this._age}`);
    }
}