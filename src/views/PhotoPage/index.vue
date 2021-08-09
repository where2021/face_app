<template>
	<div class="home">
		<div class="bg-img">
			<img height="5rem" src="../../assets/images02/photograph/ic_logo2.png" />
		</div>
		<div class="conetnt">
			<p class="title">
				<i class="icon"></i>
				<span>{{ title }}</span>
				<span>{{ title2 }}</span>
			</p>
			<div class="img-Head">
				<van-image width="50%" height="50%" radius="0" :src="photo_img" />
			</div>
			<div class="head-icon">
				<p class="title">{{ isTitle }}</p>
				<p class="icon"></p>
			</div>
			<div>
				<p class="title tip" v-show="isConfirm">满足以下要求，结果更准确</p>
				<div class="need" v-show="isConfirm">
				</div>
			</div>
			<div class="need" v-show="isConfirm">
				<div class="item">正面</div>
				<div class="item">五官清晰</div>
				<div class="item">不戴眼镜</div>
				<div class="item">面部呈现完整</div>
				<div class="item">无刘海遮挡</div>
			</div>
			<div>
				<div class="need-confirm" v-show="!isConfirm">
					<div class="need-confirm-content">
						<p>
							头部姿势：
							<span>正面</span>
							<img :src="tip_img.correct" alt />
						</p>
						<p>
							左眼状态：
							<span>睁眼，未戴眼镜</span>
							<img :src="tip_img.correct" alt />
						</p>
						<p>
							右眼状态：
							<span>睁眼，未戴眼镜</span>
							<img :src="tip_img.correct" alt />
						</p>
					</div>
				</div>
			</div>
			<div class="photograph-btn" v-show="isConfirm">
				<van-uploader enctype="multipart/form-data" accept="image/*" class="button" :after-read="afterRead">
					<van-button class="button-div btn_photo_bg" id="btn_photo" type="primary">
						<van-icon color="#84FF00" size="4vw" name="photograph" />拍照/上传照片
					</van-button>
				</van-uploader>
				<!-- <p>HTTP://WWW.YOUNGDU.COM</p> -->
			</div>

			<div>
				<div class="bottom_btn" v-show="!isConfirm">
					<div class="button button-conf">
						<van-button class="button-div btn_photo_bg btn_photo_color" @click="handleBtnAgain"
							type="primary">重新上传</van-button>
						<van-button class="button-div button-cancel btn_photo_bg" @click="handleBtnConfirm">确认上传
						</van-button>
					</div>
					<p>HTTP://WWW.YOUNGDU.COM</p>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	// import BaseRouterTransition from '../../components/BaseRouterTransition'
	import axios from 'axios'
	import request from '../../utils/request'
	import comm_fun from '../../utils/CommonFunction'
	// var COS = require('cos-js-sdk-v5')
	import {
		imgCosupload,
		ImgUrlBeauty
	} from '../../api/app.js'
	import {
		mapActions,
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				title: '测测你颜值',
				title2: '属于哪一种类型?',
				isTitle: '',
				photo_img: require('../../assets/images02/photograph/touxiang.png'),
				isConfirm: true,
				tip_img: {
					correct: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADkAAAA4CAMAAABwmqASAAAAk1BMVEUAAAADxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwWPcL6XAAAAMHRSTlMA8QX6o03dzunlJh8QCPbWsZQ3KgvtvbacfnJqXllBPjMWx4tvY0guHfOpgnlmU7/6TN/xAAABlUlEQVRIx53W15qCMBQE4NARCypYsGJbuzvv/3T7yeKaclaS/PdDAswJMDtZ3y7X3XmxVXAYApFNsPAATMxznQmepsbBdopKYRo8tvDrYBhcOagFZsF1Dy+lWfCMP4nRa3TwdjIIJjE4Hf3gJgRvox10xxC0tZNTiIa6wQMkS81g2YOk0Gx5CJnmZPtQOK5OcAHCl85gOSD4GskxCKNBc/AOVbzXuM0TsdepVmv76kbph9NlogCyiK5sEAbihZQOXLrk8+/LR/AVkh05SLeqnQ/+UnJfZ+S5lqKSfqjdnBp5nxigIXj0ITvn3lrqUu2hVywj8Bav/UOwV6dvAFFYL7oF76rOUAzZnSiB2vACqlb1toVb6BMVz3wPsrm85Danfxcm6qLiXYb/HsxBS+nKGm9O8uF0k9oS59w+vM9nzsMRh5csKy2JQLuwJrkPSpqzZjeozhnTsfRg++lZO4BUOl2l2OLIZdoSvhS9jDG76N7wD22E2lgvoP74jE7M1MqrTxVzwTP6zWzMAO/IrAywY3Zcv6noP1SEq/OgNc3TAAAAAElFTkSuQmCC',
					warning: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAAM1BMVEUAAAD7ZAD6ZAD7ZAD9YwD7ZAD8ZAD5YQD7ZAD7ZAD7ZAD6ZAD7ZAD7ZAD8ZAD7ZAD7ZADc5bCPAAAAEHRSTlMA6gzDN5dwGNC0ot6BWCRIgBgKRwAAAQpJREFUOMu9lNt2hCAMRUmUi4BO/v9rOx2HniG6CH1o91v0cMkWcf8KeyLPk9kkT9JcOsuLPJNd5c3qbFILJzu7yw+72R0hTFaPVT6o42yUjmhrA3lC2xLCYutbMJ8/h5na+KXF0MelzYZVCg+06bDUsTY6Sxrq851dbpW/19Z49OV6q60Rvssgje2afUgDnrGS4tQGHRvqorNBAKnBEpQ2UoeNP2uKd9rQ/4FK6VOvZH/3Cw4HNumoMaIH6IM2A+hLYpKgrYeee96hp9PH+vmKs3G5F6pe8X5vFdpU5zAEDjzUCzJdJ8HegMc3Vb1kUeDe0GRHMg05+QX4m2wWNDgCJ9cXmaD4w/0dXyVhOsjXZsVVAAAAAElFTkSuQmCC',
				},
				file: null
			}
		},
		components: {
			// BaseRouterTransition
		},
		computed: {
			...mapState({
				parmes_url: state => state.app.save_url
			})
		},
		methods: {
			...mapActions([
				'set_app'
			]),
			afterRead(file) {
				// 此时可以自行将文件上传至服务器
				// alert(JSON.stringify(file))
				// console.log(file.content)
				// console.log(Object.keys(file))
				// 在这里应该调用上传接口  做一些用户操作提示性的tip
				console.log(file)
				this.set_app({
				  parmes_data: file.content,
				})
				console.log(this.$store.state.app.app.parmes_data)
				this.file = file
				this.ConfirmUpload(file)
			},
			ConfirmUpload(file) {
				// console.log(file)
				this.photo_img = file.content
				this.isTitle = '确认照片'
				this.isConfirm = false
			},
			// 确认 上传
			handleBtnConfirm() {
				console.log('上传')
				let params = new FormData();
				params.append("fileUpload", this.file.file);
				const instance = axios.create({
				  baseURL: '/api',
				  timeout: 1000,
				  headers: {'Content-Type': 'multipart/form-data'}
				});
				instance.post(`/upload`, params
				).then((res) => {
					console.log(res.data.content);
					this.$router.push({
						name: 'analysisnew'
					})
				}).catch((res) => {
					alert("错误：" + res);
					this.$router.push({
						name: 'analysisnew'
					})
				});
			},
			// 重新上传
			handleBtnAgain() {
				this.isConfirm = true
				this.photo_img =
					'http://m3d-storage-dev-1251693531.cos.ap-shanghai.myqcloud.com/h5/ai/beauty/images/touxiang.png'
			}
		}
	}
