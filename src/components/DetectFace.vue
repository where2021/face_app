<template>
	<!-- 人脸检测时候展示组件 -->
	<div>
		<div class="need-confirm" v-show="this.show_var==1">
			<div class="need-confirm-content">
				<p>
					<span>正在进行人脸基础检测</span>
					<img class='load-stuts' src='../assets/images/saomiao/loading.png' />
				</p>
			</div>
		</div>
		<div class="need-confirm" v-show="this.show_var==2">
			<div class="need-confirm-content">
				<p>
					<span>未检测到人脸</span>
					<img :src="tip_img.warning" alt />
				</p>
			</div>
		</div>
		<div class="need-confirm" v-show="this.show_var==3">
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
		<div class="need-confirm" v-show="this.show_var==4">
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
</template>
<script>
	import { mapActions, mapState } from 'vuex'
	export default {
		data() {
			return {
				tip_img: {
					correct: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADkAAAA4CAMAAABwmqASAAAAk1BMVEUAAAADxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwUDxwWPcL6XAAAAMHRSTlMA8QX6o03dzunlJh8QCPbWsZQ3KgvtvbacfnJqXllBPjMWx4tvY0guHfOpgnlmU7/6TN/xAAABlUlEQVRIx53W15qCMBQE4NARCypYsGJbuzvv/3T7yeKaclaS/PdDAswJMDtZ3y7X3XmxVXAYApFNsPAATMxznQmepsbBdopKYRo8tvDrYBhcOagFZsF1Dy+lWfCMP4nRa3TwdjIIJjE4Hf3gJgRvox10xxC0tZNTiIa6wQMkS81g2YOk0Gx5CJnmZPtQOK5OcAHCl85gOSD4GskxCKNBc/AOVbzXuM0TsdepVmv76kbph9NlogCyiK5sEAbihZQOXLrk8+/LR/AVkh05SLeqnQ/+UnJfZ+S5lqKSfqjdnBp5nxigIXj0ITvn3lrqUu2hVywj8Bav/UOwV6dvAFFYL7oF76rOUAzZnSiB2vACqlb1toVb6BMVz3wPsrm85Danfxcm6qLiXYb/HsxBS+nKGm9O8uF0k9oS59w+vM9nzsMRh5csKy2JQLuwJrkPSpqzZjeozhnTsfRg++lZO4BUOl2l2OLIZdoSvhS9jDG76N7wD22E2lgvoP74jE7M1MqrTxVzwTP6zWzMAO/IrAywY3Zcv6noP1SEq/OgNc3TAAAAAElFTkSuQmCC',
					warning: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAAM1BMVEUAAAD7ZAD6ZAD7ZAD9YwD7ZAD8ZAD5YQD7ZAD7ZAD7ZAD6ZAD7ZAD7ZAD8ZAD7ZAD7ZADc5bCPAAAAEHRSTlMA6gzDN5dwGNC0ot6BWCRIgBgKRwAAAQpJREFUOMu9lNt2hCAMRUmUi4BO/v9rOx2HniG6CH1o91v0cMkWcf8KeyLPk9kkT9JcOsuLPJNd5c3qbFILJzu7yw+72R0hTFaPVT6o42yUjmhrA3lC2xLCYutbMJ8/h5na+KXF0MelzYZVCg+06bDUsTY6Sxrq851dbpW/19Z49OV6q60Rvssgje2afUgDnrGS4tQGHRvqorNBAKnBEpQ2UoeNP2uKd9rQ/4FK6VOvZH/3Cw4HNumoMaIH6IM2A+hLYpKgrYeee96hp9PH+vmKs3G5F6pe8X5vFdpU5zAEDjzUCzJdJ8HegMc3Vb1kUeDe0GRHMg05+QX4m2wWNDgCJ9cXmaD4w/0dXyVhOsjXZsVVAAAAAElFTkSuQmCC',
				}
			}
		},
		computed: {
			...mapState({
				show_var: state => state.app.show_var
			})
		}
	}
</script>
<style lang="scss" scoped>
.need-confirm {
	width: 100%;
	height: 30vh;
	margin: 1vh auto;
	// background: url("../../assets/images/photograph/confirmjuxing.png")
	//   no-repeat 100%;
	background-size: 100% 100%;
	// margin-top: -43px;
	.need-confirm-content {
		padding: 4px 52px 4px 52px;
		height: 100%;
		display:flex;
		flex-direction: column;
		align-items: stretch;
		justify-content: space-around;
		p {
			text-align: left;
			font-size: 10px;
			font-weight: 400;
			line-height: 24px;
			color: #008dff;
			// margin-bottom: 45px;
			span {
				color: #fff;
			}
			img {
				width: 22px;
				height: 22px;
				float: right;
			}
			//动画效果
			.load-stuts {
				width: 20px;
				height: 20px;
				animation: rotatecss 1s linear infinite;
				// background: url("../../assets/images/saomiao/loading.png") no-repeat;
				// background-size: 100% 100%;
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
	}
}	
</style>
