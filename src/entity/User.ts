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

    // Privileges
    // MySQL fix https://github.com/typeorm/typeorm/issues/3622
    @Column({ width: 1, default: true })
    onlineChat: boolean;

    @Column({ width: 1, default: true })
    multiplayerServer: boolean;

    @Column({ width: 1, default: true })
    multiplayerRealms: boolean;
}
