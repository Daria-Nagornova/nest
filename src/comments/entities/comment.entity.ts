import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import {User} from "../../user/entities/user.entity";
import { Task } from '../../tasks/entities/task.entity'
import {ApiProperty} from "@nestjs/swagger";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @ApiProperty()
    @Column()
    text: string;

    @ManyToOne(type => User, user => user.comments)
    user: User;

    @ManyToOne(type => Task, task => task.comments)
    task: Task;
}