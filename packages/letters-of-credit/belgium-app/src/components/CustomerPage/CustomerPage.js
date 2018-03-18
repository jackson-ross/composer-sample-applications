import React, { Component } from 'react';
import './customerpage.css';
import axios from 'axios';
import UserDetails from '../UserDetails/UserDetails.js';
import Alert from '../Alert/Alert.js';
import LoCCard from '../LoCCard/LoCCard.js';
import LoCApplyCard from '../LoCCard/LoCApplyCard.js';

class CustomerPage extends Component {
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
		axios.get('http://localhost:3000/api/Customer/bob')
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

	generateCard(i) {
		return (
      <LoCCard letter={this.state.letters[i]} callback={this.state.callback} pageType={"view"}/>
    );
  }

  render() {
		if(this.state.userDetails.name) {
			let username = this.state.userDetails.name + ", Customer of " + this.state.userDetails.bankName;

    	let cardsJSX = [];
    	if(this.state.letters.length) {
				for(let i = 0; i < this.state.letters.length; i++) {
					cardsJSX.push(this.generateCard(i));
				}
			}

			return (
    		<div id="customerPageContainer" className="cPageContainer">
    		  <div id="cHeaderDiv" className="flexDiv cHeaderDiv">
    		    <span className="cUsername" onClick={this.state.switchUser}> {username} </span>
    		  </div>
          <div class="cWelcomeDiv">
            <p id="welcomeMessage">Welcome back {this.state.userDetails.name}</p>
            <h1 id ="accountBalance">£15,670</h1>
          </div>
    		  <div id="infoDiv" className="flexDiv infoDiv">
    		    <div id="cDetailsDiv" className="cDetailsDiv">
    		      <UserDetails name={this.state.userDetails.name} companyName={this.state.userDetails.companyName} sortCode={'12-34-57'} accountNumber={'54564351'}/>
						</div>

					</div>
    		  <div className="locDiv">
    		    <LoCApplyCard callback={this.state.callback} />
						{cardsJSX}
    		  </div>
				</div>
			);
  	} else {
			return (
			<div id="cLoadingContainer" className="cPageContainer">
				<span className="loadingSpan">Loading...</span>
			</div>
			);
		}
	}
}

export default CustomerPage;
