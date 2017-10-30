window.onload = function() {
	automagicity = GetURLParameter('automagic');

	if(automagicity) {
		btcWalletAddress = GetURLParameter('btcWalletAddress');
		btcInvestmentAmount = GetURLParameter('btcInvestmentAmount');
		ltcWalletAddress = GetURLParameter('ltcWalletAddress');
		ltcInvestmentAmount = GetURLParameter('ltcInvestmentAmount');

		document.getElementById("btcWalletAddress").value = btcWalletAddress;
		document.getElementById("btcInvestmentAmount").value = btcInvestmentAmount;
		document.getElementById("ltcWalletAddress").value = ltcWalletAddress;
		document.getElementById("ltcInvestmentAmount").value = ltcInvestmentAmount;

		document.getElementById('calculate').setAttribute("disabled", "");
		increaseProgressBar('retrieving page data...');

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

function increaseProgressBar(message) {
	totalSteps = 9;
	deltaStep = 100/totalSteps;
	actualPercentage += deltaStep;
	document.getElementById('progress-bar').setAttribute('style', 'width:' + actualPercentage + '%;');
	document.getElementById('progressbartext').innerHTML = '<span style="color:#ff0000;">' + message + '</span>'

}

function buildMailReport() {
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