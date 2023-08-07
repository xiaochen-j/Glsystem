<template>
	<el-card header="二维码生成">
		<el-form label-position="left" label-width="100px">
			<el-form-item label="文本">
				<el-input v-model="qrText" />
			</el-form-item>
			<el-form-item label="大小">
				<el-slider v-model="size" :min="100" :max="500" />
			</el-form-item>
			<el-form-item label="颜色">
				<el-color-picker v-model="color" />
			</el-form-item>
			<el-form-item label="二维码">
				<!-- <qrcode-vue :value="value" :size="size" :foreground="color" level="H" /> -->
				<vue-qr :callback="qrBack" :text="qrText" :size="size" :foreground="color"></vue-qr>
			</el-form-item>
		</el-form>
	</el-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
// //import qrcodeVue from './twocode.vue'
import vueQr from 'vue-qr/src/packages/vue-qr.vue'
const qrText = ref('https://maku.net')
const size = ref(200)
const color = ref('#000000')

const downQr = () => {
	let name = new Date().getTime();
	let a = document.createElement("a");
	a.style.display = "none";
	a.download = name;
	a.href = qrData.value;
	document.body.appendChild(a);
	a.click();
}
//二维码图片的编码数据
const qrData = ref("");
//qr的回调，每次变动后把二维码的数据保存下来，供下载用
const qrBack = (dataUrl, id) => {
	qrData.value = dataUrl;

}
</script>


<!-- <template>
	<el-card header="二维码生成">
		<el-form-item label="文本">
			<el-input v-model="qrText" />
		</el-form-item>
		<el-form-item label="大小">
			<el-slider v-model="size" :min="100" :max="500" />
		</el-form-item>
		<el-form-item label="颜色">
			<el-color-picker v-model="color" />
		</el-form-item>
		<el-form-item label="二维码">
			<qrcode-vue :callback="qrBack" :value="qrText" :size="size" :foreground="color" level="H" />

		</el-form-item>
	</el-card>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import qrcode from 'vue-qr/src/packages/vue-qr.vue'
const qrText = ref('https://maku.net')
const size = ref(200)
const color = ref('#000000')


const downQr = () => {
	let name = new Date().getTime();
	let a = document.createElement("a");
	a.style.display = "none";
	a.download = name;
	a.href = qrData.value;
	document.body.appendChild(a);
	a.click();
}

const qrData = ref("");
const qrBack = (dataUrl, id) => {
	qrData.value = dataUrl;

}

</script> -->
