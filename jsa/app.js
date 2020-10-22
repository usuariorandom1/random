var contractAddress
var privateKey
var tronWeb
var pay
var addresact
const  fullNode = 'https://api.trongrid.io:8090';
const  solidityNode = 'https://api.trongrid.io:8091';
const  eventServer = 'https://api.trongrid.io';


try {
  contractAddress = metacoinConfig.contractAddress
  privateKey = metacoinConfig.privateKey
  tronWeb = require('tronweb')(
      fullNode,
      solidityNode,
      eventServer,
      privateKey
  )
} catch (err) {
  // console.log(err);
  // alert('The app looks not configured. Please run `npm run migrate`')
}

/**
 * @param String name
 * @return String
 */
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

$("#Referral").val(window.location.hostname+'?ref=');

async function gettronweb(){ 
  if(window.tronWeb && window.tronWeb.defaultAddress.base58){
    localStorage.address = await window.tronWeb.defaultAddress.base58;
    if(localStorage.address != this.addresact) {
      // Store
      this.addresact = localStorage.address;
      // Retrieve
      console.log('actualizada '+this.addresact);
    } 
    else if(localStorage.address == 'TPL66VK2gCXNCD7EJg9pgJRfqcRazjhUZY'){
      location.reload();
      sleep(1000);
      localStorage.address = await window.tronWeb.defaultAddress.base58;
      this.addresact = localStorage.address;
    }
  }
}

function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

