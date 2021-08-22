<template>
	<!-- 照片注意事项提示 -->
	<div class="tips">
		<div>
			<p class="title">满足以下要求，结果更准确</p>
		</div>
		<div class="need">
			<div class="item">正面</div>
			<div class="item">五官清晰</div>
			<div class="item">不戴眼镜</div>
			<div class="item">面部呈现完整</div>
			<div class="item">无刘海遮挡</div>
		</div>
	</div>
</template>
<script>
	import { mapActions, mapState } from 'vuex'
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
					alert({
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
.tips {
	.title {
		font-size: 5vw;
		line-height: 5vw;
		margin: 1vh auto;
		color: #0096ff;
		display: inline-block;
	}
	.need {
		width: 100%;
		height: 30vh;
		margin: 1vh auto;
		display:flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		color: #fff;
		.item {
			height: 1.875rem;
			line-height: 1.875rem;
			background: url("../assets/images/photograph/juxing.png") no-repeat center;
			background-size: 45% 100%;
			font-size: 3vw;
			width: 100%;
		}
	}
}
</style>
