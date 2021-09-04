
import { Controller, Inject, Post, Provide, Body, ALL, Get, Put, Query,Del } from '@midwayjs/decorator';
import { ResourceService } from '../service/resourceService';
import { ResourceInter,RoleRelation,RoleRelationId } from '../commonInterface/resource';
import { Message } from '../interface'


@Provide()
@Controller('/')
export class ResourceController {
    @Inject('ResourceService')
    resourceService: ResourceService;

    @Get('/resource/getResource')//查询资源
    async getResource(@Query(ALL) data:Object): Promise<Message> {
        const result = await this.resourceService.getResource(data);
        return result;
    }

    @Post('/resource/save') //新增资源
    async saveResource(@Body(ALL) data: ResourceInter): Promise<Message> {
        const result = await this.resourceService.saveResource(data);
        return result;
    }

    @Put('/resource/edit') //修改资源
    async editResource(@Body(ALL) data: ResourceInter): Promise<Message> {
        const result = await this.resourceService.editResource(data);
        return result;
    }

    @Del('/resource/delete') //删除资源
    async delResource(@Query(ALL) data:Object): Promise<Message> {
        const result = await this.resourceService.delResource(data);
        return result;
    }

    @Post('/resource/relation') //角色关联资源
    async roleRelation(@Body(ALL) data: RoleRelation): Promise<Message> {
        const result = await this.resourceService.roleRelation(data);
        return result;
    }

    @Get('/resource/getRoleRelation')//查询资源
    async getRoleRelation(@Query(ALL) data:RoleRelationId): Promise<Message> {
        const result = await this.resourceService.getRoleRelation(data);
        return result;
    }


}