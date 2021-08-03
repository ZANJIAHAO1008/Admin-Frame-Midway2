import { EntityModel } from '@midwayjs/orm';
import { Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
@EntityModel('role')
export class Role {

    @PrimaryGeneratedColumn()  //角色ID 
    roleId: string;

    @Column()   //角色名称
    roleName: string;

    @Column()   //是否为默认角色  0否 1默认
    grant: string;

    @Column({
        nullable: true,  //true为字段非必填
    })   //备注
    marks: string;

    @CreateDateColumn()  //生成时间
    createTime: Date;

    @UpdateDateColumn() //更新时间
    updateTime: Date;
}