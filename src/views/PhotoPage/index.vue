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
				<img id='main-img' radius="0" :src="photo_img" />
				<canvas id="overlay" />
			</div>
			<div class="head-icon">
				<p class="title">{{ isTitle }}</p>
				<p class="icon"></p>
			</div>
			<!-- 控制：this.show_var
			     ==0:显示照片要求提示提示 
			     ==1:当选择照片后，显示正在检测 
			     ==2:人脸识别后，显示未检测到人脸
			     ==3:人脸识别后检测到人脸，但戴眼镜 
				 ==4:人脸识别后检测到人脸，未戴眼镜
			-->
			<!-- 照片上传前提示 -->
			<div v-show="this.show_var==0">
				<PicTip></PicTip>
			</div>
			<!-- 人脸照片上传过程展示 -->
			<div v-show="[1,2,3,4].includes(this.show_var)">
				<DetectFace />
			</div>
			<!-- 深度分析阶段的动画效果 -->
			<div v-show="this.show_var==7">
				<Analysis ref='childAnalysis'></Analysis>
			</div>
			<div v-show="this.show_var==8">
				<ConfirmName />
			</div>
			<!-- 底部上传照片、确认等按钮 -->
			<div class="photograph-btn" v-show="this.show_var==0">
				<InputBotton @afterRead1="afterRead" v-bind:msg=this.botton_name1 /> 
			</div>
			<div class="photograph-btn" v-show="this.show_var==4">
				<button class="button-div btn_photo_bg1 btn_photo_color" @click="handleBtnAgain" type="primary">
					重选照片</button>
				<button class="button-div btn_photo_bg1" @click="handleBtnConfirm">
					深度分析</button>
			</div>
		</div>
	</div>
