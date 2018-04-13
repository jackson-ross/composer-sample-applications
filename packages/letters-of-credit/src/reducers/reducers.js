import {combineReducers} from 'redux'
import * as actions from '../actions/actions'

const initialState = {
  applicant: {
    companyName: 'QuickFix IT',
    sortCode: '12-34-57',
    accNo: '54564351',
    bankName: 'Bank of Argentina'
  },
  beneficiary: {
    name: 'Bob',
    companyName: 'Conga Computers',
    sortCode: '98-76-21',
    accNo: '24689753',
    bankName: 'Central Bank of Belgium'
  },
  productDetails: {
    type: "",
    quantity: 0,
    pricePerUnit: 0,
    total: ""
  },
  rules: [
    {ruleText: "This is a rule"},
    {ruleText: "So is this"},
    {ruleText: "I love rules"}
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
