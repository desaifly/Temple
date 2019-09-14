
export function hashQueryParameters(url) {

    return getUrlParameters(url, "#")
}

export function queryParameters(url) {
    //console.log('inside QueryParameter: ' + url);
    try { return getUrlParameters(url, "?"); } catch (err) { //console.log('inside QueryParameter Error'); 
    return undefined; }
}

function getUrlParameters(url, queryType) {
    
    let lets = {};
    if(url) {
        let hashes = url?url.split(queryType)[1]:"";
        let hash = hashes?hashes.split('&'):"";

        for (let i = 0; i < hash.length; i++) {
            let params = hash[i].split("=");
            lets[params[0]] = params[1];
            //console.log('Parameters: ' + params[0]);
        }
    }
    ////console.log('Parameters: ' + lets);
    return lets;
}

