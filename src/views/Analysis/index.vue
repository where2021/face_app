<template>
	<div class="home">
		<div class="bg-img">
			<img src="../../assets/images02/photograph/ic_logo2.png" />
		</div>
		<div class="conetnt">
			<p class="title">
				<i class="icon"></i>
				<span>{{ title }}</span>
				<span>{{ title2 }}</span>
			</p>
			
			<!-- 头像展示部分 -->
			<div class="img-Head">
				<van-image :src="pro_img" />
			</div>
			<div class="head-icon">
				<p class="title">{{title3}}</p>
				<p class="icon"></p>
			</div>
			
			<!-- 头像图片下面动画效果部分 -->
			<div v-show="isReport">
				<div class="process-item">
					<div>测量三庭</div>
					<div>定位五官</div>
					<div>综合分析</div>
				</div>
				<div class="transtion-css">
					<img :class="[status]" src="../../assets/images/saomiao/status@2x.png" alt />
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
			
			<!-- 面向报告生成页 -->
			<div class="report" v-show="!isReport">
				<div class="report-input">
					<div class="input-content">
						<input v-show="!isName" type="text" v-model="name" placeholder="请输入您的姓名" />
						<!-- <van-button v-show="!isName" type="info" @click="handleSaveName">保存</van-button> -->
						<p v-show="isName">{{ name }}</p>
					</div>
				</div>
				<div class="receive">
					<van-button :class="{ saveName: isName }" class="btn_photo_bg" @click="handleReceiveReport">领取报告
					</van-button>
				</div>
			</div>
			<!-- <div class="photograph-btn">
				<p>HTTP://WWW.YOUNGDU.COM</p>
			</div> -->
		</div>
	</div>
