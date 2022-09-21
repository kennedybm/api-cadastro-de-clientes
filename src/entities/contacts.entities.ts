import { Entity, Column, PrimaryColumn, OneToMany, ManyToOne } from "typeorm";
import { v4 as uuid } from "uuid";
import { Clients } from "./clients.entities";

@Entity("Contacts")
export class Contacts {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50, unique: true })
  email: string;

  @Column({ length: 11, unique: true })
  mobileNumber: string;

  @ManyToOne(() => Clients, (client) => client.contacts)
  client: Clients;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