App = {
  tronWebProvider: null,
  contracts: {},
  accounts: [],
  contractAddress: contractAddress,
  privateKey: privateKey,
  feeLimit: 100000000,
  callValue: 0,

  abi: [
  {"entrys":[{"outputs":[{"type":"uint256"}],"constant":true,"name":"totalinvested","stateMutability":"View","type":"Function"},{"outputs":[{"type":"uint256"}],"constant":true,"name":"totalInvestors","stateMutability":"View","type":"Function"},{"outputs":[{"type":"uint256"}],"constant":true,"name":"totalwithdrawn","stateMutability":"View","type":"Function"},{"name":"withdraw","stateMutability":"Nonpayable","type":"Function"},{"outputs":[{"type":"uint256"}],"constant":true,"name":"totalInvested","stateMutability":"View","type":"Function"},{"outputs":[{"type":"uint40"}],"constant":true,"name":"getTime","stateMutability":"View","type":"Function"},{"outputs":[{"type":"uint40"}],"constant":true,"name":"subtracttime","stateMutability":"View","type":"Function"},{"outputs":[{"type":"uint256"}],"constant":true,"name":"totalref","stateMutability":"View","type":"Function"},{"outputs":[{"name":"registered","type":"bool"},{"name":"invested","type":"uint256"},{"name":"withdrawn","type":"uint256"},{"name":"totalRef","type":"uint256"},{"name":"totalWithdrawable","type":"uint256"},{"name":"initTime","type":"uint40"},{"name":"ref","type":"address"}],"constant":true,"inputs":[{"type":"address"}],"name":"investors","stateMutability":"View","type":"Function"},{"outputs":[{"type":"uint256"}],"constant":true,"name":"balance2owner","stateMutability":"View","type":"Function"},{"outputs":[{"type":"uint256"}],"constant":true,"name":"withdrawn","stateMutability":"View","type":"Function"},{"outputs":[{"type":"address"}],"constant":true,"name":"currentuser","stateMutability":"View","type":"Function"},{"outputs":[{"type":"uint40"}],"constant":true,"name":"timepay","stateMutability":"View","type":"Function"},{"payable":true,"inputs":[{"name":"_levelUp","type":"address"},{"name":"amount","type":"uint256"}],"name":"deposits","stateMutability":"Payable","type":"Function"},{"outputs":[{"type":"uint256"}],"constant":true,"name":"profitowner","stateMutability":"View","type":"Function"},{"payable":true,"stateMutability":"Payable","type":"Constructor"},{"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"Transfer","type":"Event"},{"inputs":[{"indexed":true,"name":"_beneficiary","type":"address"},{"name":"amount","type":"uint256"}],"name":"Withdraw","type":"Event"},{"inputs":[{"indexed":true,"name":"_invest","type":"address"},{"name":"_value","type":"uint256"}],"name":"Deposit","type":"Event"}]}

  ],

  
  init: async function () {

    
    // await gettronweb();
    // await sleep(3000);
      
    ///await sleep(3000);
	  
    this.initData();
    this.bindEvents();
  },

  
  initData: function () {
    var c = 0
    
    function reset() {
      c++;
      if (c == 2) {
        $("#loading").css({display: 'none'});
        $("#commit").attr('disabled', null);
      }
    }
    
    

    async function refrescar() {

      await this.gettronweb();
      // await this.sleep(1000);

      var totalref;
      var timepay;
      var totalinvestedUser;
      // var myContract = new XMLHttpRequest();
      let myContract = await tronWeb.contract().at(this.contractAddress);
      
	    
      myContract.totalref().call().then(totalr => {
          this.totalref = parseInt(totalr);
          // console.log({totalref});
      }).catch(err => console.error(err));
      this.sleep(500);

      myContract.subtracttime().call().then(timep => {
          this.timepay = parseInt(timep);
          // console.log({timepay});
      }).catch(err => console.error(err));
      this.sleep(500);
	    
      myContract.withdrawn().call().then(withdrawn => {
          withdrawn = parseInt(withdrawn);
          $("#withdwn").text(withdrawn/1000000);
          // console.log({withdrawn});
      }).catch(err => console.error(err));
      await this.sleep(500);

      myContract.totalinvested().call().then(totalinvestedUs => {
          this.totalinvestedUser = totalinvestedUs;
          $("#totalinvest").text(this.totalinvestedUser/1000000);
          // console.log(this.totalinvestedUser);
      }).catch(err => console.error(err));
      
      var payuser = (this.totalinvestedUser* 20 / 1000);
      
      payuser = payuser / 86400;
      payuser = (payuser * this.timepay);
      payuser = payuser + this.totalref;
      payuser = payuser / 1000000;
      this.pay = payuser;
      payuser = payuser.toFixed(6);
      
      $("#profit").text(payuser);
      // console.log(this.pay);
    var referido = getParameterByName('ref')
      
  		if(addresact == '') {
  		  var locat = window.location+'?ref=';
  		  $("#Referral").val(locat);
  		}
      else{
        var locat = window.location.hostname+'?ref='+addresact;
        $("#Referral").val(locat);
      }
    }
	  
    const balance = tronWeb.trx.getBalance('TEu6ub6vq3KWcHgGTkaFPnGW4vFZTL1sMq');
    this.sleep(30000);
    console.log({balance});
	  
    setInterval(refrescar, 1000);
    
  },

  deposit: async function() {
  	var that = this;
  	var referido = getParameterByName('ref');
    if(referido === ''){
       referido = this.contractAddress;
    };
 
  	const monto = parseInt($("#monto").val() || 0);
  	const montototal = monto * 1000000;
  	
  	$("#commit").attr('disabled', 'disabled')
  	
  	let myContract = await tronWeb.contract().at(this.contractAddress)
  	let getData = await myContract.deposits(referido, montototal).send({
	    feeLimit:100_000_000,
	    callValue:montototal,
  		tokenId:0,
  		tokenValue:0,
  		shouldPollResponse:true
  	});
    //console.log({getData});
    that.initData();
  },

  withdraw: async function () {
    var that = this;
    var profit = pay;
    
    if(profit > 0) {
    	let myContract = await tronWeb.contract().at(this.contractAddress);
	    let Data = await myContract.withdraw().send();
	    //console.log({Data});
	    that.initData();
    }
    else {
	    alert('Your balance is insufficient to withdraw!')
    }
  },

  transfer: function () {
    var that = this;
    var count = $("#dev_count").val() || 0;
    const to = this.accounts[1];
    const amount = parseInt(count);
    $("#loading").css({display: 'block'});
    $("#dev_count").val('')
    $("#commit").attr('disabled', 'disabled')
    this.triggerContract('sendCoin', [to, amount], function () {
      that.initData();
    });
  },
  getContract: function (address, callback) {
    tronWeb.getContract(address).then(function (res) {
      callback && callback(res);
    });
  },
  triggerContract: async function (methodName, args, callback) {
    let myContract = await tronWeb.contract().at(this.contractAddress)
    var callSend = 'send'
    this.abi.forEach(function (val) {
      if (val.name === methodName) {
        callSend = /payable/.test(val.stateMutability) ? 'send' : 'call'
      }
    })
  },

  initTronWeb: function () {
    /*
     * Replace me...
     */

    return this.initContract();
  },

  initContract: function () {
    /*
     * Replace me...
     */

    return this.bindEvents();
  },

  bindEvents: function () {
    var that = this;
    $(document).on('click', '#commit', function () {
      that.deposit();
    });
    $(document).on('click', '#withdraw', function () {
      that.withdraw();
    });
  },

  markAdopted: function (adopters, account) {
    /*
     * Replace me...
     */
  },

  handleAdopt: function (event) {
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));

    /*
     * Replace me...
     */
  }
};

$(function () {
  //$(window).onload(function () {
  $(window).on("load",function(){
    App.init();
  });
});
