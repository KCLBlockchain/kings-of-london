import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";

import Card from "components/Card/Card";

import {contractAddress, contractAbi} from "variables/Variables.jsx";
import Web3 from 'web3';
const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");

web3.eth.defaultAccount = web3.eth.accounts[0];



var KolContract = new web3.eth.Contract(contractAbi.abi, contractAddress);

// default uni to KCL
var selectedUni = "KCL";

function buyBlock() {
  console.log("bought");
  var imageURL = document.getElementById("formImageUrl").value;
  var description = document.getElementById("formDescription").value;
  var price = 80;

  KolContract.methods.buyBlock(0,0,selectedUni, imageURL, description, false)
  .send({from: "0xe369D86640F2e68590cA0632852034802e1cB59D", value: price}, function(error, transactionHash){
    console.log("success, hash: " + transactionHash);
  }); 
  showUni();
  document.getElementById("formImageUrl").value = "";
  document.getElementById("formDescription").value = "";
}

function hideUni(uniClicked) {
  selectedUni = uniClicked;
  document.getElementById("formUni").value= uniClicked;
  //document.getElementById("UniGrid").style.visibility= "hidden";
  document.getElementById("Form").style.visibility= "visible";
}
function showUni() {
  document.getElementById("UniGrid").style.visibility= "visible";
  document.getElementById("Form").style.visibility= "hidden";
}

function kclClick() {
  hideUni("KCL");
};
function uclClick() {
  hideUni("UCL");
};
function impClick() {
  hideUni("IMP");
};
function lseClick() {
  hideUni("LSE");
};


class Icons extends Component {
  render() {
    return (
      <div id="UniGrid" className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Pick your university"
                ctAllIcons
                category={
                  <span>
                    Start buying your blocks straight away{" "}
                    {/*
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="http://themes-pixeden.com/font-demos/7-stroke/index.html"
                    >
                      Pixeden
                    </a>
                    */}
                  </span>
                }
                content={
                  <Row>
                    <Col
                          lg={2}
                          md={3}
                          sm={4}
                          xs={6}
                        >
                    <div onClick={kclClick}>
                    <img src="https://alumni.kcl.ac.uk/image/2015-site/KCL_boxed_redcmyk_A4-002-3.gif" alt="KCL" height="100" width="140"></img>
                    </div>
                    </Col>

                    <Col
                          lg={2}
                          md={3}
                          sm={4}
                          xs={6}
                        >
                    <div onClick={lseClick}>
                    <img src="http://i1.sndcdn.com/avatars-000015621001-z8o3ny-original.png" alt="LSE" height="100" width="140"></img>
                    </div>
                    </Col>

                    <Col
                          lg={2}
                          md={3}
                          sm={4}
                          xs={6}
                        >
                    <div onClick={impClick}>
                    <img src="http://ammf.org.uk/wp-content/uploads/2017/03/Imperial-College-logo.png" alt="IMP" height="100" width="140"></img>
                    </div>
                    </Col>

                    <Col
                          lg={2}
                          md={3}
                          sm={4}
                          xs={6}
                        >
                    <div onClick={uclClick}>
                    <img src="https://www.sjcr.net/content/uploads/2018/02/ucl-logo.jpg" alt="UCL" height="80" width="120"></img>
                    </div>
                    </Col>

                  </Row>

                  /*
                  <Row>
                    {iconsArray.map((prop, key) => {
                      return (
                        <Col
                          lg={2}
                          md={3}
                          sm={4}
                          xs={6}
                          className="font-icon-list"
                          key={key}
                        >
                          <div className="font-icon-detail">
                            <i className={prop} />
                            <input type="text" defaultValue={prop} />
                          </div>
                        </Col>
                      );
                    })}
                  </Row>
                */
                }
              />
            </Col>
          </Row>
        </Grid>
        
         

        <div id="Form" class="invisible">
        <button onClick={showUni}>Close</button>
        {/*
            form code adapted from https://github.com/jurassix/react-validation-mixin/blob/master/spec/components/Signup.js
        */}
        <form className='form-horizontal'>
          <fieldset> 
          <div>
              <label htmlFor='firstName'>University</label>
              <input readonly="readonly" type='text' id='formUni' ref='firstName' onChange={console.log} onBlur={console.log} className='form-control' placeholder='University'/>
            </div>
            <div>
              <label htmlFor='firstName'>image URL</label>
              <input type='text' id='formImageUrl' ref='firstName' onChange={console.log} onBlur={console.log} className='form-control' placeholder='Image URL' />
            </div>
            <div>
              <label htmlFor='lastName'>Description</label>
              <input type='text' id='formDescription' ref='lastName' onChange={console.log} onBlur={console.log}  className='form-control' placeholder='Add a description to your block.' />
            </div>


            {/*
            <div>
              <label htmlFor='lastName'>For sale</label>
            <input type="checkbox" id="formForSale">Check to put block for sale</input>
            </div>
            

          
            <div>
              <label htmlFor='username'>Username</label>
              <input type='text' id='username' ref='username' onChange={console.log} onBlur={console.log} className='form-control' placeholder='Username' />
            </div>
            
            <div className='form-group'>
              <label htmlFor='referral'>How did you hear about us?</label>
              <label htmlFor='tv' className="radio-inline">
                <input type='checkbox' id="tv" ref='tv' name='referral' value='tv' checked={this.state.referral === 'tv'} onChange={this.onRadioChange('referral')}/>
                {' '}tv
              </label>
              <label htmlFor='radio' className="radio-inline">
                <input type='checkbox' id="radio" ref='radio' name='referral' value='radio' checked={this.state.referral === 'radio'} onChange={this.onRadioChange('referral')}/>
                {' '}radio
              </label>
              {this.props.getValidationMessages('referral').map(this.renderHelpText)}
            </div>
            <div className='form-group'>
              <label htmlFor='rememberMe'>
                Remember me{' '}
                <input type='checkbox' id='rememberMe' ref='rememberMe' value='on' checked={this.state.rememberMe === 'on'} onChange={this.onCheckboxChange('rememberMe')}/>
              </label>
              {this.props.getValidationMessages('rememberMe').map(this.renderHelpText)}
            </div>
            <div className='form-group'>
              <h3>{this.state.feedback}</h3>
            </div>
            <div className='text-center form-group'>
              <button type='submit' className='btn btn-large btn-primary'>Sign up</button>
              {' '}
              <button onClick={this.handleReset} className='btn btn-large btn-info'>Reset</button>
            </div>
      */}
          </fieldset>
        </form>
        <button onClick={buyBlock}>Buy Block</button> 
        </div>
      </div>
    );
  }
}

export default Icons;