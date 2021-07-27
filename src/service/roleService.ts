import { Repository } from 'typeorm';
import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Message } from '../interface';
import { Role } from '../entity/roleModel';
import { success } from '../util/public';
@Provide('RoleService')
export class RoleService {
    @InjectEntityModel(Role)
    roleModel: Repository<Role>;

    async getAll(): Promise<Message> { //查询全部
        let result = await this.roleModel.find();
        return success(['请求成功', result])
    };

    // async saveResource(data): Promise<Message> { //新增资源
    //     const fieldWare = ['resourceName', 'resourceUrl', 'resourceType', 'resourceOrder', 'parentId', 'resourceIcon'];
    //     let resource = new Resource();
    //     fieldWare.forEach(v => {
    //         resource[v] = data[v];
    //     })
    //     resource.available = 1;
    //     await this.resourceModel.save(resource)
    //     return success(['新增成功', null])
    // };

    // async editResource(data): Promise<Message> { //修改资源
    //     const fieldWare = ['resourceName', 'resourceUrl', 'resourceType', 'resourceOrder', 'parentId', 'resourceIcon'];
    //     let result = await this.resourceModel.findOne({
    //         where: {
    //             resourceId: data.resourceId
    //         }
    //     });
    //     fieldWare.forEach(v => {
    //         result[v] = data[v];
    //     })
    //     result.available = 1;
    //     await this.resourceModel.save(result)
    //     return success(['修改成功', null])
    // }

    // async delResource(data): Promise<Message> { //删除资源
    //     let result = await this.resourceModel.findOne({
    //         where: {
    //             resourceId: data.resourceId
    //         }
    //     });
    //     await this.resourceModel.remove(result)
    //     return success(['删除成功', null])
    // }
}