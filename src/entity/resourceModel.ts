import { EntityModel } from '@midwayjs/orm';
import { Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
@EntityModel('resource')
export class Resource {

    @PrimaryGeneratedColumn()  //资源ID 
    resourceId: number;

    @Column()   //资源名称
    resourceName: string;

    @Column()    //资源URL
    resourceUrl: string;

    @Column()    //资源类型 
    resourceType: string;

    @Column({
        nullable: true,  //true为字段非必填
    })    //资源图标
    resourceIcon: string;

    @Column()    //资源排序
    resourceOrder: number;

    @Column()   //父级ID
    parentId: number;

    @Column({
        nullable: true,  //true为字段非必填
    })   //备注
    marks: string;

    @CreateDateColumn()  //生成时间
    createTime: Date;

    @UpdateDateColumn() //更新时间
    updateTime: Date;

    @Column("char", { length: 1 }) //展示隐藏 0禁用 1启用
    available: number
    
    children: any[];
}