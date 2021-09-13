import { GetField, PostField, DelField, PutField } from '../interface/interface';
import { getConnection } from 'typeorm';
export async function getMethod(data: GetField) {  //查询 Query Builder
    const result = await getConnection()
        .createQueryBuilder()
        .select(data?.select) // 查询的表名
        .from(data?.model?.[0], data?.model?.[1]) //（表实例，别名）
        .where(data?.where) // where 条件查询
        // .orWhere(data?.orWhere) //可选    or 条件查询
        .orderBy(data?.order?.[0], data?.order?.[1] ?? 'ASC') //可选  DESC倒序  ASC正序 
        .skip(data?.skip) //当前页
        .take(data?.limit)  //可选  分页条数
        .getMany();
    return result;
}

export async function postMethod(data: PostField) { //新增 Query Builder
    await getConnection()
        .createQueryBuilder()
        .insert()
        .into(data?.into)
        .values(data?.values)
        .execute();
}
export async function putMethod(data: PutField) { //更新 Query Builder
    await getConnection()
        .createQueryBuilder()
        .update(data?.update)
        .set(data?.set)
        .where(data?.where[0],data?.where[1])
        .execute();
}

export async function delMethod(data: DelField) { //删除 Query Builder
    await getConnection()
        .createQueryBuilder()
        .delete()
        .from(data?.from)
        .where(data?.where)
        .execute();
}