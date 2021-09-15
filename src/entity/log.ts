import { EntityModel } from '@midwayjs/orm';
import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
@EntityModel('log')
export class Log {
    @PrimaryGeneratedColumn()  //主键ID 
    id: number;

    @Column()
    method: string;

    @Column()
    type: string;  //日志类型 例如 登陆 注册 等..

    @Column()
    url: string;

    @Column()
    host: string;

    @CreateDateColumn()  //生成时间
    createTime: Date;
}