////////////// FILTER ACTIONS

// IMPORTANT: only pass valid project statuses to this. If no value is passed, the filter is reset .

export const filterStatusBy = (status = '') => ({
    "type": "FILTER_STATUS_BY",
    status
});

export const filterBySearch = (search = '') => ({
    "type": "FILTER_By_SEARCH",
    search
});