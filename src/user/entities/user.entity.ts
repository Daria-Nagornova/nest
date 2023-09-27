import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Task } from '../../tasks/entities/task.entity'
import { Comment } from '../../comments/entities/comment.entity'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({
        unique: true
    })
    email: string

    @Column()
    password: string

    @Column({ type: 'date' })
    birthday: string;

    @OneToMany(type => Task, task => task.user, {eager: true})
    tasks: Task[];

    @OneToMany(type => Comment, comment => comment.user)
    comments: Comment[];
}
