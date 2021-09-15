import { Controller, Provide, Get, Query, ALL, Inject, Body, Post, Put, Del } from '@midwayjs/decorator';
import { Message } from '../interface/interface';
import { EncyclopediaService } from "../service/encyclopediaService";
import { EncyclopediaQuery, EncyclopediaAdd } from '../interface/encyclopedia';
import { Context } from 'egg';
@Provide()
@Controller('/')
export class EncyclopediaController {

    @Inject('EncyclopediaService')
    encyclopediaService: EncyclopediaService;

    @Inject()
    ctx: Context;

    @Get('/encyclopedia/query') //查询 
    async getEncyclopedia(@Query(ALL) data: EncyclopediaQuery): Promise<Message> {
        const result: any = await this.encyclopediaService.getEncyclopedia(data);
        return result;
    }

    @Post('/encyclopedia/save') //新增 
    async saveEncyclopedia(@Body(ALL) data: EncyclopediaAdd): Promise<Message> {
        const result: any = await this.encyclopediaService.saveEncyclopedia(data);
        return result;
    }

    @Put('/encyclopedia/edit') //修改 
    async editEncyclopedia(@Body(ALL) data: EncyclopediaAdd): Promise<Message> {
        const result: any = await this.encyclopediaService.editEncyclopedia(data);
        return result;
    }

    @Del('/encyclopedia/delete') //删除
    async deleteEncyclopedia(@Query(ALL) data: EncyclopediaAdd): Promise<Message> {
        const result: any = await this.encyclopediaService.deleteEncyclopedia(data);
        return result;
    }

    @Put('/encyclopedia/enable') //启用 禁用
    async startEnable(@Body(ALL) data: EncyclopediaAdd): Promise<Message> {
        const result: any = await this.encyclopediaService.startEnable(data);
        return result;
    }
}