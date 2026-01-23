import { defineStore } from "pinia";
import { t } from "@/i18n/helpers";
import { CDE_PROPS } from "@/cde-config";
import { v4 as uuidv4 } from "uuid";
import { isObjectEmpty } from "@/lib/helper/commonUtils";

export const useAppStore = defineStore("appStore", {
	state: () => ({
		isOnline: false,
		isLoading: true,
		notifications: [],
		...CDE_PROPS // Grabs your props and adds them to the state
	}),
	getters: {
		hasNotifications: (state) => !!state.notifications.length,
		// You can use veeva messages in the store
		translatedAccounts: () => t("ACCOUNTS"),
	},
	actions: {
		setIsOnline(isOnline) {
			this.isOnline = isOnline;
		},
		setLoading(isLoading) {
			this.isLoading = isLoading;
		},
		async saveData(studioData) {
      try {
        // Store data from Studio
        if (studioData) {
					console.log("Storing Studio data inputs in production...");
					if(isObjectEmpty(CDE_PROPS)){
						throw new Error('You must define props in cde-config.js');
					}
					// Takes the props defined in cde-config.js and save them in the store
					for (const key of Object.keys(CDE_PROPS)) {
						if (key in studioData) this[key] = studioData[key];
					}
        }
        // Custom X-Page Queries
        if (window.ds) {
            console.log("Running custom X-Page queries...");
            // const userResp = await appDS.getUserInfo();
            // console.log(userResp);
        }
      } catch(error) {
          console.log('Error:: ' + error);
          this.addNotification({
						id: uuidv4(),
						variant: 'error',
						message: `Error getting data: ${error.message}`,
						autoClose: false
					})
      }
      this.isLoading = false;
    },
		addNotification(notification) {
			this.notifications.push(notification);
		},
		removeNotification(id) {
			this.notifications = this.notifications.filter((n) => n.id !== id);
		},
	},
});
