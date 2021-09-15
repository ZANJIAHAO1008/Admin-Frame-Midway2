import { Repository, Not, Like } from 'typeorm';
import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Message } from '../interface/interface';
import { Encyclopedia } from '../entity/encyclopedia';
import { success } from '../util/public';
import { getMethod, postMethod, putMethod, delMethod } from '../util/methods';
@Provide('EncyclopediaService')
export class EncyclopediaService {

    @InjectEntityModel(Encyclopedia)

    encyclopediaModel: Repository<EncyclopediaService>;

    async getEncyclopedia(data): Promise<Message> {
        //查询百科
        //需要展示的字段
        const model = ['encyclopediaId', 'petName', 'petAlias', 'englishName', 'petCategory', 'petType', 'petAge', 'petHeight', 'petWeight', 'petPrice', 'petImage', 'petIntroduction', 'petHistory', 'petCharacter', 'petRear', 'marks', 'enabled'];

        let select: string[] = model.map(v => {
            return 'encyclopedia.' + v;
        }); //拼接ncyclopedia. 数据库查询字段

        const queryLength: Array<any> = await getMethod({
            select: select,
            model: [Encyclopedia, "encyclopedia"],
            where: {
                petName: data.petName ? Like(`%${data.petName}%`) : Not('null'),
                encyclopediaId: data?.encyclopediaId || Not('null'),
                petCategory: data?.petCategory || Not('null'),
                petType: data?.petType || Not('null'),
                // enabled: 1
            },
            // orWhere: {
            //     petAlias: data.petName ? Like(`%${data.petName}%`) : Not('null'),

            // },
            order: ['encyclopediaId', 'ASC'],
        });

        const result: Array<any> = await getMethod({
            select: select,
            model: [Encyclopedia, "encyclopedia"],
            where: {
                petName: data.petName ? Like(`%${data.petName}%`) : Not('null'),
                encyclopediaId: data?.encyclopediaId || Not('null'),
                petCategory: data?.petCategory || Not('null'),
                petType: data?.petType || Not('null'),
                // enabled: 1
            },
            // orWhere: {
            //     petAlias: data.petName ? Like(`%${data.petName}%`) : Not('null'),

            // },
            order: ['encyclopediaId', 'ASC'],
            skip: data?.page ? (data.page == 1 ? 0 : (data.pageSize * data.page) - data.pageSize) : 0,
            limit: data?.pageSize ?? 10
        });

        return success(['查询成功', {
            list: result,
            total: queryLength.length,
            page: data?.page ? +data?.page : 1,
            pageSize: data?.pageSize ? +data?.pageSize : 10,
        }])
    };

    async saveEncyclopedia(data): Promise<Message> {
        //新增
        let dataWare: Object = {
            encyclopediaId: Date.now().toString(),//生成百科id
            ...data,
            enabled: 1
        };
        await postMethod({ //插入选择的角色
            into: Encyclopedia,
            values: dataWare,
        })
        return success(['新增成功', null])
    }

    async editEncyclopedia(data): Promise<Message> {
        //修改
        await putMethod({
            update: Encyclopedia,
            set: data,
            where: ["encyclopediaId = :encyclopediaId", { encyclopediaId: data?.encyclopediaId }]
        })
        return success(['修改成功', null])
    }

    async deleteEncyclopedia(data): Promise<Message> {
        //删除
        const result: any = await delMethod({
            from: Encyclopedia,
            where: { encyclopediaId: data.encyclopediaId }
        })
        return success(['删除成功', result])
    }

    async startEnable(data): Promise<Message> { //启用 禁用
        const message = [
            '禁用成功',
            '启用成功'
        ];
        await putMethod({
            update: Encyclopedia,
            set: data,
            where: ["encyclopediaId = :encyclopediaId", { encyclopediaId: data?.encyclopediaId }]
        });
        return success([message[data.enabled], null])
    }
}