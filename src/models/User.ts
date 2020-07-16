import { Unique ,Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToOne } from 'typeorm';
import { Device } from './Device';
import { Notification } from './Notification';


@Entity()
@Unique(['username', 'email'])
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    firstname!: string;
    @Column()
    lastname!: string;

    @Column()
    password!: string;
    @Column()
    username!: string;
    @Column()
    email!: string;

    @OneToMany(()=> Device, (device: Device) => device.user)
    devices!: Device[]
    
}
