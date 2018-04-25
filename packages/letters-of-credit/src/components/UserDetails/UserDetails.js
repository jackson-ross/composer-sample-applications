import React, { Component } from 'react';
import '../../stylesheets/css/main.css';

class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      companyName: this.props.companyName,
      accountNumber: this.props.accountNumber,
      ibanNumber: this.props.ibanNumber,
    }
  }

  render() {
    let nameText = 'Name: ' ;
    let companyNameText = 'Company Name: ';
    let accountNumberText = 'Account Number: ';
    let ibanNumberText = 'IBAN Number: ';
    return (
      <div className="UserDetails">
        <h1>Business Account</h1>
        {nameText}<b>{this.state.name}</b><br/>
        {companyNameText}<b>{this.state.companyName}</b><br/>
        {accountNumberText}<b>{this.state.accountNumber}</b><br/>
        {ibanNumberText}<b>{this.state.ibanNumber}</b>
      </div>
    );
  }
}

export default UserDetails;
