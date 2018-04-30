import React, { Component } from 'react';
import '../../../stylesheets/css/main.css';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Table from '../../Table/Table.js';
import Config from '../../../utils/config';

class EllaPage extends Component {
  constructor(props) {
		super(props);
		this.state = {
			userDetails: {},
      letters: [],
      gettingLetters: false,
      switchUser: this.props.switchUser,
      callback: this.props.callback,
      redirect: false,
      redirectTo: '',
      isLetterOpen: false
		}
    this.handleOnClick = this.handleOnClick.bind(this);
    this.openLetter = this.openLetter.bind(this);
    this.config = new Config();
	}

  handleOnClick(user) {
    this.state.switchUser(user);
    this.setState({redirect: true, redirectTo: user});
  }

  openLetter(i) {
    this.props.callback(this.state.letters[i], false);
    this.setState({isLetterOpen: true, redirectTo: 'ella'});
  }

	componentDidMount() {
    // open a websocket
    this.connection = new WebSocket(this.config.webSocketURL);
    this.connection.onmessage = ((evt) => {
      this.getLetters();
    });

    // make rest calls
    let cURL = this.config.httpURL+'/BankEmployee/ella';
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
	}

  componentWillUnmount() {
    this.connection.close();
  }

  getLetters() {
		this.setState({gettingLetters: true});
		axios.get(this.config.httpURL+'/LetterOfCredit')
    .then(response => {
      // sort the LOCs by descending ID (will display the most recent first)
			response.data.sort((a,b) => b.letterId.localeCompare(a.letterId));
      this.setState ({
        letters: response.data,
        gettingLetters: false
			});
		})
		.catch(error => {
			console.log(error);
		});
  }

  generateStatus(letter) {
    let status = '';
    if (letter.status === 'AWAITING_APPROVAL') {
      if (!letter.approval.includes('ella')) {
        status = 'Awaiting approval from YOU';
      } else if (!letter.approval.includes('bob')) {
        status = 'Awaiting approval from Beneficiary';
      }
    } else {
      status = letter.status.toLowerCase();
      status = status.charAt(0).toUpperCase() + status.slice(1);
      status = ((letter.status === 'PAYMENT_MADE') ? status.replace(/_/g, ' ') : status);
    }
    return status;
  }

  generateRow(i) {
    // should only show LOCs that are ready for Ella to approve
    if (this.state.letters[i].approval.includes('matias')) {
      let submitter = "Alice Hamilton";
      let company = "QuickFix IT";
      if(this.state.letters[i].applicant === 'resource:org.acme.loc.Customer#bob') {
        submitter = "Bob Appleton";
        company = "Conga Computers"
      }
      let status = this.generateStatus(this.state.letters[i]);
      return (
		  	<tr className="row" onClick={() => this.openLetter(i)}>
		  		<td className="blueText">{this.state.letters[i].letterId}</td>
		  		<td>{submitter}</td>
		  		<td>{company}</td>
		  		<td>{status}</td>
		  	</tr>
      );
    } else {
      return <div/>;
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to={"/" + this.state.redirectTo} />;
    }
    else if(this.state.isLetterOpen) {
      return <Redirect push to={this.state.redirectTo + "/loc"} />;
    }

    if(this.state.userDetails.name && !this.state.gettingLetters) {
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
            <span className="ellaUsername"> {username} </span>
            {/* <div id="ellaMenu" className="ellaMenuItems">
              <span>Viewing All Business Acccounts</span>
            </div> */}
          </div>
          <div id="ellaWelcomeDiv" className="ellaWelcomeDiv">
            <span> {this.state.userDetails.bankName} </span>
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
