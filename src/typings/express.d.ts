import { User } from "../model";

export interface UserAttributes {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      loggedUser?: UserAttributes;
    }
  }
}
