import { Repository, Like, Not, getConnection } from 'typeorm';
import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Message } from '../interface/interface';
import { Resource } from '../entity/resourceModel';
import { ResourceRole } from '../entity/resource_role';
import { error, success } from '../util/public';
import { getMethod, postMethod, delMethod } from '../util/methods'
@Provide('ResourceService')
export class ResourceService {
    @InjectEntityModel(Resource)
    resourceModel: Repository<Resource>;
    resourceRoleModel: Repository<ResourceRole>;
    async getResource(data): Promise<Message> { //查询全部
        let result = await this.resourceModel.find({
            where: {
                resourceName: data.resourceName ? Like(`%${data.resourceName}%`) : Not('null'),
            },
            order: {
                resourceOrder: 'ASC'
            }
        });
        result = result.map(v => { //过滤children
            v.children = [];
            result.forEach((child) => {
                if (v.resourceId == child.parentId) {
                    v.children.push(child)
                }
            })
            return Object.assign({ ...v }, {})
        })

        result = result.filter(v => v.parentId === 0); //过滤最顶级的菜单



        return success(['请求成功', result])
    };

    async saveResource(data): Promise<Message> { //新增资源
        const fieldWare = ['resourceName', 'resourceUrl', 'resourceType', 'resourceOrder', 'parentId', 'resourceIcon'];
        let resource = new Resource();
        fieldWare.forEach(v => {
            resource[v] = data[v];
        })
        resource.available = 1;
        await this.resourceModel.save(resource)
        return success(['新增成功', null])
    };

    async editResource(data): Promise<Message> { //修改资源
        const fieldWare = ['resourceName', 'resourceUrl', 'resourceType', 'resourceOrder', 'parentId', 'resourceIcon'];
        let result = await this.resourceModel.findOne({
            where: {
                resourceId: data.resourceId
            }
        });
        fieldWare.forEach(v => {
            result[v] = data[v];
        })
        result.available = 1;
        await this.resourceModel.save(result)
        return success(['修改成功', null])
    }

    async delResource(data): Promise<Message> { //删除资源
        let result = await this.resourceModel.findOne({
            where: {
                resourceId: data.resourceId
            }
        });

        let queryChild = await this.resourceModel.find({
            where: {
                parentId: result.resourceId,
            }
        });

        if (queryChild.length) {
            return error(['存在子资源，无法删除', null])
        } else {
            await this.resourceModel.remove(result)
            return success(['删除成功', null])
        }
    }

    async roleRelation(data): Promise<Message> { //关联角色资源
        if (data?.list) {
            const dataWare = data.list.map(v => { //遍历插入格式
                return {
                    roleId: data.roleId,
                    resourceId: v.resourceId
                }
            })
            await delMethod({  //删除现有role资源
                from: ResourceRole,
                where: { roleId: data.roleId }
            })
            await postMethod({ //插入选择的资源
                into: ResourceRole,
                values: dataWare
            })
            return success(['授权成功', null])
        } else {
            return error(['未添加资源', null])
        }
    }

    async getRoleRelation(data): Promise<Message> {//查询关联角色资源
        const result = await getMethod({
            select: "resourceRole",
            model: [ResourceRole, "resourceRole"],
            where: {
                roleId: data.roleId
            }
        })
        return success(['查询成功', result])
    }

    async getUserRoleResourceIds(data): Promise<any> {//查询用户角色关联的资源ID集合
        let roleIds = []; //拿出角色的ID集合
        //拿出资源ID的集合 并且去重转为Array
        let resourceIds = [];
        if (data.length) {
            roleIds = data.map(v => v.roleId);
            let resourceList = await getConnection()
                .createQueryBuilder()
                .select('resourceRole')
                .from(ResourceRole, "resourceRole")
                .where("resourceRole.roleId IN (:...roleId)", { roleId: [...roleIds] })
                .getMany();
            resourceIds = Array.from(new Set(resourceList.map(v => v.resourceId)));
        }


        return resourceIds; //返回去重的
    }

    async getUserRoleResource(data): Promise<any> {//查询用户角色关联的资源ID
        let result = [];
        if (data?.length) {
            result = await getConnection()
                .createQueryBuilder()
                .select('resource')
                .from(Resource, "resource")
                .where("resource.resourceId IN (:...resourceId)", { resourceId: [...data] }).orderBy({
                    "resource.resourceOrder": "ASC",
                })
                .getMany();

            let delIds = [];
            result = result.map((v) => {  //过滤children
                v.children = [];
                result.forEach((child, index) => {
                    if (v.resourceId == child.parentId) {
                        v.children.push(child)
                        delIds.push(child.resourceId)
                    }
                })
                return Object.assign({ ...v }, {})
            })
            delIds.forEach(v => {
                result.forEach((r, i) => {
                    if (v == r.resourceId) {
                        result.splice(i, 1)
                    }
                })
            })
        }

        return result;
    }
}