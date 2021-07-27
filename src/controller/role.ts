
import { Controller, Inject, Provide, Get } from '@midwayjs/decorator';
import { RoleService } from '../service/roleService';
// import {  } from '../interface/resource';
import { Message } from '../interface'


@Provide()
@Controller('/')
export class RoleController {
    @Inject('RoleService')
    roleService: RoleService;

    @Get('/role/getAll')//查询资源
    async getAll(): Promise<Message> {
        const result = await this.roleService.getAll();
        return result;
    }

    // @Post('/resource/save') //新增资源
    // async saveResource(@Body(ALL) data: ResourceInter): Promise<Message> {
    //     const result = await this.resourceService.saveResource(data);
    //     return result;
    // }

    // @Put('/resource/edit') //修改资源
    // async editResource(@Body(ALL) data: ResourceInter): Promise<Message> {
    //     const result = await this.resourceService.editResource(data);
    //     return result;
    // }

    // @Del('/resource/delete') //删除资源
    // async delResource(@Query(ALL) data:Object): Promise<Message> {
    //     const result = await this.resourceService.delResource(data);
    //     return result;
    // }



}