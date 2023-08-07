<template>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false" @select="handleSelect">
        <el-menu-item>

            <div class="fold_icon" @click="toggle_icon">
                <el-icon v-if="toggle_status">
                    <Fold />
                </el-icon>

                <el-icon v-else>
                    <Expand />
                </el-icon>
            </div>
        </el-menu-item>
        <div class="flex-grow" />
        <el-menu-item index="1">个人中心</el-menu-item>
        <el-sub-menu index="2">
            <template #title>我的</template>
            <el-menu-item index="2-1">注销</el-menu-item>
            <el-menu-item index="2-2">修改密码</el-menu-item>
            <el-menu-item index="2-3" @click="quit">退出登录</el-menu-item>
            <el-sub-menu index="2-4">
                <template #title>item four</template>
                <el-menu-item index="2-4-1">item one</el-menu-item>
                <el-menu-item index="2-4-2">item two</el-menu-item>
                <el-menu-item index="2-4-3">item three</el-menu-item>
            </el-sub-menu>
        </el-sub-menu>
        <!-- </el-menu-item> -->
    </el-menu>
    <!-- 头部面包屑 -->
    <div style="line-height: 40px; text-align: center; margin: 10px 0px 0px 5px;">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">菜单管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>系统工具</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>
  
<script lang="ts" setup>
import router from '@/router';
import { ref } from 'vue'

//import { defineProps, defineEmits } from 'vue'
const props = defineProps(["toggle_status"])
const emits = defineEmits(["event-toggle"])
const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
const quit = () => {
    router.push({ path: '/login' })
}
const toggle_icon = () => {
    emits("event-toggle", !props.toggle_status)

}
</script>
  
<style>
.fold_icon {
    font-size: 26px;
    text-align: center;
    line-height: 58px;
}

.flex-grow {
    flex-grow: 1;
}
</style>
  