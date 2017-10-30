const corsProxyURL = "https://cors-anywhere.herokuapp.com/";
const red='#ff0000';
const green='#47e000';
const tableHeader = 
'<table border="2px solid black">'+
'<tr><td></td>'+
'<td><strong>INVESTED</strong></td>'+
'<td><strong>ACTUAL VALUE</strong></td>'+
'<td><strong>WALLET VALUE</strong></td>'+
'<td><strong>WALLET</strong></td>'+
'<td><strong>BALANCE</strong></td>'+
'</tr><tr><td><img src="https://www.belgacoin.com/file.jsp?f=bitcoin" height="30px">';
const middleLine='</td><td>';
const lineEnding='</td></tr>';
const ltcRow='<tr><td><img src="https://upload.wikimedia.org/wikipedia/commons/f/f8/LTC-400.png" height="30px">';
const talbleEnding='</table>';
const spanStyle = '<span style="color: ';
const spanEnd = '</span>';
const tagStyleEnd = ';">'
const eur = '€';

var btcInvestmentAmount = 0;
var btcWalletBalance=0;
var btcActualValue=0;
var btcWalletValue=0;
var btcBalance=0;

var ltcInvestmentAmount = 0;
var ltcWalletBalance=0;
var ltcActualValue=0;
var ltcWalletValue=0;
var ltcBalance=0;

var totalBalance=0;
var report='';
var actualPercentage = 0;

window.onload = function() {
	automagicity = GetURLParameter('automagic');

	if(automagicity) {
		btcWalletAddress = GetURLParameter('btcWalletAddress');
		btcInvestmentAmount = GetURLParameter('btcInvestmentAmount');
		ltcWalletAddress = GetURLParameter('ltcWalletAddress');
		ltcInvestmentAmount = GetURLParameter('ltcInvestmentAmount');

		getCryptoValues(btcWalletAddress, btcInvestmentAmount, ltcWalletAddress, ltcInvestmentAmount);
	}
};

function CryptoAssetsCalc() {
	var btcWalletAddress = document.getElementById("btcWalletAddress").value;
	var btcInvestmentAmount = document.getElementById("btcInvestmentAmount").value;
	var ltcWalletAddress = document.getElementById("ltcWalletAddress").value;
	var ltcInvestmentAmount = document.getElementById("ltcInvestmentAmount").value;

	document.getElementById('calculate').setAttribute("disabled", "");
	increaseProgressBar('retrieving page data...');

	getCryptoValues(btcWalletAddress, btcInvestmentAmount, ltcWalletAddress, ltcInvestmentAmount);
}

function GetURLParameter(sParam){
	var sPageURL = window.location.search.substring(1);
	var sURLVariables = sPageURL.split('&');
	for (var i = 0; i < sURLVariables.length; i++){
		var sParameterName = sURLVariables[i].split('=');
		if (sParameterName[0] == sParam)
		{
			return sParameterName[1];
		}
	}
}

function getCryptoValues(btcWalletAddress, btcInvestment, ltcWalletAddress, ltcInvestment){  
	increaseProgressBar('Getting BTC wallet Balance...');
	multiplier=0.00000001;
	btcInvestmentAmount = btcInvestment;
	ltcInvestmentAmount = ltcInvestment;

	const getBtcWalletBalance = () => $.get(corsProxyURL + 'https://api.blockcypher.com/v1/btc/main/addrs/'+btcWalletAddress+'/balance')
	.then(data => {
		btcWalletBalance = data.final_balance*multiplier;
		increaseProgressBar('Getting LTC wallet Balance...');
		getLtcWalletBalance();
	});

	const getLtcWalletBalance = () => $.get(corsProxyURL + 'https://api.blockcypher.com/v1/ltc/main/addrs/'+ltcWalletAddress+'/balance')
	.then(data => {
		ltcWalletBalance = data.final_balance*multiplier;
		increaseProgressBar('Retreiving BTC actual value...');
		getBitcoinActualValue();
	});

	const getBitcoinActualValue = () => {

		$.getJSON(corsProxyURL + "https://api.kraken.com/0/public/Ticker?pair=BTCEUR", function(data) {
			btcActualValue = data.result.XXBTZEUR.o;
			increaseProgressBar('Retreiving LTC actual value...');
			getLitecoinActualValue();
		});
	}

	const getLitecoinActualValue = () => {

		$.getJSON(corsProxyURL + "https://api.kraken.com/0/public/Ticker?pair=LTCEUR", function(data) {
			ltcActualValue = data.result.XLTCZEUR.o;
			increaseProgressBar('Calculating wallets value...');
			calculateWalletsValue();
		});
	}

	getBtcWalletBalance();
}

