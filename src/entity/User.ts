import { Entity, Column, PrimaryGeneratedColumn, Generated } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    @Generated("uuid")
    userUUID: string;

    @Column()
    accessToken: string;

    @Column()
    serverId: string;
}
