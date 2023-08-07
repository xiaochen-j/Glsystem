
<template>
    <div>

        <el-form :inline="true" :model="selectData" class="demo-form-inline">
            <el-form-item label="姓名">
                <el-input v-model="selectData.nickName" placeholder="请输入姓名" clearable />
            </el-form-item>
            <el-form-item label="角色">
                <el-select v-model="selectData.role" class="m-2" placeholder="请选择" size="large">
                    <el-option label="全部" :value="0" />
                    <el-option v-for="item in roleList" :key="item.roleId" :label="item.roleName" :value="item.roleId" />
                </el-select>

            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>

        <el-table :data="list" border:true style="width: 100%">
            <el-table-column prop="id" label="ID" width="180" />
            <el-table-column prop="nickName" label="姓名" width="180" />
            <!-- //角色是一个数组类型所以要用插槽 scope带的属性 row column  vue3中不支持type="text"了 link就是文本类型 -->
            <el-table-column prop="role" label="角色">
                <template #default="scope">
                    <el-button v-for="item in scope.row.role" :key="item.role" link size="small">
                        {{ item.roleName }}
                    </el-button>
                </template>
            </el-table-column>

            <el-table-column prop="nickName" label="手机号" width="180" />
            <el-table-column prop="nickName" label="邮箱" width="180" />
            <el-table-column prop="nickName" label="创建时间" width="180" />
            <!-- --------  @click="changeUser(scope)"------ -->
            <el-table-column prop="role" label="操作">
                <template #default="scope">
                    <el-button type="primary" link size="small" @click="changeUser(scope.row)">
                        编辑
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <!-- //对话框 -->
    <el-dialog v-model="isShow" title="编辑信息">
        <el-form :model="active">
            <el-form-item label="姓名" label-width="50px">
                <el-input v-model="active.nickName" autocomplete="off" />
            </el-form-item>
            <el-form-item label="角色" label-width="50">
                <el-select multiple v-model="active.role" placeholder="请选择">
                    <el-option v-for="item in roleList" :key="item.roleId" :label="item.roleName" :value="item.roleId" />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="updateUser">更改</el-button>
                <el-button type="primary" @click="isShow = false">
                    取消
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, watch } from 'vue'
import { getUserList, getRoleList } from '@/network/api'
import { InitData } from '@/type/user'
//因为导入分为常规导入和类型导入  因为我对ListInt进行了类型规范所以导入的时候要加type不能直接导入
import type { ListInt } from '@/type/user';
export default defineComponent({
    setup() {
        const data = reactive(new InitData())
        onMounted(() => {
            getUser()
            getRole()
        })

        const getUser = () => {
            getUserList().then((res: any) => {
                console.log(res)
                //把获取的值赋给roleList
                data.list = res.data
            })
        }

        const getRole = () => {
            getRoleList().then((res: any) => {
                console.log(res)
                //把获取的值赋给list
                data.roleList = res.data
            })
        }
        const onSubmit = () => {
            let arr: ListInt[] = []; //定义数组，用来接受查询过后要展示的数据
            if (data.selectData.nickName || data.selectData.role) {
                //判断两个是否其中一个有值
                if (data.selectData.nickName) {
                    arr = data.list.filter((value) => {
                        //将过滤出来数组赋值给arr
                        return value.nickName.indexOf(data.selectData.nickName) !== -1;
                    })
                }
                if (data.selectData.role) {
                    arr = (data.selectData.nickName ? arr : data.list).filter((value) => {
                        //将过滤出来数组赋值给arr
                        return value.role.find((item) => item.role === data.selectData.role)
                    })
                }
            } else {
                arr = data.list;
            }

            data.list = arr;

        }
        //监听输入框的两个属性
        watch([() => data.selectData.nickName, () => data.selectData.role],
            () => {
                if (data.selectData.nickName == "" || data.selectData.role == 0) {
                    getUser()
                }
            }
        )
        const changeUser = (row: ListInt) => {
            //data.active=row直接获取不行因为active与row:ListInt类型不同从新定义一下
            data.active = {
                id: row.id,
                nickName: row.nickName,
                userName: row.userName,
                //实际定义的role是一个数组然后用0和1选择管理员或普通用户
                // 然后里面有role roleName而 选择角色的时候获取一个role就可以得到role roleName
                //所以map是返回一个新的数组而新的数组里面获取的值是定义的role里的role
                //（因为博主定义的时候定义的不太好，两个role含义实际不一样）
                // 编辑信息对话框里角色渲染的是role id 但选的时候却是role 
                //这里只是个更改了页面的内容实际开发会有一个数据库的接口，更改数据库里的数据
                role: row.role.map((value: any) => value.role || value.roleId)
            }
            data.isShow = true

        }

        const updateUser = () => {
            // console.log(data.active); 
            let obj: any = data.list.find((value) => value.id == data.active.id)
            obj.nickName = data.active.nickName
            // data.active.role-->[1,2]
            // roleList-->roleId-->1,2
            obj.role = data.roleList.filter(value => data.active.role.indexOf(value.roleId) !== -1)
            console.log(obj);
            data.list.forEach((item, i) => {
                if (item.id == obj.id) {
                    data.list[i] = obj
                }
            })
            data.isShow = false
        }

        return { ...toRefs(data), onSubmit, changeUser, updateUser }
    }
})
</script>

<style scoped></style>