function calculateWalletsValue() {
	btcWalletValue = btcActualValue * btcWalletBalance;
	ltcWalletValue = ltcActualValue * ltcWalletBalance;
	increaseProgressBar('calculating investments actual value...');
	calculateInvestmentsActualValue();
}

function calculateInvestmentsActualValue() {
	btcBalance = btcWalletValue - btcInvestmentAmount;
	ltcBalance = ltcWalletValue - ltcInvestmentAmount;
	totalBalance = btcBalance + ltcBalance;
	increaseProgressBar('Building report...');
	buildReport();
}

function buildReport() {
	report=
	'<strong>TOTAL BALANCE: </strong>'
	+
	spanStyle + (totalBalance>=0?green:red) + tagStyleEnd
	+
	totalBalance.toFixed(2)+eur
	+
	spanEnd
	+
	'<br><br>'
	+
	tableHeader
	+
	middleLine
	+
	btcInvestmentAmount+eur
	+
	middleLine
	+
	parseFloat(btcActualValue).toFixed(2)+eur
	+
	middleLine
	+
	btcWalletBalance
	+
	middleLine
	+
	parseFloat(btcWalletValue).toFixed(2)+eur
	+
	middleLine
	+
	spanStyle + (btcBalance>=0?green:red)+tagStyleEnd
	+
	btcBalance.toFixed(2)+eur
	+
	spanEnd
	+
	lineEnding
	+
	ltcRow
	+
	middleLine
	+
	ltcInvestmentAmount+eur
	+
	middleLine
	+
	parseFloat(ltcActualValue).toFixed(2)+eur
	+
	middleLine
	+
	ltcWalletBalance
	+
	middleLine
	+
	parseFloat(ltcWalletValue).toFixed(2)+eur
	+
	middleLine
	+
	spanStyle + (ltcBalance>=0?green:red) + tagStyleEnd
	+
	ltcBalance.toFixed(2)+eur
	+
	spanEnd
	+
	lineEnding
	+
	talbleEnding;

	postBody='{ "value1" : "'+report+'", "value2" : "", "value3" : "" }';

	openResultsPage(totalBalance.toFixed(2), btcInvestmentAmount, parseFloat(btcActualValue).toFixed(2), btcWalletBalance, parseFloat(btcWalletValue).toFixed(2), ltcInvestmentAmount, parseFloat(ltcActualValue).toFixed(2), ltcWalletBalance, parseFloat(ltcWalletValue).toFixed(2));
}

function openResultsPage(totalBalance, btcInvestmentAmount, btcActualValue, btcWalletBalance, btcWalletValue, ltcInvestmentAmount, ltcActualValue, ltcWalletBalance, ltcWalletValue) {
	increaseProgressBar('Opening results page');
	resultUrl = 
	'results.html?totalBalance='
	+
	totalBalance
	+
	'&btcInvestmentAmount='
	+
	btcInvestmentAmount
	+
	'&btcActualValue='
	+
	btcActualValue
	+
	'&btcWalletBalance='
	+
	btcWalletBalance
	+
	'&btcWalletValue='
	+
	btcWalletValue
	+
	'&ltcInvestmentAmount='
	+
	ltcInvestmentAmount
	+
	'&ltcActualValue='
	+
	ltcActualValue
	+
	'&ltcWalletBalance='
	+
	ltcWalletBalance
	+
	'&ltcWalletValue='
	+
	ltcWalletValue

	window.location = resultUrl;
}

function makePostRequest(url, body) {
	$.ajax({
		url: url,
		type: 'post',
		data: body,
		contentType: 'application/json',
		success: function(data) {
			console.log("success");
		}
	}).done(function(msg) {
		console.log('done');
	});
}

function increaseProgressBar(message) {
	totalSteps = 9;
	deltaStep = 100/totalSteps;
	actualPercentage += deltaStep;
	document.getElementById('progress-bar').setAttribute('style', 'width:' + actualPercentage + '%;');
	document.getElementById('progressbartext').innerHTML = '<span style="color:#ff0000;">' + message + '</span>'

}