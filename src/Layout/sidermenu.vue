<template>
    <el-menu :collapse="toggle_status" active-text-color="#ffd04b" background-color="#001529" class="el-menu-vertical-demo"
        default-active="active" text-color="#fff" @open="handleOpen" @close="handleClose" router>

        <el-menu-item index="0" @click="$router.push('/shouye')" style="font-size: 18px;">首页</el-menu-item>
        <el-sub-menu index="1">
            <template #title>
                <el-icon>
                    <Setting />
                </el-icon>
                <span>系统管理</span>
            </template>
            <el-menu-item index="1-1" @click="$router.push('/menu')">菜单管理</el-menu-item>
            <el-menu-item index="1-2" @click="$router.push('/user')">用户管理</el-menu-item>
            <el-menu-item index="1-3">机构管理</el-menu-item>
            <el-menu-item index="1-4" @click="$router.push('/role')">角色管理</el-menu-item>
            <el-menu-item index="1-5">岗位管理</el-menu-item>

            <!-- 
            <el-menu-item :index="item.path" v-for="item of list" :key="item.path">
                <span>{{ item.meta.title }}</span>
            </el-menu-item> -->
            <!-- <el-sub-menu index="1-4">
                <template #title>item four</template>
                <el-menu-item index="1-4-1">item one</el-menu-item>
            </el-sub-menu> -->
        </el-sub-menu>

        <el-sub-menu index="2">
            <template #title>
                <el-icon>
                    <Histogram />
                </el-icon>
                <span>图表</span>
            </template>
            <el-menu-item index="2-1">面积图</el-menu-item>
            <el-menu-item index="2-2">柱状图</el-menu-item>
            <el-menu-item index="2-3">折线图</el-menu-item>
        </el-sub-menu>
        <!-- disabled 控制菜单是否可点 -->
        <el-sub-menu index="3">
            <template #title>
                <el-icon>
                    <Tools />
                </el-icon>
                <span>系统工具</span>
            </template>
            <el-menu-item index="3-1">页面打印</el-menu-item>
            <el-menu-item index="3-2">数据导出</el-menu-item>
            <el-menu-item index="3-3">图片裁剪</el-menu-item>
            <el-menu-item index="3-4">文本复制</el-menu-item>
            <el-menu-item index="3-5">表单构建</el-menu-item>

        </el-sub-menu>

        <el-sub-menu index="4">
            <template #title>
                <el-icon>
                    <Tools />
                </el-icon>
                <span>其他</span>
            </template>
            <el-menu-item index="4-1" @click="$router.push('/icon')">icon图标</el-menu-item>
            <el-menu-item index="4-2" @click="$router.push('/code')">二维码生成</el-menu-item>
            <el-menu-item index="4-3">图片裁剪</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="5">
            <el-icon>
                <Menu />
            </el-icon>
            <span>多级菜单</span>
        </el-menu-item>
    </el-menu>
</template>

<script lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { defineProps } from 'vue'
const props = defineProps(["toggle_status"])

import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
} from '@element-plus/icons-vue'
import { defineComponent, ref } from 'vue'
export default defineComponent({

    name: 'sidemenu',
    data() {
        const router = useRouter();
        const route = useRoute();
        // 通过getRouter方法返回一个数组，有list承载一下这个数组再用filter筛选一下那些需要展示出来
        //data()` 方法中使用 `map()` 方法将路由配置转换为菜单数据，
        //并添加了 `path` 属性。之后在模板中使用 `item.path` 就不会出现报错了。
        const list = router.getRoutes().filter((v) => v.meta.isShow && v.meta.title)
            .map((v) => ({ path: v.path, meta: v.meta }));
        const delToken = () => {
            localStorage.removeItem('token');
            router.push('/login');
        };
        return { list, active: route.path, delToken };
    },

    props: {
        toggle_status: {
            type: Boolean,
            required: true
        }
    },
    setup() {
        let collapse = ref(true)

        const handleOpen = (key: string, keyPath: string[]) => {
            console.log(key, keyPath)
        }
        const handleClose = (key: string, keyPath: string[]) => {
            console.log(key, keyPath)
        }
        const changeside = () => {
        }

        return { collapse, handleClose, handleOpen, changeside }
    }
})

</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}

el-menu {
    border-right: 0px;
}
</style>