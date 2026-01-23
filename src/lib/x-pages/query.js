/* eslint-disable no-unused-vars */
import * as Utils from "@/lib/helper/commonUtils";
import { mockAdapter } from "@/lib/mockAdapter";

// promise global variable
const $q = window.Q;

// data service global variable
const ds =
	!process.env.NODE_ENV || process.env.NODE_ENV === "development"
		? mockAdapter
		: window.ds;

// Do not delete this function. It is used in the main.js file.
export const getUserLanguageCode = () => {
	const deferred = $q.defer();
	ds.getDataForCurrentObject("user__sys", "language_code__v").then(
		(result) => {
			deferred.resolve(result.user__sys.language_code__v);
		},
		(err) => {
			console.log(err);
			deferred.resolve(null);
		}
	);
	return deferred.promise;
};

// Do not delete this function. It is used in the main.js file.
export const getUserLocaleCode = () => {
	const deferred = $q.defer();
	ds.getDataForCurrentObject("user__sys", "locale_code__v").then(
		(result) => {
			deferred.resolve(result.user__sys.locale_code__v);
		},
		(err) => {
			console.log(err);
			deferred.resolve(null);
		}
	);
	return deferred.promise;
};

// Do not delete this function. It is used in the main.js file.
export const getVeevaMessage = (language) => {
	const deferred = $q.defer();
	const queryConfig = {
		params: {
			object: "message__v",
			fields: ["name__v", "text__v"],
			where: `user_language_code__v = '${language}' AND category__v = 'custom_x-pages'`
		},
	};
	ds.queryRecord(queryConfig.params).then(
		(result) => {
			deferred.resolve(
				Utils.arrayToObject(result.message__v, "name__v", "text__v")
			);
		},
		(err) => {
			console.log(err);
			deferred.resolve(null);
		}
	);
	return deferred.promise;
};

export const getCurrentUserId = () => {
	const deferred = $q.defer();
	ds.getDataForCurrentObject("user__sys", "id").then(
		(result) => {
			deferred.resolve(result.user__sys.id);
		},
		(err) => {
			console.log(err);
			deferred.resolve(null);
		}
	);
	return deferred.promise;
};

export const getAlignedTerritories = (includeChildren = false) => {
	const deferred = $q.defer();

	ds.getAlignedTerritories({includeChildren}).then(
		(result) => {
			deferred.resolve(result.data);
		},
		(err) => {
			console.log(err);
			deferred.resolve(null);
		}
	);
	return deferred.promise;
};

// deep link for record detail view
export const viewRecord = (sObject, recordId) => {
	const deferred = $q.defer();
	const deepLink = {
		object: sObject,
		fields: { Id: recordId },
	};
	ds.viewRecord(deepLink).then(
		(resp) => {
			deferred.resolve(resp);
		},
		(err) => {
			console.log(err);
			deferred.resolve(null);
		}
	);
	return deferred.promise;
};

// Returns an array of object types for a given object name
// ex: [{label: 'Professional', name: 'professional__v', id: 'OOT00000000V301', isActive: true}]
export const getObjectTypes = (object) => {
	const deferred = $q.defer();
	ds.getObjectTypes(object).then(
		(result) => {
			deferred.resolve(result[object]);
		},
		(err) => {
			console.log(err);
			deferred.resolve(null);
		}
	);
	return deferred.promise;
};

export const getAccounts = () => {
	const deferred = $q.defer();
	const queryConfig = {
		params: {
			object: "account__v",
			fields: ["id", "name__v", "specialty_1__v", "ispersonaccount__v"],
		},
	};
	ds.queryRecord(queryConfig.params).then(
		(result) => {
			deferred.resolve(result[queryConfig.params.object]);
		},
		(err) => {
			console.log(err);
			deferred.resolve(null);
		}
	);
	return deferred.promise;
};

export const getAccount = (id) => {
	const deferred = $q.defer();
	const queryConfig = {
		params: {
			object: "account__v",
			fields: ["id", "name__v", "specialty_1__v"],
			where: `id = '${id}'`,
		},
	};
	ds.queryRecord(queryConfig.params).then(
		(result) => {
			deferred.resolve(result[queryConfig.params.object]);
		},
		(err) => {
			console.log(err);
			deferred.resolve(null);
		}
	);
	return deferred.promise;
};

export const getUsers = (userIds) => {
	const deferred = $q.defer();
	const queryConfig = {
		params: {
			object: "user__sys",
			fields: ["id", "name__v"],
			where: `id IN ${Utils.getInStatementArray(userIds)}`,
		},
	};
	ds.queryRecord(queryConfig.params).then(
		(result) => {
			deferred.resolve(result[queryConfig.params.object]);
		},
		(err) => {
			console.log(err);
			deferred.resolve(null);
		}
	);
	return deferred.promise;
};

export const getPicklistValueLabels = (
	object,
	field,
	includeInactive = false
) => {
	const deferred = $q.defer();
	ds.getPicklistValueLabels(object, field, includeInactive).then((result) => {
		deferred.resolve(
			Utils.arrayToObject(result[object][field], "name", "label")
		);
	});
	return deferred.promise;
};

export const getAvailableObjects = () => {
	const deferred = $q.defer();
	ds.getAvailableObjects().then(
		(result) => {
			deferred.resolve(result.data);
		},
		(err) => {
			console.log(err);
			deferred.resolve(null);
		}
	);
	return deferred.promise;
};