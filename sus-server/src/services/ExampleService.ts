import { Bean } from 'express-beans';

@Bean
export default class ExampleService {
  private msg: string;

  constructor() {
    this.msg = 'hello world!';
  }

  example() {
    return this.msg;
  }
}
