import {Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn} from 'typeorm';
import { Task } from '../../tasks/entities/task.entity'
import { Comment } from '../../comments/entities/comment.entity'
import {ApiProperty} from "@nestjs/swagger";

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user'
}

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

    @Column({type: 'enum', enum: UserRole, default: UserRole.USER})
    role: UserRole;

    @ApiProperty()
    @Column({ type: 'date', nullable: true })
    birthday: string;

    @ApiProperty()
    @CreateDateColumn()
    created_at: Date;

    @ApiProperty()
    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(type => Task, task => task.user, {eager: true})
    tasks: Task[];

    @OneToMany(type => Comment, comment => comment.user)
    comments: Comment[];
}
