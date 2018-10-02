import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";
import "./Dashboard.css";
import Gallery from 'react-grid-gallery';


import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { Tasks } from "components/Tasks/Tasks.jsx";
import {
  dataPie,
  legendPie,
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales,
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar
} from "variables/Variables.jsx";

import {contractAddress, contractAbi} from "variables/Variables.jsx";


import Web3 from 'web3';
const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");

web3.eth.defaultAccount = web3.eth.accounts[0];

var KolContract = new web3.eth.Contract(contractAbi.abi, contractAddress);

var IMAGES = [];

KolContract.getPastEvents("BlockInformationUpdated", { fromBlock: 0, toBlock: 'latest'}, 
function(error, events){ 
  events.forEach(function(log){
    console.log(log);
    if(log.returnValues._forSale){
      var entry = {
        src: log.returnValues._imageURL,
        thumbnail: log.returnValues._imageURL,
        thumbnailWidth: 250,
        thumbnailHeight: 250,
        tags: [{value: "For Sale", title: "For Sale"}],
        caption: log.returnValues._description
      };
    } else {
      var entry = {
        src: log.returnValues._imageURL,
        thumbnail: log.returnValues._imageURL,
        thumbnailWidth: 250,
        thumbnailHeight: 250,
        caption: log.returnValues._description
      };
    }

    IMAGES.push(entry);
  });
});

/*
const IMAGES =
[{
  src: "https://alumni.kcl.ac.uk/image/2015-site/KCL_boxed_redcmyk_A4-002-3.gif",
  thumbnail: "https://alumni.kcl.ac.uk/image/2015-site/KCL_boxed_redcmyk_A4-002-3.gif",
  thumbnailWidth: 320,
  thumbnailHeight: 212,
  caption: "After Rain (Jeshu John - designerspics.com)",
},

{
  src: "",
  thumbnail: "https://www.ucl.ac.uk/cam/sites/cam/files/styles/large_image/public/migrated-images/ucl-logo-colours-notext.gif",
  thumbnailWidth: 320,
  thumbnailHeight: 212,
  caption: "Boats (Jeshu John - designerspics.com)"
},

{
  src: "https://www.doc.ic.ac.uk/~afd/homepages/images/logo_imperial_college_london.png",
  thumbnail: "https://www.doc.ic.ac.uk/~afd/homepages/images/logo_imperial_college_london.png",
  thumbnailWidth: 320,
  thumbnailHeight: 212
},

{
  src: "http://i1.sndcdn.com/avatars-000015621001-z8o3ny-original.png",
  thumbnail: "http://i1.sndcdn.com/avatars-000015621001-z8o3ny-original.png",
  thumbnailWidth: 320,
  thumbnailHeight: 212
}]
*/

/*
[{
        src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
        thumbnail: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 174,
        isSelected: false,
        caption: "After Rain (Jeshu John - designerspics.com)",
        statsIcon: "../../assets/img/faces/face-1.jpg"
},
{
        src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
        thumbnail: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 212,
        tags: [{value: "Ocean", title: "Ocean"}, {value: "People", title: "People"}],
        caption: "Boats (Jeshu John - designerspics.com)"
},

{
        src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
        thumbnail: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 212
}]
*/


class Dashboard extends Component {
  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }
  render() {
    return (
      <div className="content" >
          <div style={{backgroundImage: "../../assets/img/BuckinghamBackground.jpg"}}>
                <Gallery  images={IMAGES}/>
          </div>
      </div>
    );
  }
}

export default Dashboard;
