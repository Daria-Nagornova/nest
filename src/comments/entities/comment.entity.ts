import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn} from 'typeorm';
import {User} from "../../user/entities/user.entity";
import { Task } from '../../tasks/entities/task.entity';
import {ApiProperty} from "@nestjs/swagger";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @ApiProperty()
    @Column()
    text: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(type => User, user => user.comments)
    user: User;

    @ManyToOne(type => Task, task => task.comments)
    task: Task;
}