var search = "";
var product = "";
var last_key = "";



function getQueryVariable(variable) {
    search = window.location.search.substring(1);
    console.log(search)
    var vars = search.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable);
}


function getSearch(variable) {
    if ((s = getQueryVariable(variable)) == null) {
        return null;
    }
	var vars = getQueryVariable(variable).split('+');
	var ret_string = "";
	for (var i = 0; i < vars.length; i++) {
        ret_string += vars[i];
        ret_string += " ";
    }
    search = ret_string;
    return search;
}

// GetQueryVariable and getSearch get the search variable

function getProduct() {
    if (document.getElementById("dp") == null) {
        return null;
    }
    var temp = document.getElementsByTagName('meta')[4].getAttribute('content');
    product = temp;
    return product
}


function addItem(value) {
    last_key = window.localStorage.getItem("last_key");
    if (last_key == null) {
        window.localStorage.setItem("last_key", "1");
        last_key = "1";
    }
    else {
        var temp = parseInt(last_key, 10) + 1;
        last_key = temp.toString(10);
        window.localStorage.setItem("last_key", last_key);
    }
    window.localStorage.setItem(last_key, value);
}

// addItem adds the query ([key: "number_of_search", value: "query"]) to the local history for amazon


var ret = getProduct();
if (ret != null) {
    addItem(ret);
    console.log(ret)
}
if (last_key == 10) {
    window.localStorage.clear();
}

