import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import Config from '../../utils/config';
import '../../stylesheets/css/main.css';

class Step extends Component {
  constructor(props) {
		super(props);

		this.state = {
      stepType: this.props.stepType,
      stepNumber: this.props.stepNumber,
      stepMessage: this.props.stepMessage,
      stepPosition: this.props.stepPosition
		}

    this.config = new Config();
	}

  generateStep(){
    let stepJSX = [];
    console.log(this.state.stepPosition)
    let firstConnectorClass = this.state.stepPosition == "first" ? "blankStepConnector" : "stepConnector";
    let lastConnectorClass = this.state.stepPosition == "last" ? "blankStepConnector" : "stepConnector";
    if (this.state.stepType == "activeStep"){
      stepJSX.push(
        <div className="stepContainer">
          <div className="stepInfo">
            <div className="stepInfoMessage">
              <p className="stepNumberText">Step {this.state.stepNumber + 1}</p><br/>
              <p className="stepMessageText">{this.state.stepMessage}</p>
            </div>
            <div className="stepInfoTick"/>
          </div>
          <div className="nodeContainer">
            <div className={firstConnectorClass}/>
            <div className={this.state.stepType}/>
            <div className={lastConnectorClass}/>
          </div>
        </div>
      );
    }
    else {
      stepJSX.push(
        <div className="stepContainer">
          <div className="blankStepInfo"></div>
          <div className="nodeContainer">
            <div className={firstConnectorClass}/>
            <div className={this.state.stepType}/>
            <div className={lastConnectorClass}/>
          </div>
        </div>
      );
    }
    return stepJSX;
  }

  render() {
    let step = this.generateStep();
    return (
      <div>
        {step.map((jsx) => {
          return (jsx);
        })}
      </div>
    );
  }
}

export default Step;
