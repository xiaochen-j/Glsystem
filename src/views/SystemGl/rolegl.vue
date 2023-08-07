<template>
    <div>
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
                <el-button type="primary" @click="addRole">添加角色</el-button>
            </el-form-item>
        </el-form>

        <el-table :data="list" border:true style="width: 100%">
            <el-table-column prop="roleId" label="ID" width="180" />
            <el-table-column prop="roleName" label="角色名" width="180" />
            <el-table-column prop="authority" label="操作">
                <template #default="scope">
                    <el-button link size="small" @click="changeRole(scope.row)">
                        修改权限
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { getRoleList } from '@/network/api'
import { InitData } from '@/type/role'
import type { ListInt } from '@/type/role'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'
export default defineComponent({
    setup() {
        const data = reactive(new InitData)
        //1.引入路由  2.创建路由对象  3.调用全局路由进行跳转
        const router = useRouter()
        onMounted(() => {
            getRoleList().then(res => {
                //console.log(res)
                data.list = res.data
            })
        })
        const addRole = () => {




            // 设置延迟，等待 beforeCreate 阶段结束后再进行 ElMessageBox 的操作
            // setTimeout(() => {
            //     ElMessageBox.prompt("请输入角色名称", "添加", {
            //         confirmButtonText: "确定",
            //         cancelButtonText: "取消",
            //     }).then(({ value }) => {
            //         if (value) {
            //             data.list.push({ roleId: data.list.length + 1, roleName: value, authority: [] });
            //             ElMessage({
            //                 type: "success",
            //                 message: `${value}角色添加成功`
            //             });
            //         }
            //     })
            //         .catch(() => {
            //             ElMessage({
            //                 type: "info",
            //                 message: "取消操作",
            //             });
            //         });
            // }, 1);

            ElMessageBox.prompt("请输入角色名称", "添加", {
                confirmButtonText: "确定", cancelButtonText: "取消",
            }).then(({ value }) => {//value表示你在输入中填写的值
                if (value) {//判断输入框中有值，就将对应的值添加到列表中 改变的是数组的长度
                    data.list.push({ roleId: data.list.length + 1, roleName: value, authority: [] })
                }
                ElMessage({
                    type: "success",
                    message: `${value}角色添加成功`
                });
            })
                .catch(() => {
                    ElMessage({
                        type: "info",
                        message: "取消操作",
                    });
                });
        }
        const changeRole = (row: ListInt) => {
            router.push({
                /* 路由传参  qurey传数组的话会在地址栏显示 join把数组分割变成字符串并用逗号隔开
                   直接用name  params传参会好
                   path:"authority",
                   query:{
                       id:row.roleId,
                       authority:row.authority.join(',')*/
                name: "authority",
                params: {
                    id: row.roleId,
                    authority: row.authority

                }

            })
        }
        return { ...toRefs(data), addRole, changeRole }
    }
})
</script>

<style scoped></style>