<template>
    <div class="login-container">
        <div class="login-left">
            <h1>欢迎来到小晨业务管理系统</h1>
            <div class="leftdiv">
                一个简单的业务管理系统,旨在简约,通俗易上手~
            </div>
            <div class="login-bg"><img src="../assets/login.png" alt=""></div>
        </div>
        <div class="login-form">
            <!-- :rules="loginRules" -->
            <el-form ref="loginFormRef" :model="loginForm" @keyup.enter="onLogin">
                <div class="login-title">登录</div>
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" :prefix-icon="User" :placeholder="121"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password" :prefix-icon="Lock" show-password :placeholder="454"></el-input>
                </el-form-item>
                <!-- 验证码 -->
                <el-form-item prop="captcha" class="login-captcha">
                    <el-input v-model="loginForm.captcha" :placeholder="565"></el-input>
                    <img src="../assets/bg.jpg" />
                </el-form-item>
                <!-- 登录按钮 -->
                <el-form-item class="login-button">
                    <el-button type="primary" @click="onLogin()">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { User, Lock, Key } from '@element-plus/icons-vue'
//import store from '@/store'
import { useRouter } from 'vue-router'
//import { useI18n } from 'vue-i18n'

const router = useRouter()
//const { t } = useI18n()
const loginFormRef: any = ref(null)

const loginForm = ref({
    username: 'admin',
    password: 'admin',
    captcha: 'UMTA8'
})

// const loginRules = ref({
// 	username: [{ required: true, message: t('required'), trigger: 'blur' }],
// 	password: [{ required: true, message: t('required'), trigger: 'blur' }],
// 	captcha: [{ required: true, message: t('required'), trigger: 'blur' }]
// })

const onLogin = () => {
    loginFormRef.value.validate((valid: boolean) => {
        if (!valid) {
            return false
        }
        router.push({ path: '/shouye' })

        // 用户登录
        // store.userStore.loginAction(loginForm).then(() => {
        // 	router.push({ path: '/home' })
        // })
    })
}
</script>

<style lang="scss" scoped>
.login-container {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 100vh;
    background-image: url(../assets/bg.jpg);
}

.login-left {
    display: flex;
    flex-direction: column;
    width: 520px;
    flex: 0 1 auto;
}

.login-left h1 {
    // color: var(--el-color-primary);
    color: #ffffff;
    font-size: 24px;
}

.login-left .leftdiv {
    color: rgb(113, 115, 112);
    line-height: 32px;
    padding: 15px 0;
    font-size: 20px;
}

.login-bg img {
    width: 520px;
}

.login-form {
    background-color: #fff;
    flex: 0 1 auto;
    padding: 40px;
    border-radius: 6px;
    box-shadow: 1px 1px 8px #aaa6a6;
    box-sizing: border-box;

    :deep(.el-input) {
        height: 45px;
        margin-top: 5px;

        .el-input__inner {
            padding: 10px 15px 10px 5px;
            height: 45px;
            line-height: 45px;
            color: #666;
            font-size: 16px;
        }
    }
}

.login-title {
    display: flex;
    justify-content: center;
    margin-bottom: 35px;
    font-size: 24px;
    color: #444;
    letter-spacing: 4px;
}

.login-captcha {
    :deep(.el-input) {
        width: 200px;
    }
}

.login-captcha img {
    width: 150px;
    height: 40px;
    margin: 5px 0 0 10px;
    cursor: pointer;
}

.login-button {
    :deep(.el-button--primary) {
        margin-top: 10px;
        width: 100%;
        height: 45px;
        font-size: 18px;
        letter-spacing: 8px;
    }
}

@media only screen and (max-width: 992px) {
    .login-intro {
        display: none;
    }
}

@media only screen and (max-width: 768px) {
    .login-container {
        background: #fff;
    }

    .login-left {
        display: none;
    }

    .login-form {
        flex: 0 1 auto;
        border-radius: 0;
        box-shadow: none;
    }

    .login-captcha {
        :deep(.el-input) {
            width: 150px;
        }
    }
}
</style>

  