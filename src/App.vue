<template>
	<div class="bg fixed inset-0 -z-50"></div>
	<RouterView/>
	<notifications position="top center" :max="3"/>
</template>

<style scoped>
.bg {
	background-color: #ffffff;
	background-image:  repeating-linear-gradient(45deg, #f2f2ff 25%, transparent 25%, transparent 75%, #f2f2ff 75%, #f2f2ff), repeating-linear-gradient(45deg, #f2f2ff 25%, #ffffff 25%, #ffffff 75%, #f2f2ff 75%, #f2f2ff);
	background-position: 0 0, 40px 40px;
	background-size: 80px 80px;
}
</style>