</template>
<script>
	import Analysis from '../../components/Analysis.vue'
	import ConfirmName from '../../components/ConfirmName.vue'
	import PicTip from '../../components/PicTip.vue'
	import DetectFace from '../../components/DetectFace.vue'
	import InputBotton from '../../components/InputBotton.vue'

	import request from '../../utils/request'
	import comm_fun from '../../utils/CommonFunction'
	import axios from 'axios'
	import * as faceapi from 'face-api.js';
	import {imgCosupload,ImgUrlBeauty} from '../../api/app.js'
	import {mapActions,mapState} from 'vuex'
	export default {
		data() {
			return {
				title: '测测你颜值',
				title2: '属于哪一种类型?',
				isTitle: '准备中',
				photo_img: require('../../assets/images02/photograph/touxiang.png'),
				isConfirm: 0,
				tip_img: {
					correct: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADkAAAA4CAMAAABwmqASAAAAk1BMVEUAAAADxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwWPcL6XAAAAMHRSTlMA8QX6o03dzunlJh8QCPbWsZQ3KgvtvbacfnJqXllBPjMWx4tvY0guHfOpgnlmU7/6TN/xAAABlUlEQVRIx53W15qCMBQE4NARCypYsGJbuzvv/3T7yeKaclaS/PdDAswJMDtZ3y7X3XmxVXAYApFNsPAATMxznQmepsbBdopKYRo8tvDrYBhcOagFZsF1Dy+lWfCMP4nRa3TwdjIIJjE4Hf3gJgRvox10xxC0tZNTiIa6wQMkS81g2YOk0Gx5CJnmZPtQOK5OcAHCl85gOSD4GskxCKNBc/AOVbzXuM0TsdepVmv76kbph9NlogCyiK5sEAbihZQOXLrk8+/LR/AVkh05SLeqnQ/+UnJfZ+S5lqKSfqjdnBp5nxigIXj0ITvn3lrqUu2hVywj8Bav/UOwV6dvAFFYL7oF76rOUAzZnSiB2vACqlb1toVb6BMVz3wPsrm85Danfxcm6qLiXYb/HsxBS+nKGm9O8uF0k9oS59w+vM9nzsMRh5csKy2JQLuwJrkPSpqzZjeozhnTsfRg++lZO4BUOl2l2OLIZdoSvhS9jDG76N7wD22E2lgvoP74jE7M1MqrTxVzwTP6zWzMAO/IrAywY3Zcv6noP1SEq/OgNc3TAAAAAElFTkSuQmCC',
					warning: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAAM1BMVEUAAAD7ZAD6ZAD7ZAD9YwD7ZAD8ZAD5YQD7ZAD7ZAD7ZAD6ZAD7ZAD7ZAD8ZAD7ZAD7ZADc5bCPAAAAEHRSTlMA6gzDN5dwGNC0ot6BWCRIgBgKRwAAAQpJREFUOMu9lNt2hCAMRUmUi4BO/v9rOx2HniG6CH1o91v0cMkWcf8KeyLPk9kkT9JcOsuLPJNd5c3qbFILJzu7yw+72R0hTFaPVT6o42yUjmhrA3lC2xLCYutbMJ8/h5na+KXF0MelzYZVCg+06bDUsTY6Sxrq851dbpW/19Z49OV6q60Rvssgje2afUgDnrGS4tQGHRvqorNBAKnBEpQ2UoeNP2uKd9rQ/4FK6VOvZH/3Cw4HNumoMaIH6IM2A+hLYpKgrYeee96hp9PH+vmKs3G5F6pe8X5vFdpU5zAEDjzUCzJdJ8HegMc3Vb1kUeDe0GRHMg05+QX4m2wWNDgCJ9cXmaD4w/0dXyVhOsjXZsVVAAAAAElFTkSuQmCC',
				},
				botton_name1: '拍照/选择照片'
			}
		},
		components: {
			Analysis,
			ConfirmName,
			PicTip,
			DetectFace,
			InputBotton
		},
		computed: {
			...mapState({
				parmes_url: state => state.app.save_url,
				show_var: state => state.app.show_var
			})
		},
		methods: {
			...mapActions([
				'set_app',
				'set_show'
			]),
			async detect_face() {
				const MODEL_URL = "/models";
				await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
				// await faceapi.nets.ageGenderNet.loadFromUri("/models");
				// await faceapi.nets.faceExpressionNet.loadFromUri("/models");
				// await faceapi.nets.faceLandmark68Net.loadFromUri("./models");
				// TinyFaceDetectorOptions|SsdMobilenetv1Options|MtcnnOptions|TinyYolov2Options
				const options = new faceapi.TinyFaceDetectorOptions({ inputSize: 512 })
				const img = new Image()
				img.src = this.photo_img
				const detections = await faceapi.detectAllFaces(img, options)
				const is_face = detections.length
				this.isTitle = '初步检测'
				if (is_face) {
					this.set_show(4)
				} else {
					this.set_show(2)
				}

				return detections.length
			},
			async dram_face() {
				await faceapi.nets.faceLandmark68Net.loadFromUri("./models");
				const input = document.getElementById('main-img')
				const options = new faceapi.TinyFaceDetectorOptions({ inputSize: 512 })
				const detections = await faceapi.detectAllFaces(input,options).withFaceLandmarks()
				const detectionsForSize = await faceapi.resizeResults(detections, {
					width: input.width,
					height: input.height
				})
				const canvas = document.getElementById('overlay')
				canvas.width = input.width
				canvas.height = input.height
				// faceapi.draw.drawDetections(canvas, detectionsForSize, {
				// 	withScore: false
				// })
				faceapi.draw.drawFaceLandmarks(canvas, detectionsForSize, {
					withScore: false
				})
				console.log('finish draw')
			},
			afterRead(e) {
				this.photo_img = URL.createObjectURL(e.target.files[0])
				this.set_show(1)
				this.isTitle = '基础检测'
				let face_num = this.detect_face()
				console.log(face_num)
			},
			// 确认分析
			handleBtnConfirm() {
				console.log('上传')
				this.dram_face()
				this.set_show(7)
				this.$refs.childAnalysis.updateStatus()
			},
			// 重新选择照片
			handleBtnAgain() {
				this.set_show(0)
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
		height: 100vh;
		width: 100%;
		color: #fff;
		background-color: #001037;
		overflow: auto;
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
		display: table;

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

		.img-Head {
			position: relative;
			height: 20vh;
			margin: 1vh auto;

			#main-img {
				height: 20vh;
				// position: absolutes;
				// left: 0;
			}

			#overlay {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				margin: auto;
			}
		}

		.head-icon {
			height: 5vh;
			margin: 2vh auto;

			.icon {
				width: 91px;
				height: 3px;
				// border-radius: 1px;
				background: #007acf;
				text-align: center;
				margin: 0 auto;
				// margin-bottom: 1.375rem;
			}

			.title {
				height: 50%;
				margin: 1vh auto;
			}
		}

		// .tip {
		// 	font-size: 5vw;
		// 	line-height: 5vw;
		// 	margin: 1vh auto;
		// 	color: #0096ff;
		// 	display: inline-block;
		// }
		// .need {
		// 	width: 100%;
		// 	height: 30vh;
		// 	margin: 1vh auto;
		// 	display:flex;
		// 	flex-direction: column;
		// 	align-items: center;
		// 	justify-content: space-around;
		// 	.item {
		// 		height: 1.875rem;
		// 		line-height: 1.875rem;
		// 		background: url("../../assets/images/photograph/juxing.png") no-repeat center;
		// 		background-size: 45% 100%;
		// 		font-size: 3vw;
		// 		width: 100%;
		// 	}
		// }
		.box {
			margin: 0 auto;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-around;
			width: 50vw;
			height: 25vw;
			border: none;
			// margin-top: 6px;
			background: url("../../assets/images02/photograph/tijiaoanniu.png") no-repeat center;
			background-size: 100%;
			color: #e6eeff;
			.input {
				position: absolute;
				right: 0;
				top: 0;
				opacity: 0;
				filter: alpha(opacity=0);
				cursor: pointer;
				height: 100%;
			}
		}

		.photograph-btn {
			margin: 4vw 5vw;
			height: 15vh;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-around;

			.button-div {
				width: 50vw;
				height: 25vw;
				border: none;
				margin-top: 6px;
				background: url("../../assets/images02/photograph/tijiaoanniu.png") no-repeat center;
				background-size: 100%;
				color: #e6eeff;
			}

			.btn_photo_bg1 {
				width: 40vw;
				height: 20vw;
			}

			.btn_photo_color {
				color: #999999;
			}
		}
	}
</style>
