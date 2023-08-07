//import type { LoginDate } from "@/type/login";
import service from "./request";

interface LoginDate{
    account:string,
    password:string
}

export function login(data:LoginDate){
    return service({
        url:"/login",
        method:"post",
        data:{
            "mode"    : "login",
            "account" : "admin",
            "password":"123456"
        }
    })
}
//商品列表接口
export function getGoodsList(){
return service({
    url:"/getGoodsList",
    method:"get"
})

}
//用户列表接口
export function getUserList(){
    return service({
        url:"/getUserList",
        method:"get"
    })
    
    }
//角色列表接口
export function getRoleList(){
        return service({
        url:"/getRoleList",
        method:"get"
    })
        
    }
//权限列表接口
export function getAuthorityList(){
    return service({
    url:"/getAuthorityList",
    method:"get"
})
    
}