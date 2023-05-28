import { ObjectId } from "typeorm";

export interface IVerifyTokenResponse {
  username: string;
  userId: ObjectId;
}
