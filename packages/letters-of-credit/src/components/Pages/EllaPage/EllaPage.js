import React, { Component } from 'react';
import './ellapage.css';
import axios from 'axios';
import Table from '../../Table/Table.js';


class EllaPage extends Component {
  constructor(props) {
		super(props);
		this.state = {
			userDetails: {},
      letters: [],
      switchUser: this.props.switchUser,
      callback: this.props.callback
		}
	}

	componentDidMount() {
    let cURL = 'http://localhost:3000/api/BankEmployee/' + this.props.user;
		axios.get(cURL)
		.then(response => {
			this.setState ({
				userDetails: response.data
      });
    })
    .catch(error => {
      console.log(error);
    });
    this.getLetters();
    this.openWebSocket();
	}

  getLetters() {
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

	openWebSocket() {
		let destroyed = false;

		console.log('Connecting to websocket... ');
		let websocket = new WebSocket('ws://localhost:3000');
		websocket.onopen = (() => {
			console.log('Websocket is open');
		});

		websocket.onclose = (() => {
			console.log('Websocket is closed');
			if(!destroyed) {
				this.openWebSocket();
			}
		});

		websocket.onmessage = ((event) => {
			this.getLetters();
		});
	}

  generateRow(i) {
    let submitter = "Alice Hamilton";
    let company = "QuickFix IT";
    if(this.state.letters[i].applicant === 'resource:org.acme.loc.Customer#bob') {
      submitter = "Bob Bobbins";
      company = "Conga Computers"
    }
    return (
			<tr className="row" onClick={() => this.props.callback(this.state.letters[i], false)}>
				<td className="blueText">{this.state.letters[i].letterId}</td>
				<td>{submitter}</td>
				<td>{company}</td>
				<td>{this.state.letters[i].status}</td>
			</tr>
		);
  }

  render() {
    if(this.state.userDetails.name) {
      let username = this.state.userDetails.name + ", Employee at " + this.state.userDetails.bankName;

      let rowsJSX = [];
      if(this.state.letters.length) {
        for(let i = 0; i < this.state.letters.length; i++) {
          rowsJSX.push(this.generateRow(i))
        }
      }

      return (
        <div id="ellaPageContainer" className="ellaPageContainer">
          <div id="ellaHeaderDiv" className="flexDiv ellaHeaderDiv">
            <span className="ellaUsername" onClick={() => {this.state.switchUser('bob')}}> {username} </span>
          </div>
          <div id="ellaWelcomeDiv" className="ellaWelcomeDiv">
            <h1> Welcome back {this.state.userDetails.name} </h1>
          </div>
          <div id="tableDiv">
            <Table rows={rowsJSX}/>
          </div>
        </div>
      );
    } else {
      return(
        <div id="ellaLoadingContainer" className="ellaPageContainer">
				  <span className="ellaLoadingSpan">Loading...</span>
        </div>
      );
    }
  }
}

export default EllaPage;
