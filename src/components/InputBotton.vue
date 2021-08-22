<template>
	<!-- input按钮 -->
	<div class="input-botton">
		{{ msg }}
		<input class="input" type="file" accept="image/*" @change="myclick($event)" />
	</div>
</template>
<script>
	export default {
		props: ["msg"],
		methods: {
			myclick(e) {
				// 当点击子组件的按钮的时候，如何 拿到 父组件传递过来的 func 方法，并调用这个方法？？？
				//  emit 英文原意： 是触发，调用、发射的意思
				// this.$emit('函数名称', 参数, 参数) func123是
				this.$emit('afterRead1',e)
			}
		}
	}
</script>
<style lang="scss" scoped>
	.input-botton {
		position: relative;
		margin: 0 auto;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		width: 50vw;
		height: 25vw;
		border: none;
		background: url("../assets/images02/photograph/tijiaoanniu.png") no-repeat center;
		background-size: 100%;
		color: #e6eeff;
		.input {
			position: absolute;
			right: 0;
			top: 0;
			opacity: 0;
			filter: alpha(opacity=0);
			cursor: pointer;
			width: 100%;
			height: 100%;
		}
	}
</style>
