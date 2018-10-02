import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";

import Card from "components/Card/Card";

import {contractAddress, contractAbi} from "variables/Variables.jsx";
import Web3 from 'web3';
const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");

web3.eth.defaultAccount = web3.eth.accounts[0];



var KolContract = new web3.eth.Contract(contractAbi.abi, contractAddress);

function kclClick() {
  console.log("kcl");
  KolContract.methods.buyBlock(0,0,"KCL", "https://i1.wp.com/chartcons.com/wp-content/uploads/Funny-Cat-Jokes2.jpg", "catz, yo", true)
  .send({from: "0xe369D86640F2e68590cA0632852034802e1cB59D", value: 80}, function(error, transactionHash){
    console.log("success, hash: " + transactionHash);
  });
};
function uclClick() {
  console.log("ucl")
  KolContract.methods.buyBlock(0,0,"UCL", "https://mymodernmet.com/wp/wp-content/uploads/2017/01/animal-selfies-12.jpg", "this is a pug, yo", false)
  .send({from: "0xe369D86640F2e68590cA0632852034802e1cB59D", value: 80}, function(error, transactionHash){
    console.log("success, hash: " + transactionHash);
  });
};
function impClick() {
  console.log("imp")
};
function lseClick() {
  console.log("lse")
};


class Icons extends Component {
  render() {
    return (
      <div className="content">
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
      </div>
    );
  }
}

export default Icons;