</script>
<style lang="scss" scoped>
	.home {
		background: url("../../assets/images02/photograph/ic_bg.jpg") no-repeat;
		background-size: 100%;
		height: 100%;
		width: 100%;
		color: #fff;
		background-color: #001037;
		overflow: auto !important;
	}

	.bg-img {
		z-index: 1;
		padding: 20px;
		margin: 0px 0px;
		text-align: right;
		img {
			height: 20px;
		}
	}
	.conetnt {
		z-index: 1;
		width: 95%;
		height: 100%;
		background-color: #000018cc;
		border-radius: 30px 30px 30px 30px;
		margin: 0 auto;
		display:table;
		.title {
			color: rgba(255, 255, 255, 1);
			text-align: center;
			margin-bottom: 1rem;
			margin-top:1rem;
			display: inline-block;
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
				font-size: 1.5rem;
				line-height: 2rem;
			}
			span:nth-child(3) {
				color: #ff71c1;
			}
			span:nth-child(3) {
				color: #4eb0ff;
			}
		}
		.tip {
			font-size: large;
			font-weight: 40;
			line-height: 24px;
			margin: 10px 0 10px 0;
			color: #0096ff;
			display: inline-block;
		}
		.need {
			width: 100%;
			margin: 10px auto;
			display: inline-block;
			.item {
				height: 1.875rem;
				line-height: 1.875rem;
				background: url("../../assets/images/photograph/juxing.png") no-repeat center;
				background-size: 45% 100%;
				margin-bottom: 20px;
				font-size: 14px;
				font-weight: 400;
				margin: 8px auto;
			}
			.item:nth-child(1) {
				width: 100%;
			}
			.item:nth-child(2) {
				width: 100%;
			}
			.item:nth-child(3) {
				width: 100%;
			}

			.item:nth-child(4) {
				width: 100%;
			}
			.item:nth-child(5) {
				width: 100%;
			}
		}
		.need-confirm {
			width: 100%;
			height: 100% !important;
			// background: url("../../assets/images/photograph/confirmjuxing.png")
			//   no-repeat 100%;
			background-size: 100% 100%;
			margin-top: -43px;
			.need-confirm-content {
				padding: 46px 32px 12px 52px;
				p {
					text-align: left;
					font-size: 10px;
					font-weight: 400;
					line-height: 24px;
					color: #008dff;
					margin-bottom: 45px;
					span {
						color: #fff;
					}
					img {
						width: 22px;
						height: 22px;
						float: right;
					}
				}
			}
		}
		.button {
			.button-div {
				width: 210px;
				height: 108px;
				margin-top: 4px;
				padding: 10px;
				background: #3e97ff;
				border: 2px solid rgba(62, 151, 255, 1);
				border-radius: 16px;
			}
			.button-cancel {
				margin-top: 30px;
				background: #0f293e;
				color: #c0c0c0;
				border: 2px solid #ff976a;
			}
			.btn_photo_bg {
				border: none;
				margin-top: 6px;
				background: url("../../assets/images02/photograph/tijiaoanniu.png") no-repeat center;
				background-size: 100%;
				color: #e6eeff;
			}
		}
		.bottom_btn {
			p {
				font-size: 8px;
				text-align: center;
				color: #71738c;
				font-weight: 300;
				margin-top: 42px;
			}
			.button-conf {
				display: flex;
				justify-content: space-around;
				.button-div {
					margin-top: 2px;
					width: 150px;
				}
				.btn_photo_color {
					color: #7bd5ff;
				}
			}
		}
	}
	.img-Head {
		margin-bottom: 20px;
	}
	.head-icon {
		.icon {
			width: 91px;
			height: 6px;
			border-radius: 7px;
			background: #007acf;
			text-align: center;
			margin: 0 auto;
			margin-bottom: 0.375rem;
		}
	}
	.photograph-btn {
		padding: 10px;
		p {
			font-size: 12px;
			text-align: center;
			color: #71738c;
			font-weight: 400;
			margin-top: 42px;
			padding: 10px;
		}
	}
	.img-Head .van-image {
		width: 310px;
		height: 310px;
	}
</style>
