import React, { Component } from 'react';
import './App.css';
import Page from './components/Page/Page.js';
import LetterOfCredit from './components/LetterOfCredit/LetterOfCredit.js';
import CustomerPage from './components/CustomerPage/CustomerPage.js';
import EmployeePage from './components/EmployeePage/EmployeePage.js';

const sampleLetter = {
  letterId: '123456',
  date: '08/03/2018',
  applicant: {
    name: 'Alice',
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
    type: 'Computers',
    quantity: 100,
    unitPrice: '£100',
    totalPrice: '£10000'
  },
  rules: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Praesent blandit libero in condimentum facilisis.', 'Aliquam vitae nibh et nisl mollis euismod eget vel justo.', 'Nullam vel turpis tincidunt, cursus metus id, aliquet enim.', 'Nunc ac mauris at dolor vehicula fermentum.', 'Duis pharetra arcu eu metus vehicula pellentesque.']
};

const pageContents = {
  CUSTOMER: "CUSTOMER",
  EMPLOYEE: "EMPLOYEE",
  LOC: "LOC"
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentPage: pageContents.CUSTOMER,
      currentLetter: {},
      currentUser: "Alice"
    };
    this.goToCustomerScreen = this.goToCustomerScreen.bind(this);
    this.goToEmployeeScreen = this.goToEmployeeScreen.bind(this);
    this.goToLetterScreen = this.goToLetterScreen.bind(this);
    this.backFromLetterScreen = this.backFromLetterScreen.bind(this);
  }

  goToLetterScreen(letter, isApply) {
    this.setState({
      currentPage: pageContents.LOC,
      currentLetter: letter,
      isApply: isApply
    });
  }

  backFromLetterScreen(user) {
    if(user === "Alice") {
      this.goToCustomerScreen();
    } else {
      this.goToEmployeeScreen();
    }
  }

  goToCustomerScreen() {
    this.setState({
      currentPage: pageContents.CUSTOMER,
      currentUser: "Alice"
    })
  }

  goToEmployeeScreen() {
    this.setState({
      currentPage: pageContents.EMPLOYEE,
      currentUser: "Matias"
    });
  }

  render() {
    let locPageContents = (
      <LetterOfCredit letter={this.state.currentLetter} date={sampleLetter.date} applicant={sampleLetter.applicant} beneficiary={sampleLetter.beneficiary} rules={sampleLetter.rules} callback={this.backFromLetterScreen} isApply={this.state.isApply} user={this.state.currentUser}/>
    );

    let pageToShow;

    if(this.state.currentPage === pageContents.CUSTOMER) {
      pageToShow = (
        <CustomerPage switchUser={this.goToEmployeeScreen} callback={this.goToLetterScreen}/>
      );
    } else if(this.state.currentPage === pageContents.EMPLOYEE) {
      pageToShow = (
        <EmployeePage switchUser={this.goToCustomerScreen} callback={this.goToLetterScreen}/>
      );
    } else {
      pageToShow = (
        <Page contents={locPageContents} />
      );
    }
    return pageToShow;
  }
}

export default App;
