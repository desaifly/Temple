
var basePath = './config';

function request(verb, url, data) {

    return new Promise(function (response, reject) {



        var stateChange = function (xhr) {

            request = xhr.target;

            if (request.readyState !== 4) {

                return;

            }

            if ([200, 304].indexOf(request.status) === -1) {

                reject(request);

            } else {
                //alert( request.response );
                response(request.response);

            }

        };


        var request = new XMLHttpRequest();

        request.open(verb, url, true);

        request.withCredentials = true;

        request.onreadystatechange = stateChange;

        request.setRequestHeader("Content-Type", "application/json");

        request.setRequestHeader("Accept", "application/json");

        request.send(JSON.stringify(data));

    });

}

function getSettings(fileNames, Prefix) {
    var output = null;
    var done = 0;
    return new Promise(function (response, reject) {

        if (fileNames.length === 0) {
            return JSON.stringify(output);
        } else {
            for (var i = 0; i < fileNames.length; i++) {
                request("GET", basePath + '/' + fileNames[i], null)
                    .then(resolve => {
                        if (output !== null) {
                            output += resolve.substring(1, resolve.length - 1) + ',';
                        } else {
                            output = resolve.substring(1, resolve.length - 1) + ',';
                        }

                        //Ensure all responses are recived before returning results.
                        done++;
                        if (done === fileNames.length) {
                            output = '{ ' + output.substring(0, output.length - 1) + '}';
                            if (Prefix !== null) {
                                output = '{ "' + Prefix + '": ' + output + ' }';

                            }

                            response(JSON.stringify(JSON.parse(output)));
                        }
                    });
            }

        }

    });

}


export function Settings(fileNames) {
    return getSettings(fileNames, null);
}