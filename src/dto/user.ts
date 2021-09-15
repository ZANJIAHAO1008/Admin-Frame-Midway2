import { Rule, RuleType } from "@midwayjs/decorator";
import { checkDTO } from '../util/public'

export class LoginDTO { //登陆
    //用户名必填
    @Rule(RuleType.string().required().error(errors => {
        return new Error(checkDTO({
            isWrite: true,
            value: errors[0].value,
            prop: '用户名',
        }))
    }))
    username: string;

    //密码必填
    @Rule(RuleType.string().required().error(errors => {
        return new Error(checkDTO({
            isWrite: true,
            value: errors[0].value,
            prop: '密码',
        }))
    }))
    password: string;
}

export class RegisterDTO {  //注册
    //用户名必填
    @Rule(RuleType.string().required().max(12).min(6).error(errors => {
        return new Error(checkDTO({
            isWrite: true,
            isLength: true,
            value: errors[0].value,
            prop: '用户名',
            min: 6,
            max: 12
        }))
    }))
    username: string;

    //密码必填
    @Rule(RuleType.string().required().max(12).min(6).error(errors => {
        return new Error(checkDTO({
            isWrite: true,
            isLength: true,
            value: errors[0].value,
            prop: '密码',
            min: 6,
            max: 12
        }))
    }))
    password: string;

    //密码必填
    @Rule(RuleType.string().required().max(12).min(6).error(errors => {
        return new Error(checkDTO({
            isWrite: true,
            isLength: true,
            value: errors[0].value,
            prop: '重复密码',
            min: 6,
            max: 12
        }))
    }))
    checkPass: string;

    @Rule(RuleType.string())
    sex: string;

    @Rule(RuleType.string().max(12).min(1).error(errors => {
        return new Error(checkDTO({
            isLength: true,
            value: errors[0].value,
            prop: '姓名',
            min: 1,
            max: 12
        }))
    }))
    staffName: number;
}

export class DelUserDTO { //删除用户
    //ID必填
    @Rule(RuleType.number().required().error(errors => {
        return new Error(checkDTO({
            isWrite: true,
            value: errors[0].value,
            prop: 'ID',
        }))
    }))
    id: number;
}

export class ChangePassDTO { //修改密码
    //用户ID必填
    @Rule(RuleType.string().required().error(errors => {
        return new Error(checkDTO({
            isWrite: true,
            value: errors[0].value,
            prop: '用户ID',
        }))
    }))
    staffId: string;

    @Rule(RuleType.string().required().max(12).min(6).error(errors => {
        return new Error(checkDTO({
            isWrite: true,
            isLength: true,
            value: errors[0].value,
            prop: '旧密码',
            min: 6,
            max: 12
        }))
    }))
    oldPassword: string;

    @Rule(RuleType.string().required().max(12).min(6).error(errors => {
        return new Error(checkDTO({
            isWrite: true,
            isLength: true,
            value: errors[0].value,
            prop: '新密码',
            min: 6,
            max: 12
        }))
    }))
    newPassword: string;
}


export class ChangeUserInfoDTO { //修改用户信息
    @Rule(RuleType.string().required().error(errors => {
        return new Error(checkDTO({
            isWrite: true,
            value: errors[0].value,
            prop: '用户ID',
        }))
    }))
    staffId: string;

    //用户名
    @Rule(RuleType.string().required().max(12).min(6).error(errors => {
        return new Error(checkDTO({
            isWrite: true,
            isLength: true,
            value: errors[0].value,
            prop: '用户名',
            min: 6,
            max: 12
        }))
    }))
    username: string;

    //性别
    @Rule(RuleType.string())
    sex: string;

    //姓名
    @Rule(RuleType.string().max(12).min(1).error(errors => {
        return new Error(checkDTO({
            isLength: true,
            value: errors[0].value,
            prop: '姓名',
            min: 1,
            max: 12
        }))
    }))
    staffName: number;

    //联系电话
    @Rule(RuleType.string().max(12).min(8).error(errors => {
        return new Error(checkDTO({
            isLength: true,
            value: errors[0].value,
            prop: '联系电话',
            min: 8,
            max: 11
        }))
    }))
    phone: string;

    // //地址
    // @Rule(RuleType.string())
    // address: string;

    // //出生日期
    // @Rule(RuleType.string())
    // birthDate: string;

    // //照片
    // @Rule(RuleType.string())
    // image: string;

    // //用户状态
    // @Rule(RuleType.string().max(1).min(0))
    // userState: string;

    // //备注
    // @Rule(RuleType.string())
    // marks: string;
}

