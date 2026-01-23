export const studioData = {
	userLanguageCode: 'en_US',
	userId: 'u123',
	veevaMessages: [
		{
			name: "ACCOUNTS",
			text: "Accounts (Translated!)",
		},
	]
}

export const getDataForCurrentObject = {
	user__sys: {
		user__sys: {
			locale_code__v: "en_US",
			language_code__v: "en",
			id: "V4T000000002001",
			name__v: "Sarah Jones",
		},
		success: true,
	},
	account__v: {
		account__v: {
			id: "V4T000000001001",
		},
		success: true,
	},
};

export const getObjectTypes = {
	account__v: {
		account__v: [
			{
				label__v: "Professional",
				name__v: "professional__v",
				id: "OOT00000000V301",
				isActive__v: true,
			},
			{
				label__v: "Institution",
				name__v: "institution__v",
				id: "OOT00000000V302",
				isActive__v: true,
			},
			{
				label__v: "Practice",
				name__v: "practice__v",
				id: "OOT00000000V303",
				isActive__v: true,
			},
		],
	},
	call2__v: {
		call2__v: [
			{
				label__v: "Call Report",
				name__v: "callreport__v",
				id: "OOT00000000V304",
				isActive__v: true,
			},
			{
				label__v: "Engage Connect",
				name__v: "engage_connect__v",
				id: "OOT00000000V305",
				isActive__v: true,
			},
		],
	},
};

export const getAlignedTerritories = () => {
	return {
		data: [
			{
				description__v: "Los Angeles, CA",
				developerName: 'TERR1',
				id: 'VTER10000001001',
				name: 'TERR1',
				parentTerritoryId: 'VTER10000001002',
			}
		],
		messageId: 1,
		record_count: 1,
		success: true,
	};
};

export const getAvailableObjects = () => {
	return {
		success: true,
		data: {
			user__sys: {},
			account__v: {},
			suggestion__v: {},
		},
		record_count: 2,
	};
};

export const getObjectMetadata = {
	account__v: {
		success: true,
		data: {
			object: "account__v",
			fields: [
				{
					name: "Id",
					dataType: "string",
				},
				{
					name: "name__v",
					dataType: "string",
				},
			],
		},
		record_count: 2,
	},
};

export const queryRecord = {
	user__sys: {
		user__sys: [
			{
				locale_code__v: "en_US",
				language_code__v: "en",
				id: "V4T000000002001",
				name__v: "Sarah Jones",
			},
		],
		success: true,
		record_count: 1,
	},
	message__v: {
		message__v: [
			{
				name__v: "ACCOUNTS",
				text__v: "Accounts (Translated)",
			},
			{
				name__v: "OPPORTUNITIES",
				text__v: "Opportunities (Translated)",
			},
		],
		success: true,
		record_count: 10,
	},
	account__v: {
		account__v: [
			{
				id: "V4T000000001001",
				name__v: "Christopher Wu",
				specialty_1__v: "cardiology__v", //single picklist
				offerings__c: "hmo__c;hra__c;hsa__c", //multi picklist
				total_lives__c: null,
				ispersonaccount__v: true,
				trx__c: 100,
			},
			{
				id: "V4T000000001002",
				name__v: "UCLA Health",
				specialty_1__v: null,
				offerings__c: "hmo__c;hra__c;hsa__c",
				total_lives__c: 10000,
				ispersonaccount__v: false,
				trx__c: -10,
			},
			{
				id: "V4T000000001003",
				name__v: "Cedars-Sinai West",
				specialty_1__v: null,
				offerings__c: "hmo__c;hra__c;hsa__c",
				total_lives__c: 12000,
				ispersonaccount__v: false,
				trx__c: -10,
			},
			{
				id: "V4T000000001004",
				name__v: "Cedars-Sinai East",
				specialty_1__v: null,
				offerings__c: "hmo__c;hra__c;hsa__c",
				total_lives__c: 12000,
				ispersonaccount__v: false,
				trx__c: -10,
			},
			{
				id: "V4T000000001005",
				name__v: "USC Hospital",
				specialty_1__v: null,
				offerings__c: "hmo__c;hra__c;hsa__c",
				total_lives__c: 12000,
				ispersonaccount__v: false,
				trx__c: 0,
			},
		],
		success: true,
		record_count: 2,
	},
};

export const getPicklistValueLabels = {
	account__v: {
		specialty_1__v: [
			{
				name: "cardiology__v",
				label: "Cardiology",
				isActive: true,
			},
			{
				name: "pediatrics__v",
				label: "Pediatrics",
				isActive: true,
			},
			{
				name: "oncology__v",
				label: "Oncology",
				isActive: false,
			},
		],
		offerings__c: [
			{
				name: "hmo__c",
				label: "HMO",
				isActive: true,
			},
			{
				name: "hra__c",
				label: "HRA",
				isActive: true,
			},
			{
				name: "hsa__c",
				label: "HSA",
				isActive: true,
			},
		],
	},
};

export const queryVDSRecord = {
	fact_antares_prescriber_sales_week_rollup__v: {
		fact_antares_prescriber_sales_week_rollup__v: [
			{
				total_rx_count_xyosted_13_wk__v: 18.39,
				effective_last_modified_date__v: "2019-12-10T16:57:06.000Z",
			},
		],
		success: true,
		record_count: 1,
	},
};