export interface ListInt {
    id: number
    nickName: string
    role: RoleInt[]
    userName: string
}
interface RoleInt {
    role: number,
    roleName: string
}
interface SelectDataInt {
    role: number,
    nickName: string
}
interface RoleListInt {
    //授权 这个单词意思authority
    authority: number[]
    roleId: number
    roleName: string
}
interface ActiveInt {
    id: number
    nickName: string
    role: number[]
    userName: string
}
export class InitData {
    selectData: SelectDataInt = {
        nickName: "",
        role: 0
    }
    list: ListInt[] = []//用来接受用户信息的列表
    roleList: RoleListInt[] = []//用来接受角色信息的列表
    //对话框刚开始不显示
    isShow = false
    //用一个对象然后把规范好的数据类型引入再进行初始化
    active: ActiveInt = {//选中的对象
        id: 0,
        nickName: "",
        role: [],
        userName: ""
    }
}