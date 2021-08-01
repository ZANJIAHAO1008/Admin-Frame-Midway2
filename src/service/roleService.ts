import { Repository, getConnection, Not,Like } from 'typeorm';
import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Message } from '../interface';
import { Role } from '../entity/roleModel';
import { success,error } from '../util/public';
import { getMethod,delMethod,postMethod } from '../util/methods';
import { UserRole } from '../entity/user_role';
@Provide('RoleService')
export class RoleService {
    @InjectEntityModel(Role)
    roleModel: Repository<Role>;
    userRoleModel: Repository<UserRole>;
    async getRole(data): Promise<Message> { //查询角色 
        const result = await getMethod({
            select: "role",
            model: [Role, "role"],
            where: {
                roleId: data.roleId ? data.roleId : Not('null'),
                roleName: data.roleName ? Like(`%${data.roleName}%`) : Not('null') ,
            }
        })
        return success(['请求成功', result])
    };

    async saveRole(data): Promise<Message> {//新增角色
        await getConnection()
            .createQueryBuilder()
            .insert()
            .into(Role)
            .values([data])
            .execute();
        return success(['新增成功', null])
    }

    async editRole(data): Promise<Message> { //修改角色
        await getConnection()
            .createQueryBuilder()
            .update(Role)
            .set(data)
            .where({ roleId: data.roleId })
            .execute();
        // await this.roleModel.save(result)
        return success(['修改成功', null])
    }

    async delRole(data): Promise<Message> { //删除角色
        await getConnection()
            .createQueryBuilder()
            .delete()
            .from(Role)
            .where({ roleId: data.roleId })
            .execute();
        return success(['删除成功', null])
    }

    async relationUser(data):Promise<Message>{
        if (data?.list) {
            const dataWare = data.list.map(v => { //遍历插入格式
                return {
                    staffId: data.staffId,
                    roleId: v
                }
            })
            await delMethod({  //删除现有role资源
                from: UserRole,
                where: { staffId: data.staffId }
            })
            await postMethod({ //插入选择的角色
                into: UserRole,
                values: dataWare
            })
            return success(['授权成功', null])
        } else {
            return error(['未分配权限，请先配置', null])
        }
    }


    async getUserRole(data):Promise<Message>{
        //查询关联角色
        const result = await getMethod({
            select: "userRole",
            model: [UserRole, "userRole"],
            where: {
                staffId: data.staffId
            }
        })
        return success(['请求成功', result])
    }
}