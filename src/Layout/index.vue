<template>
    <div class="common-layout">
        <el-container class="el-container">
            <el-aside class="layout-sider" :style="{ width }">
                <div class="logo">
                    <img src="../assets/logo.png" alt="" style="height: 100%; width: 100%;">
                </div>
                <sidermenu :toggle_status="collapse" />
            </el-aside>
            <el-container class="el-container is-vertical">

                <el-header class="header">
                    <headertop @event-toggle="onChange" :toggle_status="collapse" />
                </el-header>
                <el-main class="main">
                    <!-- 设置路由出口 -->
                    <router-view></router-view>

                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script lang="ts">
import headertop from './headertop.vue';
import sidermenu from '../Layout/sidermenu.vue'
import { defineComponent } from 'vue'
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router';
//定义动态属性width
const width = ref('200px')



export default defineComponent({

    // name: 'index',
    // data() {
    //     const router = useRouter();
    //     const route = useRoute();
    //     // 通过getRouter方法返回一个数组，有list承载一下这个数组再用filter筛选一下那些需要展示出来
    //     //data()` 方法中使用 `map()` 方法将路由配置转换为菜单数据，
    //     //并添加了 `path` 属性。之后在模板中使用 `item.path` 就不会出现报错了。
    //     const list = router.getRoutes().filter((v) => v.meta.isShow && v.meta.title)
    //         .map((v) => ({ path: v.path, meta: v.meta }));

    //     return { list, active: route.path };
    // },

    components: {
        headertop,
        sidermenu
    },
    setup() {
        // 您当前的代码中，存在一个类型错误。错误消息提示没有在类型 {} 上定义属性 collapse。
        //这是因为您在 setup 函数中定义了 collapse 的引用但没有声明它的类型。
        // 为了修复这个错误，您可以在 setup 函数之前添加一个类型声明并指定 collapse 的类型为 ref<boolean>。
        // collapse 的引用但没有声明它的类型。在这里声明一下
        //初始滚动菜单状态
        let collapse = ref(false)
        let onChange = (status: boolean) => {
            collapse.value = status
            //这个循环控制的是侧边栏的状态
            if (status) {
                width.value = '63px'
            } else {
                width.value = '200px'
            }

        }
        return { collapse, onChange, width, }

    }

})

</script>
<style scoped>
.el-container.is-vertical {
    flex-direction: column;

}

.el-container {
    display: flex;
    flex-direction: row;
    flex: 1;
    flex-basis: auto;
    box-sizing: border-box;
    min-width: 0;
}

el-menu {
    border-right: 0px;
}

.header {
    height: 100px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 2);
    margin: 2px;
    /* margin: 4px 2px 0px 2px; */
    background-color: #ffffff;

}

.main {
    background-color: #ffffff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 2);
    margin: 10px;

}

.common-layout {
    height: 100%;
    display: flex;
}

.layout-sider {
    /* flex: 0 0 200px;
    max-width: 200px;
    min-width: 200px;
    width: 200px; */

    background-color: #001529;

}

.layout-sider .logo {

    height: 80px;
    background: rgba(255, 255, 255, .3);
    margin: 16px;

}
</style>