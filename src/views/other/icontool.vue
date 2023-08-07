<!-- <template>
    <el-card :header="`点击图标即可复制代码，已提供的图标：${iconList.length}个`">
        <el-row class="iconfont-row">
            <el-col v-for="(icon, key) in iconList" :key="key" class="iconfont-item" :xs="12" :sm="8" :md="6" :lg="4"
                :xl="2">
                <div class="iconfont-warp" @click="handleCopy(icon)">
                    <icons-vue :icon="icon" class-name="svg-size" />
                    <p>{{ icon }}</p>
                </div>
            </el-col>
        </el-row>
    </el-card>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import { getIconList } from '../other/tool'
import { ElMessage } from 'element-plus'
import svgicon from '@ant-design/icons-vue/es/icons'
const iconList = getIconList()
console.log(getIconList)
const { copy } = useClipboard()
const handleCopy = (icon: string) => {
    const svgIcon = `<icons-vue icon="${icon}"></icons-vue>`
    copy(svgIcon)
    ElMessage.success('已复制')
}
</script>

<style scoped lang="scss">
:deep(.svg-size) {
    width: 30px !important;
    height: 30px !important;
    margin-bottom: 10px;
}

.iconfont-row {
    border-top: 1px solid var(--theme-border-color-light);
    border-left: 1px solid var(--theme-border-color-light);
}

.iconfont-item {
    text-align: center;
    border-right: 1px solid var(--theme-border-color-light);
    border-bottom: 1px solid var(--theme-border-color-light);
    height: 120px;
    overflow: hidden;
    display: flex;
    transition: all 0.3s ease;
    margin: auto;
    justify-content: space-around;
    cursor: pointer;

    &:hover {
        background-color: var(--el-border-color-extra-light);
    }
}

.iconfont-warp {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
}
</style> -->

<template>
    <el-card :header="`双击图标即可复制代码，已提供的图标：${icons.length}个`">
        <el-row class="iconfont-row">
            <el-col v-for="(name, index) in icons" :index="index" :key="index" @click="currentIconName = name"
                class="iconfont-item" :xs="12" :sm="8" :md="6" :lg="4" :xl="2">
                <div class="iconfont-warp" @click="handleCopy(name)">
                    <component :is="name" style="width: 2rem;height: 2rem">
                    </component>
                    <!-- 取出图标列表里面的name属性，要想知道icons列表里面都有什么属性可以打印出来瞅两眼 conlose.log(icons)瞅两眼 -->
                    <p>{{ name }}</p>
                </div>
            </el-col>
        </el-row>
        <!-- <el-input @click="dialogVisible = true" v-model="currentIconName">
        </el-input> -->
    </el-card>
    <!-- <el-dialog v-model="dialogVisible" title="请选择图标" width="80%" :before-close="handleClose" @open="beforeOpen">
        <div style="display: flex;flex-wrap: wrap">
            <div v-for="(name, index) in icons" :index="index" :key="index" style="cursor: pointer;padding: 1rem"
                :class="currentIconName === name ? 'red' : ''" @click="currentIconName = name">
                <component :is="name" style="width: 2rem;height: 2rem">
                </component>
            </div>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="handleOk">确定</el-button>
            </span>
        </template>
    </el-dialog> -->
</template>
<script  lang="ts">
import * as ElIcons from '@element-plus/icons-vue'
import { icons } from '@element-plus/icons-vue/global';
import { reactive, ref, toRefs, watch } from "vue";
import { useClipboard } from '@vueuse/core'
import { ElMessage } from 'element-plus'
const { copy } = useClipboard()

export default {
    // 更新图标库用
    // components: {
    //     ...ElIcons
    // },
    // name: "Naruto-Icon.vue",
    // emits: ['update:iconName'],
    // props: {
    //     iconName: {
    //         type: String
    //     }
    // },
    setup(props, context) {
        //console.log(icons)

        const handleCopy = (icons: string) => {
            const iconName = `${icons}`
            copy(iconName)
            ElMessage.success('已复制')
        }
        const getData = () => {
            let icons = []
            for (const name in ElIcons) {
                icons.push(name)
            }
            return icons
        }

        const iconList = reactive({
            icons: getData(),
            dialogVisible: false,
            currentIconName: 'Aim'
        })
        watch(() => props.iconName, (val) => {
            iconList.currentIconName = val;
        })
        return {
            ...toRefs(iconList),
            handleCopy
        }
    }
}
</script>
  
<style scoped lang="scss">
:deep(.svg-size) {
    width: 30px !important;
    height: 30px !important;
    margin-bottom: 10px;
}

.iconfont-row {
    // border-top: 50px solid var(--theme-border-color-light);
    // border-left: 1px solid var(--theme-border-color-light);


}

.iconfont-item {
    border: 1px solid #f1f2f3;
    text-align: center;
    height: 120px;
    overflow: hidden;
    display: flex;
    transition: all 0.3s ease;
    margin: auto;
    //justify-content: space-around;
    justify-content: center;

    //cursor: pointer;
    &:hover {
        background-color: var(--el-border-color-extra-light);
    }
}

.iconfont-warp {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
}

.iconfont-warp p {
    text-align: center;
    line-height: 26px;
    margin: 10px 0 0 -12px;

}
</style>
