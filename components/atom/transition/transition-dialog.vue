<template>
	<transition-group name="cc" tag="span" v-bind="$attrs">
		<slot />
	</transition-group>
</template>

<style lang="scss">
/** @NOTE this is not scoped on purpose. The children are outside of the tree (teleport) */

.cc-enter-active,
.cc-leave-active {
	transition: opacity var(--slow) var(--transition);

	&.center > *:not(.v-overlay) {
		transform: translateY(0px);
		transition: transform var(--slow) var(--transition-in);
	}

	&.right > *:not(.v-overlay) {
		transform: translateX(0px);
		transition: transform var(--slow) var(--transition-in);
	}
}

.cc-enter-from,
.cc-leave-to {
	opacity: 0;

	&.center > *:not(.v-overlay) {
		transform: translateY(50px);
		transition: transform var(--slow) var(--transition-out);
	}

	&.right > *:not(.v-overlay) {
		transform: translateX(50px);
		transition: transform var(--slow) var(--transition-out);
	}
}
</style>
