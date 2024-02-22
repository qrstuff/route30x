exports.handler = (event, context, callback) => {
  const request = event.Records[0].cf.request;
  const destination = request.origin.custom.customHeaders["x-env-destination"][0].value;
  const statusCode = parseInt(request.origin.custom.customHeaders["x-env-statuscode"][0].value);

  let url = "https://"+ destination + request.uri;
  if (request.querystring) {
      url += '?';
      url += request.querystring;
  }

  callback(
    null,
    {
      status: statusCode,
      headers: {
        location: url,
      }
    }
  );
};