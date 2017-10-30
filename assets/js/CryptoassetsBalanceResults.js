const red='#ff0000';
const green='#47e000';

var totalBalance='';
var btcInvestmentAmount='';
var btcActualValue='';
var btcWalletBalance='';
var btcWalletValue='';
var ltcInvestmentAmount='';
var ltcActualValue='';
var ltcWalletBalance='';
var ltcWalletValue='';

window.onload = function() {
    totalBalance = GetURLParameter('totalBalance');
    btcInvestmentAmount = GetURLParameter('btcInvestmentAmount');
    btcActualValue = GetURLParameter('btcActualValue');
    btcWalletBalance = GetURLParameter('btcWalletBalance');
    btcWalletValue = GetURLParameter('btcWalletValue');
    ltcInvestmentAmount = GetURLParameter('ltcInvestmentAmount');
    ltcActualValue = GetURLParameter('ltcActualValue');
    ltcWalletBalance = GetURLParameter('ltcWalletBalance');
    ltcWalletValue = GetURLParameter('ltcWalletValue');

    setBtcValues();
    setLtcValues();
    setTotalBalance();
};

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

function setBtcValues(){
    document.getElementById('btcOverview').innerHTML = 
    '<strong>INVESTED:</strong> '+ btcInvestmentAmount +' &euro; <br>'+
    '<strong>ACTUAL VALUE:</strong> ' + btcActualValue + ' &euro; <br>'+
    '<strong>WALLET VALUE:</strong> '+ btcWalletBalance + ' BTC <br>'+
    '<strong>WALLET:</strong> ' + btcWalletValue + ' &euro; <br>';

    document.getElementById('btcBalance').innerHTML = 
    '<strong>BALANCE:</strong> '+ (btcWalletValue - btcInvestmentAmount).toFixed(2) +' &euro;';

    var balanceClass = ((btcWalletValue - btcInvestmentAmount)>=0?'alert-success':'alert-danger');
    document.getElementById('btcBalance').classList.add(balanceClass);

}

function setLtcValues(){
    document.getElementById('ltcOverview').innerHTML = 
    '<strong>INVESTED:</strong> '+ ltcInvestmentAmount +' &euro; <br>'+
    '<strong>ACTUAL VALUE:</strong> ' + ltcActualValue + ' &euro; <br>'+
    '<strong>WALLET VALUE:</strong> '+ ltcWalletBalance + ' LTC <br>'+
    '<strong>WALLET:</strong> ' + ltcWalletValue + ' &euro; <br>';

    document.getElementById('ltcBalance').innerHTML = 
    '<strong>BALANCE:</strong> '+ (ltcWalletValue - ltcInvestmentAmount).toFixed(2) +' &euro;';
    var balanceClass = ((ltcWalletValue - ltcInvestmentAmount)>=0?'alert-success':'alert-danger');
    document.getElementById('ltcBalance').classList.add(balanceClass);
}

function setTotalBalance() {
    document.getElementById('cardHeader').innerHTML = 
    '<img src="https://openclipart.org/image/2400px/svg_to_png/101407/pgb-chip-crypto-3.png" height="50px">'+
    ' TOTAL BALANCE: <span style="color: ' + (totalBalance>=0?green:red) + ';">' + totalBalance + ' &euro; </span>'

    var balanceClass = (totalBalance>=0?'border-success':'border-danger');
    document.getElementById('resultsCard').classList.add(balanceClass);
}