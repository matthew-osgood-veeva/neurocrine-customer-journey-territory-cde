import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";
import * as MockData from "@/lib/mockResponse";

export const useAppStore = defineStore("appStore", {
  state: () => ({
    // --- Boilerplate State (Required for main.js) ---
    isLoading: false,
    notifications: [],
    isOnline: true,
    // These are required by the CDE boilerplate initialization
    userId: null,
    userLanguageCode: 'en_US',
    veevaMessages: [],

    // --- Your Custom App State ---
    accountMap: {},
    journeyStageOptions: [],
  }),

  actions: {
    saveData(data) {
      console.log("CDE: Initializing Store with Studio Data", data);
      if (data.userId) this.userId = data.userId;
      if (data.userLanguageCode) this.userLanguageCode = data.userLanguageCode;
      if (data.veevaMessages) this.veevaMessages = data.veevaMessages;
    },

    // --- Notification Helpers ---
    addNotification(notification) {
      this.notifications.push({ ...notification, id: uuidv4() });
    },
    removeNotification(id) {
      this.notifications = this.notifications.filter((n) => n.id !== id);
    },

    // --- Your Custom Data Loader (HCP List) ---
    async loadData() {
      this.isLoading = true;
      console.log("CDE: Loading HCP Data...");

      try {
        // 1. Base Account Mapping
        const rawAccounts = MockData.queryRecord.account__v?.account__v || [];
        const accountMap = {};
        rawAccounts.forEach((acc) => {
          accountMap[acc.id] = acc;
        });

        // 2. Parent Account Hierarchy
        const rawHierarchy = MockData.queryRecord.child_account__v?.child_account__v || [];
        rawHierarchy.forEach((link) => {
          const childId = link.child_account__v;
          const parentId = link.parent_account__v;
          if (accountMap[childId] && accountMap[parentId]) {
            accountMap[childId].parentName = accountMap[parentId].name__v;
          }
        });

        // 3. Journey Logic
        const rawStages = MockData.queryRecord.customer_journey_stage__v?.customer_journey_stage__v || [];
        const rawActivities = MockData.queryRecord.customer_journey_stage_activity__v?.customer_journey_stage_activity__v || [];
        const rawExecutions = MockData.queryRecord.customer_journey_execution__v?.customer_journey_execution__v || [];
        
			// 3a. Helper: Channel Labels Lookup 
			const channelLabels = {};
			const rawChannelOptions = MockData.getPicklistValueLabels.customer_journey_stage_activity__v?.channel__v || [];
			rawChannelOptions.forEach(opt => {
				channelLabels[opt.name] = opt.label;
			});

			// 3b. Organize Activities by Stage
			const stageLookup = {};
			rawStages.forEach((stage) => {
			stageLookup[stage.id] = {
				name: stage.name__v,
				allActivities: [] 
			};
			});

			rawActivities.forEach((act) => {
				if (stageLookup[act.customer_journey_stage__v]) {
					stageLookup[act.customer_journey_stage__v].allActivities.push(act);
				}
			});

			// 3c. Map History (Completed Activities)
			const completedActivitiesMap = {}; 
			rawExecutions.forEach((exec) => {
				const cjaId = exec.customer_journey_account__v;
				if (!completedActivitiesMap[cjaId]) {
					completedActivitiesMap[cjaId] = [];
				}
				completedActivitiesMap[cjaId].push(exec.customer_journey_stage_activity__v);
			});

			// 3d. Calculate Next Activity for Each Doctor
				const rawJourneyAccounts = MockData.queryRecord.customer_journey_account__v?.customer_journey_account__v || [];			
			rawJourneyAccounts.forEach((link) => {
			const accountId = link.account__v;
			const stageId = link.current_customer_journey_stage__v;
			const cjaId = link.id;

			if (accountMap[accountId] && stageLookup[stageId]) {
				const stageInfo = stageLookup[stageId];
				
				// Filter out completed activities
				const allActivities = stageInfo.allActivities;
				const completedIds = completedActivitiesMap[cjaId] || [];
				const remainingActivities = allActivities.filter(act => !completedIds.includes(act.id));

				// Sort by Sequence
				remainingActivities.sort((a, b) => a.sequence__v - b.sequence__v);

				// Pick the top one
				const currentActivity = remainingActivities[0];

				accountMap[accountId].journeyStageName = stageInfo.name;
				
				// --- SAVE THE DATA TO THE ACCOUNT ---
				if (currentActivity) {
					// 1. Save the objective text (e.g., "Detail on Efficacy")
					accountMap[accountId].nextActivity = currentActivity.objective__v;
					
					// 2. Save the formatted Channel Label (e.g., "In-person")
					const channelApi = currentActivity.channel__v;
					accountMap[accountId].activityChannel = channelLabels[channelApi] || channelApi;
				} else {
					accountMap[accountId].nextActivity = "Complete";
					accountMap[accountId].activityChannel = "";
				}
			}
			});

        // 4. Addresses (City)
        const rawAddresses = MockData.queryRecord.address__v?.address__v || [];
        rawAddresses.forEach((addr) => {
          const accountId = addr.account__v;
          const cityName = addr.city_cda__v;
          const isPrimary = addr.primary_cda__v;

          if (accountMap[accountId]) {
            const currentAccount = accountMap[accountId];
            if (!currentAccount.city || isPrimary) {
              currentAccount.city = cityName;
            }
          }
        });

        // 5. Specialty Labels
        const rawSpecialtyOptions = MockData.getPicklistValueLabels.account__v?.specialty_1__v || [];
        const specialtyLookup = {};
        rawSpecialtyOptions.forEach((option) => {
          specialtyLookup[option.name] = option.label;
        });

        Object.keys(accountMap).forEach((accountId) => {
          const account = accountMap[accountId];
          const apiName = account.specialty_1__v;
          account.specialtyLabel = specialtyLookup[apiName] || apiName || "--";
        });

        // 6. Last Call Date
        const rawCalls = MockData.queryRecord.call2__v?.call2__v || [];
        Object.keys(accountMap).forEach((accountId) => {
          const account = accountMap[accountId];
          const accountCalls = rawCalls
            .filter((c) => c.account__v === accountId && c.call2_status__v === "submitted__v")
            .sort((a, b) => new Date(b.call_date__v) - new Date(a.call_date__v));

          const latestCall = accountCalls[0];
          if (latestCall) {
            account.lastCallDate = latestCall.call_date__v;
          }
        });

        // 7. Journey Stage Options
        const rawStageOptions = MockData.getPicklistValueLabels.customer_journey_stage__v?.stage__v || [];
        const formattedStageOptions = rawStageOptions.map((opt) => ({
          value: opt.label,
          display: opt.label,
        }));

        // --- COMMIT TO STATE ---
        this.accountMap = accountMap;
        this.journeyStageOptions = formattedStageOptions;
        console.log("CDE: Data Hydrated Successfully", accountMap);

      } catch (error) {
        console.error("Error loading data:", error);
        this.addNotification({
          variant: "error",
          message: `Error loading data: ${error.message}`,
        });
      } finally {
        this.isLoading = false;
      }
    }
  },
});