import { Column, Entity, Generated, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column({ unique: true })
    @Generated("uuid")
    userUUID: string;

    @Column()
    clientToken: string;

    @Column()
    accessToken: string;

    @Column()
    serverId: string;

    @Column()
    skinUrl: string;

    @Column()
    capeUrl: string;

    // Privileges
    // MySQL fix https://github.com/typeorm/typeorm/issues/3622
    @Column({ width: 1, default: true })
    onlineChat: boolean;

    @Column({ width: 1, default: true })
    multiplayerServer: boolean;

    @Column({ width: 1, default: true })
    multiplayerRealms: boolean;

    @Column({ width: 1, default: true })
    telemetry: boolean;
}
