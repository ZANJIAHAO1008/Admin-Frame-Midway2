import { EntityModel } from '@midwayjs/orm';
import { Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
@EntityModel('userinfo')
export class User {

    @PrimaryGeneratedColumn()  //自动生成主键
    id: number;

    @Column()   //员工账号
    username: string;

    @Column({
        nullable: true,  //true为字段非必填
    })   //员工名字
    staffName: string;

    @Column({
        nullable: true,  //true为字段非必填
    })  //员工工号
    staffId: string;

    @Column()  //员工密码
    password: string;

    @Column({
        nullable: true  //true为字段非必填
    })
    sex: number;

    @CreateDateColumn()  //生成时间
    createTime: Date;

    @UpdateDateColumn() //更新时间
    updateTime: Date;

    @Column("char", { length: 1 }) //展示隐藏 0隐藏 1显示
    enabled: number
}