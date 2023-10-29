function getProportions(){
    document.cookie = "userid=70560991";

    var req = $.ajax({
        type: "GET",
        url: "getTransactions.php",
        async: false
    });
    //console.log(req.responseText)
    var response = JSON.parse(req.responseText);
    var credDict = {"Shopping": 0,
    "Auto & Transport": 0,
    "Entertainment": 0,
    "Food & Dining": 0,
    "Education": 0

    };
    var debDict = {"Shopping": 0,
    "Auto & Transport": 0,
    "Entertainment": 0,
    "Food & Dining": 0,
    "Education": 0};
    for(let i = 0; i < response["Transactions"].length; i++){
        if(response["Transactions"][i]["creditDebitIndicator"]=="Debit"){
            //console.log(typeof debDict[response["Transactions"][i]["category"]]);
            debDict[response["Transactions"][i]["merchant"]["category"]] += response["Transactions"][i]["amount"];

        }
        else{
            credDict[response["Transactions"][i]["merchant"]["category"]] += response["Transactions"][i]["amount"];
        }
    }

    return [debDict, credDict];
}
