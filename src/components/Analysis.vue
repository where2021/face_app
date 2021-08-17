<template>
	<!-- 头像图片下面动画效果部分 -->
	<div class="analysis-div">
		<div class="process-item">
			<div>测量三庭</div>
			<div>定位五官</div>
			<div>综合分析</div>
		</div>
		<div class="transtion-css">
			<img :class="[status]" src="../assets/images/saomiao/status@2x.png" alt />
		</div>
		<div class="status-info">
			<p>
				{{statusInfo[statusInfoNum].up}}
				<i :class="{ 'active_': isActive.isActive1 }"></i>
			</p>
			<p>
				{{statusInfo[statusInfoNum].and}}
				<i :class="{ 'active_': isActive.isActive2 }"></i>
			</p>
			<p>
				{{statusInfo[statusInfoNum].down}}
				<i :class="{ 'active_': isActive.isActive3 }"></i>
			</p>
		</div>
	</div>
</template>
<script>
	import { mapActions, mapState } from 'vuex'
	export default {
		data() {
			return {
				isTitle: '',
				status: 'transtion-one',
				statusInfo: [{
						up: '上庭数据提取中',
						and: '中庭数据提取中',
						down: '下庭数据提取中'
					},
					{
						up: '定位眼长、眼高',
						and: '定位鼻高、鼻翼宽',
						down: '定位嘴宽、嘴唇厚度'
					},
					{
						up: '量取下颌角度',
						and: '对比各部位数据',
						down: '匹配五行格局'
					}
				],
				statusInfoNum: 0,
				isActive: {
					isActive1: false,
					isActive2: true,
					isActive3: true,
				},
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
			updateStatus() {
				setTimeout(() => {
					this.statusInfoNum = 1
					this.status = 'transtion-two'
					console.log('1111')
					three()
				}, 2600)
				const three = () => {
					setTimeout(() => {
						this.statusInfoNum = 2
						this.status = 'transtion-three'
						console.log('2222')
						is_report()
					}, 2600)
				}
				const is_report = () => {
					setTimeout(() => {
						this.title3 = '报告生成完成，待确认身份'
						this.isReport = false
						this.set_show(8)
						console.log('分析动画完毕','show_var设置为：',this.show_var)
					}, 2000)
				}
			},
			// 保存姓名
			handleSaveName(e) {
				console.log(this.name)
				this.isName = true
			},
		},
	}
</script>
<style lang="scss" scoped>
.analysis-div {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: space-around;
	height: 50vh;
	.process-item {
		width: 100%;
		margin: 1rem auto;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		font-size: 1rem;
		font-weight: 40;
		line-height: 1rem;
		color: #55b9ff;
	}
	.transtion-css {
		position: relative;
		img {
			width: 4%;
			height: 2vh;
			position: absolute;
			left: 14%;
		}
		.transtion-two {
			left: 48%;
			animation: statusCssone 0.2s linear;
		}
		@keyframes statusCssone {
			0% {
				left: 14%;
			}
	
			100% {
				left: 48%;
			}
		}
	
		.transtion-three {
			left: 82%;
			animation: statusCssthree 1.2s linear;
		}
		@keyframes statusCssthree {
			0% {
				left: 48%;
			}
	
			100% {
				left: 82%;
			}
		}
	}
	.status-info {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		height: 20vh;
		width: 70%;
		margin: 0 auto;
		margin-top: 5vh;
		p {
			text-align: left;
			height: 40px;
			line-height: 40px;
			font-size: 15px;
			font-weight: 200;
			position: relative;
			i {
				width: 20px;
				height: 20px;
				display: block;
				background: url("../assets/images/photograph/correct.png") no-repeat;
				background-size: 100% 100%;
				float: right;
				margin-top: 10px;
			}
			.active_ {
				width: 20px;
				height: 20px;
				animation: rotatecss 1s linear infinite;
				background: url("../assets/images/saomiao/loading.png") no-repeat;
				background-size: 100% 100%;
			}
			@keyframes rotatecss {
				0% {
					transform: rotate(0deg);
				}
	
				25% {
					transform: rotate(90deg);
				}
	
				50% {
					transform: rotate(180deg);
				}
	
				75% {
					transform: rotate(270deg);
				}
	
				100% {
					transform: rotate(360deg);
				}
			}
		}
		p:nth-child(3) {
			border-bottom: none;
		}
	}
}
</style>
