
import { Unique ,Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToOne } from 'typeorm';
import { User } from './User';
import {Notification} from './Notification'


@Entity()
@Unique(['hardware_id'])
export class Device extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    hardware_id!: string

    @Column()
    alias!: string;

    @ManyToOne(type=> User, (user: User) => user.devices,)
    user!: User;

    @OneToMany(()=> Notification, (notif: Notification) => notif)
    notifications!: Notification[]
    
}
