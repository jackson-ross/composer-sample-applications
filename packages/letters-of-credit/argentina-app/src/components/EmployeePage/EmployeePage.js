import React, { Component } from 'react';
import './employeepage.css';
import axios from 'axios';
import Table from '../Table/Table.js';


class EmployeePage extends Component {
  constructor(props) {
		super(props)
		this.state = {
			userDetails: {},
      letters: [],
      switchUser: this.props.switchUser,
      callback: this.props.callback
		}
	}

	componentDidMount() {
		axios.get('http://localhost:3000/api/BankEmployee/matias')
		.then(response => {
			this.setState ({
				userDetails: response.data
      });
    })
    .catch(error => {
      console.log(error);
    });
    axios.get('http://localhost:3000/api/LetterOfCredit')
    .then(response => {
      this.setState ({
        letters: response.data
      });
    })
    .catch(error => {
      console.log(error);
    });
	}

  generateRow(i) {
    return (
			<tr className="row" onClick={() => this.props.callback(this.state.letters[i], false)}>
				<td className="blueText">{this.state.letters[i].letterId}</td>
				<td>Alice Hamilton</td>
				<td>QuickFix IT</td>
				<td>Yesterday</td>
				<td>{this.state.letters[i].status}</td>
			</tr>
		);
  }

  render() {
    if(this.state.userDetails.name) {
      let username = this.state.userDetails.name + ", Employee at  " + this.state.userDetails.bankName;

      let rowsJSX = [];
      if(this.state.letters.length) {
        for(let i = 0; i < this.state.letters.length; i++) {
          rowsJSX.push(this.generateRow(i))
        }
      }

      return (
        <div id="employeePageContainer" className="ePageContainer">
          <div id="eHeaderDiv" className="flexDiv eHeaderDiv">
            <span className="eUsername" onClick={this.state.switchUser}> {username} </span>
            <div id="eMenu" className="eMenuItems">
              <span> Change account details </span>
              <span> View Transaction History </span>
              <span> Make Transaction </span>
              <span> Viewing all Business Acccounts </span>
            </div>
          </div>
          <div id="eWelcomeDiv" className="eWelcomeDiv">
            <h1> Welcome back {this.state.userDetails.name} </h1>
          </div>
          <div id="tableDiv">
            <Table rows={rowsJSX}/>
          </div>
        </div>
      );
    } else {
      return(
        <div id="eLoadingContainer" className="ePageContainer">
				  <span className="eLoadingSpan">Loading...</span>
        </div>
      );
    }
  }
}

export default EmployeePage;
