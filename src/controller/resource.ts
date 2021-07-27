
import { Controller, Inject, Post, Provide, Body, ALL, Get, Put, Query,Del } from '@midwayjs/decorator';
import { ResourceService } from '../service/resourceService';
import { ResourceInter } from '../interface/resource';
import { Message } from '../interface'


@Provide()
@Controller('/')
export class ResourceController {
    @Inject('ResourceService')
    resourceService: ResourceService;

    @Get('/resource/getAll')//查询资源
    async getAll(): Promise<Message> {
        const result = await this.resourceService.getAll();
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



}