import React, { Component } from 'react';
import '../../stylesheets/css/main.css';

class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      companyName: this.props.companyName,
      sortCode: this.props.sortCode,
      accountNumber: this.props.accountNumber
    }
  }

  render() {
    let nameText = 'Name: ' ;
    let companyNameText = 'Company Name: ';
    let sortCodeText = 'Sort Code: ';
    let accountNumberText = 'Account Number: ';
    return (
      <div className="UserDetails">
        <h1>Business Account</h1>
        {nameText}<b>{this.state.name}</b><br/>
        {companyNameText}<b>{this.state.companyName}</b><br/>
        {sortCodeText}<b>{this.state.sortCode}</b><br/>
        {accountNumberText}<b>{this.state.accountNumber}</b>
      </div>
    );
  }
}

export default UserDetails;
