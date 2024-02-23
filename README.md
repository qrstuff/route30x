# route30x

CloudFormation template for creating the AWS components for redirection to another domain, using [Cloudfront](https://aws.amazon.com/cloudfront/) and [Lambda@Edge](https://aws.amazon.com/lambda/edge/), with a custom redirection code


## Usage

#### Prerequisite:

1. [Install](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) and [configure](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html) AWS CLI.

2. Create S3 bucket to store the packaged code used in deployment of Lambda Edge function.

#### Template Deployment:

The cloudformation template can be deployed directly using cli. Two steps are required: packaging the template to upload the lambda function code and creating the stack.

```shell
aws cloudformation package --template-file ./template.yml --s3-bucket s3-bucket-name --output-template-file out.yml

aws cloudformation create-stack --stack-name checkpoint --template-body file://out.yml \
--parameters \
ParameterKey=CdnCertificateArn,ParameterValue=source-domain-wildcard-cert-arn \
ParameterKey=DestinationDomain,ParameterValue=destination-domain \
ParameterKey=ZoneName,ParameterValue=source-zone-name \
ParameterKey=ZoneSubdomain,ParameterValue=source-zone-subdomain
--capabilities CAPABILITY_IAM CAPABILITY_AUTO_EXPAND
```

#### Available Parameters

Following parameters are available for customization. Defaults can be set in the template, and can be overridden via cli as mentioned in the [Template Deployment](#Template-Deployment).

```yaml
  CdnCertificateArn:
    Type: String
    Description: ARN of the wildcard certificate for source domain
  DestinationDomain:
    Type: String
    Description: The Domain of the destination to redirect requests
  EnableLogs:
    Type: String
    Description: Lambda@Edge creates logs in multiple locations based on traffic. Switch to enable/disable logs
    AllowedValues:
      - true
      - false
    Default: true
  StatusCode:
    Type: Number
    Description: The status code of the redirect
    AllowedValues:
      - 301
      - 302
    Default: 301
  ZoneName:
    Type: String
    Description: Source zone name
  ZoneSubdomain:
    Type: String
    Description: Source zone subdomain
```


## License

See the [LICENSE](LICENSE) file.

## Notes

From the team at [QRStuff](https://qrstuff.com/) with ❤️ for automation with [Cloudformation](https://aws.amazon.com/cloudformation/).