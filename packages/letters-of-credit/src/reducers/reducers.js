import {combineReducers} from 'redux'
import * as actions from '../actions/actions'

const initialState = {
  applicant: {
    name: 'Alice Hamilton',
    companyName: 'QuickFix IT',
    sortCode: '12-34-57',
    accNo: '54564351',
    bankName: 'Bank of Argentina'
  },
  beneficiary: {
    name: 'Bob Bobbins',
    companyName: 'Conga Computers',
    sortCode: '98-76-21',
    accNo: '24689753',
    bankName: 'Central Bank of Belgium'
  },
  productDetails: {
    type: "",
    quantity: "",
    pricePerUnit: "",
    total: ""
  },
  rules: [
    {ruleText: "The correct quantity of product has been delivered."},
    {ruleText: "The product was received within 30 days of the placement of the order."},
    {ruleText: "The product is not damaged and functions as expected."}
  ]
}

const getLetterInputReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_APPLICANT:
      return { ...state, applicant: action.payload };
    case actions.GET_BENEFICIARY:
      return { ...state, beneficiary: action.payload };
    case actions.GET_PRODUCT_DETAILS:
      return { ...state, productDetails: action.payload };
    case actions.GET_RULES:
      return { ...state, rules: [...state.rules, action.payload] };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
   getLetterInputReducer
})

export default rootReducer;
