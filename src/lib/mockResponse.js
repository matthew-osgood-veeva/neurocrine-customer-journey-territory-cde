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

// ==========================================
// 3. YOUR CUSTOM APP DATA (The "Database")
// ==========================================

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
    // --- ACCOUNTS (HCPs and Hospitals) ---
    account__v: {
        account__v: [
            // HCPs
            {
                id: "V4T000000001001",
                name__v: "Christopher Wu",
                specialty_1__v: "cardiology__v", 
                offerings__c: "hmo__c;hra__c;hsa__c", 
                total_lives__c: null,
                ispersonaccount__v: true,
                trx__c: 100,
            },
            {
                id: "V4T000000001007",
                name__v: "Emily Chen",
                specialty_1__v: "pediatrics__v",
                offerings__c: "hmo__c;hsa__c",
                total_lives__c: null,
                ispersonaccount__v: true,
                trx__c: 85,
            },
            {
                id: "V4T000000001008",
                name__v: "Michael Ross",
                specialty_1__v: "oncology__v",
                offerings__c: "hra__c",
                total_lives__c: null,
                ispersonaccount__v: true,
                trx__c: 120,
            },
            {
                id: "V4T000000001009",
                name__v: "Linda Kim",
                specialty_1__v: "cardiology__v",
                offerings__c: "hmo__c;hra__c;hsa__c",
                total_lives__c: null,
                ispersonaccount__v: true,
                trx__c: 95,
            },
            {
                id: "V4T000000001010",
                name__v: "Robert Patel",
                specialty_1__v: "oncology__v",
                offerings__c: "hmo__c",
                total_lives__c: null,
                ispersonaccount__v: true,
                trx__c: 60,
            },
            {
                id: "V4T000000001011",
                name__v: "Sarah Johnson",
                specialty_1__v: "pediatrics__v",
                offerings__c: "hsa__c",
                total_lives__c: null,
                ispersonaccount__v: true,
                trx__c: 110,
            },
            // PARENT ACCOUNTS (Hospitals)
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
        record_count: 10,
    },
    // --- HIERARCHY (Links HCPs to Hospitals) ---
    child_account__v: {
        child_account__v: [
            {
                id: "hier_001",
                child_account__v: "V4T000000001001", // Christopher Wu
                parent_account__v: "V4T000000001002"  // UCLA Health
            },
            {
                id: "hier_002",
                child_account__v: "V4T000000001007", // Emily Chen
                parent_account__v: "V4T000000001003"  // Cedars-Sinai West
            },
            {
                id: "hier_003",
                child_account__v: "V4T000000001008", // Michael Ross
                parent_account__v: "V4T000000001005"  // USC Hospital
            },
            {
                id: "hier_004",
                child_account__v: "V4T000000001009", // Linda Kim
                parent_account__v: "V4T000000001002"  // UCLA Health
            },
            {
                id: "hier_005",
                child_account__v: "V4T000000001010", // Robert Patel
                parent_account__v: "V4T000000001003"  // Cedars-Sinai West
            },
            {
                id: "hier_006",
                child_account__v: "V4T000000001011", // Sarah Johnson
                parent_account__v: "V4T000000001004"  // Cedars-Sinai East
            }
        ],
        success: true,
        record_count: 6
    },
    // --- JOURNEY STAGE DEFINITIONS ---
    customer_journey_stage__v: {
        customer_journey_stage__v: [
            {
                id: "cjs_001",
                name__v: "Awareness"
            },
            {
                id: "cjs_002",
                name__v: "Adoption"
            },
            {
                id: "cjs_003",
                name__v: "Loyalty"
            },
            {
                id: "cjs_004",
                name__v: "Advocacy"
            }
        ]
    },
    // --- JOURNEY LINKS ---
    customer_journey_account__v: {
        customer_journey_account__v: [
            {
                id: "cja_001", 
                account__v: "V4T000000001001", // Christopher Wu
                current_customer_journey_stage__v: "cjs_001" 
            },
            {
                id: "cja_002", 
                account__v: "V4T000000001007", // Emily Chen
                current_customer_journey_stage__v: "cjs_002" 
            },
        ],
        success: true,
        record_count: 2
    },
	customer_journey_stage_activity__v: {
        customer_journey_stage_activity__v: [
            // Awareness Stage
            {
                id: "act_001",
                customer_journey_stage__v: "cjs_001",
                sequence__v: 1,
                channel__v: "email__v", 
                objective__v: "Send Welcome Email"
            },
            
            // Adoption Stage - Activity 1
            {
                id: "act_002",
                customer_journey_stage__v: "cjs_002",
                sequence__v: 2,
                channel__v: "face_to_face__v", 
                objective__v: "Detail on Efficacy"
            },
            // Adoption Stage - Activity 2
            {
                id: "act_005", 
                customer_journey_stage__v: "cjs_002",
                sequence__v: 1, 
                channel__v: "email__v", 
                objective__v: "Follow up with Safety Profile"
            },

            // Loyalty Stage 
            {
                id: "act_003",
                customer_journey_stage__v: "cjs_003",
                sequence__v: 1,
                channel__v: "other__v", 
                objective__v: "Invite to Speaker Program"
            },
             // Advocacy Stage
             {
                id: "act_004",
                customer_journey_stage__v: "cjs_004",
                sequence__v: 1,
                channel__v: "face_to_face__v", 
                objective__v: "Discuss KOL Opportunities"
            }
        ],
        success: true,
        record_count: 5
    },
	// --- HISTORY OF COMPLETED ACTIVITIES ---
    customer_journey_execution__v: {
        customer_journey_execution__v: [
            {
                id: "exec_001",
                customer_journey_account__v: "cja_002", // Link to HCP
                customer_journey_stage_activity__v: "act_002", 
                date__v: "2023-11-15",
                channel__v: "face_to_face__v"
            }
        ],
        success: true,
        record_count: 1
    },
    // --- ADDRESSES ---
    address__v: {
        address__v: [
            {
                id: "addr_001",
                account__v: "V4T000000001001", // Wu
                city_cda__v: "New York",
                primary_cda__v: true
            },
            {
                id: "addr_002",
                account__v: "V4T000000001007", // Chen
                city_cda__v: "San Francisco",
                primary_cda__v: true
            },
            {
                id: "addr_004",
                account__v: "V4T000000001008", // Ross
                city_cda__v: "Chicago",
                primary_cda__v: true
            },
            {
                id: "addr_005",
                account__v: "V4T000000001009", // Kim
                city_cda__v: "Seattle",
                primary_cda__v: true
            },
            {
                id: "addr_006",
                account__v: "V4T000000001010", // Patel
                city_cda__v: "Houston",
                primary_cda__v: true
            },
            {
                id: "addr_007",
                account__v: "V4T000000001011", // Johnson
                city_cda__v: "Boston",
                primary_cda__v: true
            }
        ],
        success: true,
        record_count: 6
    },
    // --- CALLS ---
    call2__v: {
        call2__v: [
            // Christopher Wu (Has a recent call)
            {
                id: "call_001",
                account__v: "V4T000000001001", 
                call_date__v: "2024-02-15",
                call2_status__v: "submitted__v"
            },
            // Christopher Wu (Has an older call)
            {
                id: "call_002",
                account__v: "V4T000000001001", 
                call_date__v: "2023-11-20",
                call2_status__v: "submitted__v"
            },
            // Dr. Emily Chen
            {
                id: "call_003",
                account__v: "V4T000000001007", 
                call_date__v: "2024-03-10",
                call2_status__v: "submitted__v"
            },
            // Dr. Michael Ross
            {
                id: "call_004",
                account__v: "V4T000000001008", 
                call_date__v: "2024-01-05",
                call2_status__v: "submitted__v"
            },
            // Dr. Linda Kim
            {
                id: "call_005",
                account__v: "V4T000000001009", 
                call_date__v: "2024-03-22",
                call2_status__v: "submitted__v"
            },
            // Dr. Sarah Johnson
            {
                id: "call_006",
                account__v: "V4T000000001011", 
                call_date__v: "2024-02-28",
                call2_status__v: "submitted__v"
            }
        ],
        success: true,
        record_count: 6
    }
};

// ==========================================
// 4. PICKLIST DEFINITIONS
// ==========================================

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
    // Global Value Set for Journey Stages
    customer_journey_stage__v: {
        stage__v: [
            { name: "awareness__v", label: "Awareness", isActive: true },
            { name: "adoption__v", label: "Adoption", isActive: true },
            { name: "loyalty__v", label: "Loyalty", isActive: true },
            { name: "advocacy__v", label: "Advocacy", isActive: true },
        ],
    },
	customer_journey_stage_activity__v: {
        channel__v: [
            { name: "face_to_face__v", label: "In-person", isActive: true },
            { name: "video__v", label: "Video", isActive: true },
            { name: "phone__v", label: "Phone", isActive: true },
            { name: "message__v", label: "Chat or Text", isActive: true },
            { name: "email__v", label: "Email", isActive: true },
            { name: "other__v", label: "Other", isActive: true },
        ]
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