
import { Unique ,Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToOne } from 'typeorm';
import { Device } from './Device';


@Entity()
export class Notification extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(type=> Device, (device: Device) => device.id)
    device!: Device

    @Column()
    occured!: string;
   
}
