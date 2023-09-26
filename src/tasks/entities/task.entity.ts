import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from 'typeorm';
import { User } from '../../user/entities/user.entity'
import {Comment} from "../../comments/entities/comment.entity";


export enum TaskStatus {
    COMPLETED = "completed",
    IN_PROGRESS = "in_progress",
    CANCELED = "canceled",
}

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    text: string;

    @Column({ type: 'date' })
    deadline: string;

    @Column({
        type: "enum",
        enum: TaskStatus,
        default: TaskStatus.IN_PROGRESS,
    })
    status: TaskStatus

    @ManyToOne(type => User, user => user.tasks)
    user: User;

    @OneToMany(type => Comment, comment => comment.task, {eager: true})
    comments: Comment[];
}