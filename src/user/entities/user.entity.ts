import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Task } from '../../tasks/entities/task.entity'
import { Comment } from '../../comments/entities/comment.entity'
import {ApiProperty} from "@nestjs/swagger";

@Entity()
export class User {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    firstName: string;

    @ApiProperty()
    @Column()
    lastName: string;

    @ApiProperty()
    @Column({
        unique: true
    })
    email: string

    @ApiProperty()
    @Column()
    password: string

    @ApiProperty()
    @Column({ type: 'date' })
    birthday: string;

    @OneToMany(type => Task, task => task.user, {eager: true})
    tasks: Task[];

    @OneToMany(type => Comment, comment => comment.user)
    comments: Comment[];
}
