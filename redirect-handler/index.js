exports.handler = (event, context, callback) => {
    const request = event.Records[0].cf.request;
    const host = request.headers.host.find(item => item.key === "Host").value;
    const source = process.env.SOURCE
    const destination = process.env.DESTINATION
    const statusCode = process.env.STATUS_CODE
    const statusDescription = {
        "301" : "Moved Permanently",
        "302" : "Found"
    };

    console.log("------request------:", request, host);

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
                  value: destination + request.uri
                }
              ],
              "aws-redirect-from": [{key:"aws-redirect-from", value: host}]
            }
        };
    }

    callback(null, response);
};