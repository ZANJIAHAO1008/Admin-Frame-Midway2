
export interface ResourceInter {  //资源
  resourceName: string;
  resourceUrl: string;
  resourceType: string;
  resourceOrder: number;
  parentId: number,
}

export interface RoleRelation {  //资源角色关联
  roleId: number;
  list: Array<Object>
}

export interface RoleRelationId {  //资源角色关联查询
  roleId: number;
}

