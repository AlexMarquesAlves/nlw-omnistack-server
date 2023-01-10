import { Person } from "@/person";

it("should sum", () => {
  const person = new Person();
  const sayHello = "Hello, World!";
  expect(person.sayHello()).toBe(sayHello);
});
