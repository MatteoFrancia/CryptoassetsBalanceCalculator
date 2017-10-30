const red='#ff0000';
const green='#47e000';
const corsProxyURL = "https://cors-anywhere.herokuapp.com/";
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
const investedTitle = '<strong>INVESTED:</strong> ';
const actualValueTitle = '<strong>ACTUAL VALUE:</strong> ';
const walletValueTitle = '<strong>WALLET VALUE:</strong> ';
const walletTitle = '<strong>WALLET:</strong> ';
const balanceLineEnding = '<strong>BALANCE:</strong> ';
const euroLineEnding = ' &euro; <br>';
const btcLineEnding = ' BTC <br>';
const ltcLineEnding = ' LTC <br>';
const eur = ' &euro;';

var totalBalance='';
var btcInvestmentAmount='';
var btcActualValue='';
var btcWalletBalance='';
var btcWalletValue='';
var ltcInvestmentAmount='';
var ltcActualValue='';
var ltcWalletBalance='';
var ltcWalletValue='';
var report='';

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
var actualPercentage = 0;

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