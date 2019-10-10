import {User} from './user.model';

export class Pact {
  // tslint:disable-next-line: variable-name
  _id?: string;
  name?: string;
  private?: boolean;
  owner?: string;
  password?: string;
  users: Array<User>;
  date_created: any;
  weigh_date: any;
  board: {
    exercises: Array<Object>;
    recipes: Array<Object>;
  };
}
