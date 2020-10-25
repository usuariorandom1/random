var contractAddress
var privateKey
var tronWeb
var pay
var addresact
var balanceact
const  fullNode = 'https://api.tronstack.io';
const  solidityNode = 'https://api.tronstack.io';
const  eventServer = '47.252.81.14:8070';

try {
  contractAddress = metacoinConfig.contractAddress
  tronWeb = new TronWeb(
      metacoinConfig.fullHost,
      metacoinConfig.fullHost,
      metacoinConfig.fullHost,
      metacoinConfig.privateKey
  )
} catch (err) {
  alert('The app looks not configured. Please run `npm run migrate`')
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

async function gettronweb() {
  if(window.tronWeb && window.tronWeb.defaultAddress.base58){
    localStorage.address = await window.tronWeb.defaultAddress.base58;
    if(localStorage.address != this.addresact) {
      // Store
      this.addresact = localStorage.address;
      // Retrieve
      console.log('Actualizada '+this.addresact);
    }
    else if(localStorage.address == 'TPL66VK2gCXNCD7EJg9pgJRfqcRazjhUZY') {
      console.log('Se actualizo Address');
      window.location.reload();
      // sleep(1000);
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
  {
    "constant": true,
    "inputs": [],
    "name": "totalinvested",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "totalInvestors",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "totalwithdrawn",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "withdraw",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "totalInvested",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getTime",
    "outputs": [
      {
        "name": "",
        "type": "uint40"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "subtracttime",
    "outputs": [
      {
        "name": "",
        "type": "uint40"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "totalref",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "name": "investors",
    "outputs": [
      {
        "name": "registered",
        "type": "bool"
      },
      {
        "name": "invested",
        "type": "uint256"
      },
      {
        "name": "withdrawn",
        "type": "uint256"
      },
      {
        "name": "totalRef",
        "type": "uint256"
      },
      {
        "name": "totalWithdrawable",
        "type": "uint256"
      },
      {
        "name": "initTime",
        "type": "uint40"
      },
      {
        "name": "ref",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "balance2owner",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "withdrawn",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "currentuser",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "timepay",
    "outputs": [
      {
        "name": "",
        "type": "uint40"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_levelUp",
        "type": "address"
      },
      {
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "deposits",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "profitowner",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "_from",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "_to",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "_beneficiary",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "Withdraw",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "_invest",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "Deposit",
    "type": "event"
  }
],

  init: async function () {

    
    // await gettronweb();
    // this.accounts
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
    
    async function balances() {

      const data = null;

      const xhr = new XMLHttpRequest();

      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
          var resp = JSON.parse(this.response);
          // console.log(resp.data[0].balance);
          $("#balance").text(resp.data[0].balance/1000000);
        }
      });

      xhr.open("GET", "https://api.trongrid.io/v1/accounts/"+localStorage.address);

      xhr.send(data);

      // tronWeb.trx.getBalance(localStorage.address).then(balance => {
      // console.log({balance});
      // }).catch(err => console.error(err));

    }
    
    
    async function refrescar() {

      await this.gettronweb();
      await balances();
      
      var totalref;
      var timepay;
      var totalinvestedUser;
      // var myContract = new XMLHttpRequest();
      let myContract = await tronWeb.contract().at(this.contractAddress);
      

      myContract.totalref().call().then(totalr => {
          this.totalref = parseInt(totalr);
          // console.log({totalref});
      }).catch(err => console.error(err));
      // await this.sleep(500);

      myContract.subtracttime().call().then(timep => {
          this.timepay = parseInt(timep);
          // console.log({timepay});
      }).catch(err => console.error(err));
      // await this.sleep(500);

      myContract.withdrawn().call().then(withdrawn => {
          this.withdrawn = parseInt(withdrawn);
          this.withdrawn = this.withdrawn/1000000;
          $("#withdwn").text(this.withdrawn);
          // console.log({withdrawn});
      }).catch(err => console.error(err));
      // await this.sleep(500);

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
    
    setInterval(refrescar, 3000)
    
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
