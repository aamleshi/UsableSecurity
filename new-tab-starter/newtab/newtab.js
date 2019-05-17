var search = "";

function getQueryVariable(variable) {
    search = window.location.search.substring(1);
    console.log(search);
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
	var vars = getQueryVariable(variable).split('+');
	var ret_string = "";
	for (var i = 0; i < vars.length; i++) {
        ret_string += vars[i];
        ret_string += " ";
    }
    search = ret_string;
    return search;
}

console.log(getSearch('k'));