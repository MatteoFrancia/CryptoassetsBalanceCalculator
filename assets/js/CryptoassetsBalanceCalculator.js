const corsProxyURL = "https://cors-anywhere.herokuapp.com/";
const red='#ff0000';
const green='#47e000';
const tableHeader = '<table border="2px solid black">'+
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

function getCryptoValues(btcWalletAddress, btcInvestment, ltcWalletAddress, ltcInvestment, emailAddress){  
	multiplier=0.00000001;
	btcInvestmentAmount = btcInvestment;
	ltcInvestmentAmount = ltcInvestment;

	const getBtcWalletBalance = () => $.get(corsProxyURL + 'https://api.blockcypher.com/v1/btc/main/addrs/'+btcWalletAddress+'/balance')
	.then(data => {
		btcWalletBalance = data.final_balance*multiplier;
		getLtcWalletBalance();
	});

	const getLtcWalletBalance = () => $.get(corsProxyURL + 'https://api.blockcypher.com/v1/ltc/main/addrs/'+ltcWalletAddress+'/balance')
	.then(data => {
		ltcWalletBalance = data.final_balance*multiplier;
		getBitcoinActualValue();
	});

	const getBitcoinActualValue = () => {

		$.getJSON(corsProxyURL + "https://api.kraken.com/0/public/Ticker?pair=BTCEUR", function(data) {
			btcActualValue = data.result.XXBTZEUR.o;
			getLitecoinActualValue();
		});
	}

	const getLitecoinActualValue = () => {

		$.getJSON(corsProxyURL + "https://api.kraken.com/0/public/Ticker?pair=LTCEUR", function(data) {
			ltcActualValue = data.result.XLTCZEUR.o;
			calculateWalletsValue();
		});
	}

	getBtcWalletBalance();
}

function calculateWalletsValue() {
	btcWalletValue = btcActualValue * btcWalletBalance;
	ltcWalletValue = ltcActualValue * ltcWalletBalance;
	calculateInvestmentsActualValue();
}

function calculateInvestmentsActualValue() {
	btcBalance = btcWalletValue - btcInvestmentAmount;
	ltcBalance = ltcWalletValue - ltcInvestmentAmount;
	totalBalance = btcBalance + ltcBalance;
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

	//makePostRequest("https://maker.ifttt.com/trigger/crypto_report/with/key/lvfPBqKSq-spKI3JIpICBp4pLJ7vowamhnbj__4crdt", postBody);
	openResultsPage(totalBalance.toFixed(2), btcInvestmentAmount, parseFloat(btcActualValue).toFixed(2), btcWalletBalance, parseFloat(btcWalletValue).toFixed(2), ltcInvestmentAmount, parseFloat(ltcActualValue).toFixed(2), ltcWalletBalance, parseFloat(ltcWalletValue).toFixed(2));
}

function openResultsPage(totalBalance, btcInvestmentAmount, btcActualValue, btcWalletBalance, btcWalletValue, ltcInvestmentAmount, ltcActualValue, ltcWalletBalance, ltcWalletValue) {
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