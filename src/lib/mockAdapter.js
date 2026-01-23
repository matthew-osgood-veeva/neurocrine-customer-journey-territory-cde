import * as mockResponse from './mockResponse';
/* eslint no-unused-vars: ["error", { "args": "none" }] */
export const mockAdapter = {
    getDataForCurrentObject(object, field) {
        return Promise.resolve(mockResponse.getDataForCurrentObject[object]);
    },
    getObjectTypes(object) {
        return Promise.resolve(mockResponse.getObjectTypes[object]);
    },
    getPicklistValueLabels() {
        return Promise.resolve(mockResponse.getPicklistValueLabels);
    },
    getAlignedTerritories(includeChildren) {
        return Promise.resolve(mockResponse.getAlignedTerritories(includeChildren));
    },
    viewRecord(queryConfig) {
        return Promise.resolve('success');
    },
    newRecord(queryConfig) {
        return Promise.resolve('success');
    },
    queryRecord(queryConfig) {
        return Promise.resolve(mockResponse.queryRecord[queryConfig.object]);
    },
    queryVDSRecord(queryConfig) {
        return Promise.resolve(mockResponse.queryVDSRecord[queryConfig.object]);
    },
    getAvailableObjects() {
        return Promise.resolve(mockResponse.getAvailableObjects());
    },
    getObjectMetadata(queryConfig) {
        return Promise.resolve(mockResponse.getObjectMetadata[queryConfig.object]);
    },
    executeSuggestionAction(queryConfig) {
        return Promise.resolve({ 'success': true });
    }
};