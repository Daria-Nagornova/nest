import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import { Task } from '../../tasks/entities/task.entity';

@Entity()
export class File {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    name: string;

    @ApiProperty()
    @Column()
    path: string;

    @ManyToOne(type => Task, task => task.files)
    task: Task;
}
