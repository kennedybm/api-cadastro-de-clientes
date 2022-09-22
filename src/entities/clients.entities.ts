import { Entity, Column, PrimaryColumn, OneToMany, ManyToOne } from "typeorm";
import { v4 as uuid } from "uuid";
import { Contacts } from "./contacts.entities";

@Entity("Clients")
export class Clients {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50, unique: true })
  email: string;

  @Column({ length: 11, unique: true })
  mobileNumber: string;

  @Column({ type: "date" })
  registerDate: Date;

  @OneToMany(() => Contacts, (contacts) => contacts.client)
  contacts: Contacts[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