</template>
<script>
	// import BaseRouterTransition from '../../components/BaseRouterTransition'
	import {
		Dialog
	} from 'vant';
	import {
		mapState
	} from 'vuex'
	import {
		img_location
	} from '../../utils/CommonFunction'

	export default {
		data() {
			return {
				title: '测测你颜值',
				title2: '属于哪一种类型?',
				title3: '智能解码中',
				isTitle: '',
				photo_img: require('../../assets/images02/photograph/photo02.png'),
				pro_img: require('../../assets/images02/photograph/touxiang.png'),
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
		components: {
			// BaseRouterTransition
		},
		computed: {
			...mapState({
				image: state => state.app.app.parmes_data,
			})
		},
		mounted() {
			this.pro_img = this.image
			this.updateStatus()
		},
		methods: {
			errorimg(e) {
				console.log(e)
			},
			// 过场 上传动画
			updateStatus() {
				setTimeout(() => {
					this.statusInfoNum = 1
					this.status = 'transtion-two'
					three()
				}, 600)
				const three = () => {
					setTimeout(() => {
						this.statusInfoNum = 2
						this.status = 'transtion-three'
						is_report()
					}, 2600)
				}
				const is_report = () => {
					setTimeout(() => {
						this.title3 = '报告生成完成，待确认身份'
						this.isReport = false
					}, 2000)
				}
			},
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
		}
	}
</script>
<style lang="scss" scoped>
	.home {
		background: url("../../assets/images02/photograph/ic_bg.jpg") no-repeat;
		background-size: 100%;
		height: 100%;
		overflow: auto;
		width: 100%;
		color: #fff;
		background-color: #001037;
	}

	.bg-img {
		z-index: 1;
		height: 6vh;
		position: relative;
		img {
			position: absolute;
			height: 3vh;
			right: 10px;
			top: 10px;
		}
	}

	.conetnt {
		z-index: 1;
		width: 95%;
		height: 92vh;
		background-color: #000018cc;
		border-radius: 30px 30px 30px 30px;
		margin: 0 auto;
		display:table;

		.title {
			color: rgba(255, 255, 255, 1);
			text-align: center;
			margin: 2vh auto;
			width: 100vw;
			display: inline-block;
			;
			.icon {
				display: inline-block;
				width: 40px;
				height: 40px;
				background: url("../../assets/images02/photograph/ic_bg3.png") no-repeat center;
				background-size: 50%;
				float: left;
				position: relative;
				bottom: 10px;
			}
			span {
				font-size: 5vw;
				line-height: 2rem;
				// position: absolute;
				margin: 0 auto;
			}
			span:nth-child(3) {
				color: #ff71c1;
			}
			span:nth-child(3) {
				color: #4eb0ff;
			}
		}

		.tip {
			font-size: 30px;
			font-weight: 400;
			line-height: 24px;
			margin: 30px 0 27px 0;
			color: #0096ff;
		}
		
		.img-Head {
			height: 20vh;
			margin: 1vh auto;
			position: relative;
			.van-image {
				height: 20vh;
			}
		}
		
		.process-item {
			margin: 1rem auto;
			// width: 360px;
			display: flex;
			justify-content: space-around;
			font-size: 1rem;
			font-weight: 40;
			line-height: 1rem;
			color: #55b9ff;
		}

		.transtion-css {
			position: relative;

			// 12vw; 37.333vw 64vw
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

		// -css
		.status-info {
			width: 60%;
			margin: 0 auto;
			margin-top: 5rem;

			p {
				text-align: left;
				height: 40px;
				line-height: 40px;
				font-size: 15px;
				font-weight: 200;
				position: relative;

				// border-bottom: 1px solid #327fe1;
				i {
					width: 20px;
					height: 20px;
					display: block;
					background: url("../../assets/images/photograph/correct.png") no-repeat;
					background-size: 100% 100%;
					float: right;
					margin-top: 10px;
				}

				.active_ {
					width: 20px;
					height: 20px;
					animation: rotatecss 1s linear infinite;
					background: url("../../assets/images/saomiao/loading.png") no-repeat;
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

	// .img-Head {
	// 	margin-bottom: 10px;
	// 	height: 12.5rem;
	// 	width: 12.5rem;
	// 	margin: 0 auto;
	// 	position: relative;

	// 	i {
	// 		display: inline-block;
	// 		background: url("../../assets/images02/photograph/photo02.png") no-repeat;
	// 		background-size: 100% 100%;
	// 		width: 80%;
	// 		height: 80%;
	// 	}

	// 	.van-image {
	// 		width: 80%;
	// 		height: 80%;
	// 		margin-top: 20px;
	// 	}

	// 	.feature {
	// 		position: absolute;
	// 		z-index: 3;
	// 		left: 50%;
	// 		top: 8%;
	// 		font-size: 1.0rem;

	// 		p {
	// 			color: #55b9ff;
	// 			height: 2.875rem;
	// 			line-height: 2.875rem;
	// 			border-bottom: 1px dashed #55b9ff;
	// 			width: 5.25rem;
	// 			text-align: right;
	// 		}

	// 		p:nth-child(1) {
	// 			border-top: 1px dashed #55b9ff;
	// 		}
	// 	}
	// }

	.head-icon {
		.title {
			font-size: 1rem;
			line-height: 1rem;
			margin-top: 0.5rem;
		}

		.icon {
			width: 2rem;
			height: 6px;
			border-radius: 7px;
			background: #007acf;
			// text-align: center;
			margin: 0 auto;
			margin-bottom: 6px;
		}
	}

	.photograph-btn {
		p {
			font-size: 1px;
			text-align: center;
			color: #71738c;
			font-weight: 400;
			margin-top: 42px;
		}
	}

	// 填写姓名
	.report {
		.img-Head {
			position: relative;
			top: 10px;

			.Head-radius {
				width: 334px;
				height: 334px;
				margin: 0 auto;
				position: relative;
				background-size: 100% 100%;
				overflow: hidden;
				border-radius: 50%;
			}

			p {
				font-size: 30px;
				line-height: 30px;
				font-weight: 400;
			}

			.van-image {
				width: 260px;
				height: 260px;
				margin-top: 37px;
				z-index: 1;
			}
		}

		.report-input {

			// margin-top: 230px;
			.input-content {
				// height: 150px;
				background: url("../../assets/images/saomiao/bg_input.png") no-repeat;
				background-size: 100% 100%;
				input {
					// background-color: rgba(0, 0, 0, 0);
					width: 40vw;
					height: 10vh;
					margin: 0 auto;
					// top: 63px;
					border: none;
					background: url("../../assets/images/saomiao/edit.png") no-repeat;
					background-size: 20% 20%;
					background-position: 0 50%;
					text-indent: 50px;
				}
				input::-webkit-input-placeholder {
					color: #fff;
					font-size: 10px;
					font-weight: 200;
				}

				.van-button {
					border-radius: 8px;
				}

				p {
					line-height: 150px;
				}
			}
		}

		.receive {

			// margin-top: 140px;
			.van-button {
				border-radius: 26px;
				// border: 2px solid rgba(62, 151, 255, 1);
				width: 80%;
				height: 50px;
				font-size: 30px;
				font-weight: 400;
				color: #fff;
			}

			.saveName {
				color: #fff;
			}

			.btn_photo_bg {
				border: none;
				border-radius: 26px;
				margin-top: 60px;
				background: url("../../assets/images02/photograph/tijiaoanniu.png") no-repeat center;
				background-size: 100%;
				color: #e6eeff;
			}
		}
	}
</style>
