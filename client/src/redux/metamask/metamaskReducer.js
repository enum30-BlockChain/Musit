const initialState = {
  loading: false,
  address: null,
  network: null,
  message: "",
  error: false,
  errorMsg: "",
};

const metamaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DATA_REQUEST":
      return {
        ...initialState,
        loading: true,
      };
    case "DATA_SUCCESS":
      return {
        ...initialState,
        loading: false,
        address: action.payload.address,
        network: action.payload.network,
      };
    case "DATA_FAILED":
      return {
        ...initialState,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    case "SUCCESS_SUBMIT_SALE":
      return {
        ...initialState,
        onSaleNfts: action.payload.onSaleNfts
    }
    default:
      return state;
  }
};

export default metamaskReducer;
