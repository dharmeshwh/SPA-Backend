import { ObjectId } from "mongodb";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ObjectIdColumn,
  Timestamp,
  UpdateDateColumn,
} from "typeorm";

@Entity("user_profile")
export class UserProfile {
  @ObjectIdColumn()
  id: ObjectId;

  @CreateDateColumn({ name: "createdAt" })
  createdAt: Timestamp;

  @UpdateDateColumn({ name: "updatedAt" })
  updatedAt: Timestamp;

  @DeleteDateColumn({ name: "deletedAt" })
  deletedAt: Timestamp;

  @Column({
    name: "firstname",
    type: "string",
  })
  firstname: string;

  @Column({
    name: "lastname",
    type: "string",
  })
  lastname: string;

  @Column({
    name: "username",
    type: "varchar",
  })
  username: string;

  @Column({
    name: "email",
    type: "varchar",
  })
  email?: string;

  @Column({
    name: "password",
    type: "varchar",
  })
  password: string;
}
