import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
//import { thArray, tdArray } from "variables/Variables.jsx";
import {contractAddress, contractAbi} from "variables/Variables.jsx";

import Web3 from 'web3';
const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");

web3.eth.defaultAccount = web3.eth.accounts[0];


var KolContract = new web3.eth.Contract(contractAbi.abi, contractAddress);

const thArray = [ "University", "Price Paid", "Current Owner"];
var tdArray = [];

KolContract.getPastEvents("BlockBought", { fromBlock: 0, toBlock: 'latest'}, 
function(error, events){ 
  events.forEach(function(log){
    var uni = log.returnValues.universityName;

    // bytes32 values
    if(uni === "0x1fe1cf5c703b4fa3de9ed350c265f6724bba1239ca09f9a4a2c335c26578adf9") {
      uni = "KCL";
    } else if(uni === "0x32ba5e2b8fcdd5fe478e11901eedc8e837e4932724698d55c94d97f8bb4b5693") {
      uni = "LSE";
    } else if(uni === "0xbe196f7453eabe8cf976201441818e7888cac83cd4c7cd0af844defd9f71f962") {
      uni = "IMP";
    } else if(uni === "0x0ddb0855c49d8a4028de6d72a5ea5f191e92a82f5b5a7cd0510b8523d857db49") {
      uni = "UCL";
    }
    
    
    
    var entry = [uni, log.returnValues.price, log.returnValues.newOwner];
    tdArray.push(entry);
  });
});





class TableList extends Component {
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Blocks Bought"
                category="Log of all transactions"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <thead>
                      <tr>
                        {thArray.map((prop, key) => {
                          return <th key={key}>{prop}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {tdArray.map((prop, key) => {
                        return (
                          <tr key={key}>
                            {prop.map((prop, key) => {
                              return <td key={key}>{prop}</td>;
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                }
              />
            </Col>
            {/*
            <Col md={12}>
              <Card
                plain
                title="Striped Table with Hover"
                category="Here is a subtitle for this table"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table hover>
                    <thead>
                      <tr>
                        {thArray.map((prop, key) => {
                          return <th key={key}>{prop}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {tdArray.map((prop, key) => {
                        return (
                          <tr key={key}>
                            {prop.map((prop, key) => {
                              return <td key={key}>{prop}</td>;
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                }
              />
            </Col>
              */}
          </Row>
        </Grid>
      </div>
    );
  }
}

export default TableList;
