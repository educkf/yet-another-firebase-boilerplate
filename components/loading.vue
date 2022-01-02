<template>
  	<div class="loading-container">
        <span class="circle"></span>
        <span class="circle"></span>
        <span class="circle"></span>
        <span class="circle"></span>
    </div>
</template>

<script>
	// https://codepen.io/sudeepgumaste/pen/abdrorB
	export default {
		name: "Loading"
	};

</script>

<style lang="postcss">

    .loading-container {
        height: 15px;
        width: 105px;
        display: flex;
        position: relative;
        transform: scale(0.4);

        .circle {
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background-color: #fff;
            animation: move 350ms linear 0ms infinite;
            margin-right: 30px;

            &:first-child {
                position: absolute;
                top:0;
                left:0;
                animation: grow 350ms linear 0ms infinite;
            }

            &:last-child {
                position: absolute;
                top: 0;
                right: 0;
                margin-right: 0;
                animation: grow 350ms linear 0s infinite reverse;
            }
        }
    }

    @keyframes grow {
        from {transform: scale(0,0); opacity: 0;}
        to {transform: scale(1,1); opacity: 1;}
    }

    @keyframes move {
        from {transform: translateX(0px)}
        to {transform: translateX(45px)}
    }

</style>
