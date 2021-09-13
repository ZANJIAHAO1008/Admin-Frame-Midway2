export interface EncyclopediaQuery {  //查询
    petName: string | null; //宠物名称
    encyclopediaId: string | null; // 百科ID
    petCategory: string | null; //宠物类别 例如 狗 / 猫
    petType: string | null; // 宠物种类例如家犬 猎犬
    page?:number | string; //分页页数
    pageSize?:number | string;//分页条数
}

export interface EncyclopediaAdd {  //新增 和 修改
    encyclopediaId?:string;//百科ID
    petName: string | null; //宠物名称
    petAlias: string | null; //别名
    englishName: string | null; //英文名
    petCategory: string | null; //类别
    petType: string | null; //种类
    petAge: string | null; // 寿命
    petHeight: string | null; //身高
    petWeight: string | null; //体重
    petPrice: string | null; //市场参考价
    petImage: string | null; //宠物图片
    petIntroduction: string | null; //基本介绍
    petHistory: string | null; //历史
    petCharacter: string | null; //性格
    petRear: string | null; //饲养方法
    marks: string | null; //备注
    enabled?:number;
}