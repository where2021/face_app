<template>
	<!-- 面向报告生成页 -->
	<div class="report">
		<div class="input-content">
			<input v-show="!isName" type="text" v-model="name" placeholder="请输入您的姓名" />
			<!-- <van-button v-show="!isName" type="info" @click="handleSaveName">保存</van-button> -->
			<p v-show="isName">{{ name }}</p>
		</div>
		<van-button :class="{ saveName: isName }" class="btn_photo_bg" @click="handleReceiveReport">领取报告
		</van-button>
	</div>
</template>
<script>
	import { mapActions, mapState } from 'vuex'
	import {Dialog} from 'vant';
	export default {
		data() {
			return {
				isReport: true,
				isName: false,
				name: ''
			}
		},
		computed: {
			...mapState({
				show_var: state => state.app.show_var
			})
		},
		methods: {
			...mapActions([
				'set_app',
				'set_show'
			]),
			// 过场 上传动画
			
			// 保存姓名
			handleSaveName(e) {
				console.log(this.name)
				this.isName = true
			},
			handleReceiveReport() {
				if (this.name === '') {
					console.log(this.name)
					Dialog.alert({
						message: '请输入姓名后领取报告!'
					}).then(() => {
						// on close
					});
				} else {
					console.log(this.name)
					this.$router.push({
						name: 'facereport'
					})
				}
			
			}
		},
	}
</script>
<style lang="scss" scoped>
.report {
	.input-content {
		background: url("../assets/images/saomiao/bg_input.png") no-repeat;
		background-size: 100% 100%;
		input {
			width: 40vw;
			height: 10vh;
			margin: 0 auto;
			border: none;
			background: url("../assets/images/saomiao/edit.png") no-repeat;
			background-size: 20% 20%;
			background-position: 0 50%;
			text-indent: 50px;
		}
		input::-webkit-input-placeholder {
			color: #fff;
			font-size: 10px;
			font-weight: 200;
		}
	}
	.saveName {
		color: #fff;
	}
	.btn_photo_bg {
		width: 50vw;
		height: 25vw;
		font-size: 5vw;
		border: none;
		margin-top: 6px;
		background: url("../assets/images02/photograph/tijiaoanniu.png") no-repeat center;
		background-size: 100%;
		color: #e6eeff;
	}
}
</style>
