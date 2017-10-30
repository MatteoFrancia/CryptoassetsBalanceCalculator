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

function setBtcValues(){
    document.getElementById('btcOverview').innerHTML = 
    investedTitle + btcInvestmentAmount + euroLineEnding +
    actualValueTitle + btcActualValue + euroLineEnding +
    walletValueTitle + btcWalletBalance + btcLineEnding +
    walletTitle + btcWalletValue + euroLineEnding;

    document.getElementById('btcBalance').innerHTML = 
    balanceLineEnding + (btcWalletValue - btcInvestmentAmount).toFixed(2) + eur;

    var balanceClass = ((btcWalletValue - btcInvestmentAmount)>=0?'alert-success':'alert-danger');
    document.getElementById('btcBalance').classList.add(balanceClass);

}

function setLtcValues(){
    document.getElementById('ltcOverview').innerHTML = 
    investedTitle + ltcInvestmentAmount + euroLineEnding +
    actualValueTitle + ltcActualValue + euroLineEnding +
    walletValueTitle + ltcWalletBalance + ltcLineEnding +
    walletTitle + ltcWalletValue + euroLineEnding;

    document.getElementById('ltcBalance').innerHTML = 
    balanceLineEnding + (ltcWalletValue - ltcInvestmentAmount).toFixed(2) + eur;
    var balanceClass = ((ltcWalletValue - ltcInvestmentAmount)>=0?'alert-success':'alert-danger');
    document.getElementById('ltcBalance').classList.add(balanceClass);
}

function setTotalBalance() {
    document.getElementById('cardHeader').innerHTML = 
    '<img src="https://openclipart.org/image/2400px/svg_to_png/101407/pgb-chip-crypto-3.png" height="50px">'+
    ' TOTAL BALANCE: <span style="color: ' + (totalBalance>=0?green:red) + ';">' + totalBalance + eur +' </span>'

    var balanceClass = (totalBalance>=0?'border-success':'border-danger');
    document.getElementById('resultsCard').classList.add(balanceClass);
}