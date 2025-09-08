import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity({ schema: "blog", name: "users" })
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 50 })
    name!: string;

    @Column({ unique: true })
    email!: string;

    @Column({ unique: true, nullable: true })
    workEmail!: string;

    @Column()
    password!: string;

    @Column({ default: true })
    isActive!: boolean;

    @CreateDateColumn({ name: "created_at" })
    createAt!: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt!: Date;
}
