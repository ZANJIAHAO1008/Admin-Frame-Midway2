import { EntityModel } from '@midwayjs/orm';
import { Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
@EntityModel('resource_role')
export class ResourceRole {

    @PrimaryGeneratedColumn()  //主键ID 
    id: number;

    @Column()  //用户ID
    roleId: number;

    @Column()  //资源ID 
    resourceId: number;

    @CreateDateColumn()  //生成时间
    createTime: Date;

    @UpdateDateColumn() //更新时间
    updateTime: Date;

    
}