const filtersDefaultState = {
    "searchBy": '',
    "filterStatusBy": ''
};

export default (state = filtersDefaultState, action) => {
    switch (action.type) {

        // Spread out the state and overwrite the provided field (and then return the whole object). If a blank value is provided,
        // the filter is reset.
        case 'FILTER_STATUS_BY':
            return { ...state, "filterStatusBy": action.status };
        case "FILTER_By_SEARCH":
            return { ...state, "searchBy": action.search };
        default:
            return state;
    }
}

