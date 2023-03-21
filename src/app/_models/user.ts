import {Claim} from "./claim";
import {Profile} from "./profile";

export class User {
  ci: Number;
  id: String = "";
  userName: String = "";
  email: String = "";
  emailConfirmed: boolean = false;
  password: String = "";
  phoneNumberConfirmed: boolean = false;
  mobileNumberConfirmed: boolean = false;
  nationalId?: number;
  accessFailedCount?: number;
  createdAt?: Date;
  changedOn?: Date;
  profile?: Profile;
  claims: Array<Claim> = [];

  constructor(ci: Number, userName: String = "", email: String = "") {
    this.ci = ci;
    this.userName = userName;
    this.email = email;
  }
}
