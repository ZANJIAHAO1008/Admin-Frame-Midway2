import { GetField, PostField, DelField, PutField } from '../interface';
import { getConnection } from 'typeorm';
export async function getMethod(data: GetField) {  //查询 Query Builder
    const result = await getConnection()
        .createQueryBuilder()
        .select(data?.select)
        .from(data?.model?.[0], data?.model?.[1])
        .where(data?.where)
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
        .where(data?.where)
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