<template>
	<div
		id="app-main"
		:class="themeClass"
		style="height: 100vh"
	>
		<BaseSpinner v-if="isLoading" size="l" position="middle" />
		<HomeView v-else />
		<BaseToastStack
      :toasts="appStore.notifications"
      :remove-toast="appStore.removeNotification"
    />
	</div>
</template>

<script setup>
import BaseSpinner from "./components/common/BaseSpinner.vue";
import BaseToastStack from "./components/common/BaseToastStack.vue";
import HomeView from "./components/HomeView.vue";
import { getThemeClass } from "./lib/themes/theme";
import { useAppStore } from "@/store/modules/appStore";

const themeClass = getThemeClass();

const appStore = useAppStore();
</script>