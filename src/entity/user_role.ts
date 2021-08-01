import { EntityModel } from '@midwayjs/orm';
import { Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
@EntityModel('user_role')
export class UserRole {
    @PrimaryGeneratedColumn()  //主键ID 
    id: number;

    @Column()  //用户ID
    staffId: string;

    @Column()  //角色ID 
    roleId: number;

    @CreateDateColumn()  //生成时间
    createTime: Date;

    @UpdateDateColumn() //更新时间
    updateTime: Date;
}