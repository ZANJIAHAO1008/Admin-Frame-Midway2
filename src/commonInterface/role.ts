
export interface addRole {  //角色
    roleName: string;
    grant: number;
    marks:string;
}

export interface saveRole {  //修改角色
    roleName: string;
    grant: number;
    marks:string;
    roleId:number
}

export interface delRole {  //删除角色
    roleId:number
}

export interface queryRole {  //查询角色
    staffId:string
}

export interface relationInter {  //关联用户
    staffId:string,
    list:Array<string>
}