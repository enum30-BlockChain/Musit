const initialState = {
  loading: false,
  address: null,
  network: null,
  error: false,
  errorMsg: "",
};

const metamaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case "METAMASK_DATA_REQUEST":
      return {
        ...initialState,
        loading: true,
      };
    case "METAMASK_DATA_SUCCESS":
      return {
        ...initialState,
        loading: false,
        address: action.payload.address,
        network: action.payload.network,
      };
    case "METAMASK_DATA_FAILED":
      return {
        ...initialState,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    default:
      return state;
  }
};

export default metamaskReducer;
