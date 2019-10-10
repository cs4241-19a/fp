import {Pact} from './pact.model';
import {Log} from './log.model';

export class User {
  // tslint:disable-next-line: variable-name
  _id?: string;
  username?: string;
  email?: string;
  role?: string;
  avatarUrl?: string;
  pact?: Pact;
  logs?: Array<Log>;
  fitbit?: Object;
  stats?: {
    starting_weight?: number;
    goal_weight?: number;
    weight_unit: string;
    date_joined: string;
    date_of_birth: string;
    occupation: string;
  };
  preferences?:{
    emails?: boolean;
    notifications?: boolean;
  };
  notifications: Array<Object>;
  calendar: Array<Object>;
  badges: Array<Object>
}
