import { EntityModel } from '@midwayjs/orm';
import { Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
@EntityModel('encyclopedia')
export class Encyclopedia {
    // encyclopedia
    // pet

    @PrimaryGeneratedColumn()  //主键ID 
    id: number;

    @Column()  //百科ID
    encyclopediaId: string;

    @Column()  //宠物名字
    petName: string;

    @Column() //别名
    petAlias: string;

    @Column() //英文名
    englishName: string;

    @Column() //类别
    petCategory: string;

    @Column() //种类
    petType: string;

    @Column() //寿命
    petAge: string;

    @Column() //身高
    petHeight: string;

    @Column() //体重
    petWeight: string;

    @Column() //市场参考价
    petPrice: string;

    @Column() //宠物图片
    petImage: string;

    @Column({
        length: 1000,
    }) //基本介绍
    petIntroduction: string;

    @Column({
        length: 1000,
    }) //历史
    petHistory: string;

    @Column({
        length: 1000,
    }) //性格
    petCharacter: string;

    @Column({
        length: 1000,
    }) //饲养方法
    petRear: string;

    @CreateDateColumn()  //生成时间
    createTime: Date;

    @UpdateDateColumn() //更新时间
    updateTime: Date;

    @Column("char", { length: 1 }) //展示隐藏 0隐藏 1显示
    enabled: number

    @Column({
        nullable: true,  //true为字段非必填
    })   //备注
    marks: string;
}