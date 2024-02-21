exports.handler = (event, context, callback) => {
    const request = event.Records[0].cf.request;
    const host = request.headers.host.find(item => item.key === "Host").value;
    const source =  request.origin.custom.customHeaders["x-env-source"][0].value;
    const destination = request.origin.custom.customHeaders["x-env-destination"][0].value;
    const statusCode = request.origin.custom.customHeaders["x-env-statuscode"][0].value;
    const statusDescription = {
        "301" : "Moved Permanently",
        "302" : "Found"
    };

    console.log("------request------:", JSON.stringify(request), host);

    if (host != source) {
        response =  {
            status: "404",
            statusDescription: "Not Found",
            body: "Not Found"
          };
    } else {
        response = {
            status: statusCode,
            statusDescription: statusDescription[statusCode],
            body: statusDescription[statusCode],
            headers: {
              location: [
                {
                  key: "Location",
                  value: "https://"+ destination + request.uri
                }
              ],
              host: [{
                  key: 'Host',
                  value: "https://"+ destination
              }],
              "aws-redirect-from": [{key:"aws-redirect-from", value: host}]
            }
        };
        console.log("------response------:", JSON.stringify(response), host);
    }

    callback(null, response);
};