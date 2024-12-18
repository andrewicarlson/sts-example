require('dotenv').config()

const { SignatureV4 } = require('@aws-sdk/signature-v4');
const { Sha256 } = require('@aws-crypto/sha256-js');
const { HttpRequest } = require('@aws-sdk/protocol-http');
const { STSClient, GetSessionTokenCommand } = require('@aws-sdk/client-sts');

const handler = async () => {
    try {
        const region = process.env.AWS_DEFAULT_REGION;
        const stsClient = new STSClient({ region });

        request_parameters = 'Action=GetCallerIdentity&Version=2011-06-15'

        const { Credentials: { AccessKeyId: accessKeyId, SecretAccessKey: secretAccessKey, SessionToken: sessionToken } } = await stsClient.send(new GetSessionTokenCommand());

        const request = new HttpRequest({
            method: 'GET',
            path: "/2015-03-31/functions",
            headers: {
                'Host': `lambda.${region}.amazonaws.com`,
                'x-amz-date': new Date().toISOString().replace(/[-:.]/g, "").slice(0, -4) + "Z"
            },
          });

        const sigv4 = new SignatureV4({
            "credentials": {
                accessKeyId,
                secretAccessKey,
                sessionToken
              }, 
            "service": 'lambda', 
            "region": region,
            "sha256": Sha256,
        });

        const { headers, body, method } = await sigv4.sign(request);
        console.log('headers:', headers);
        console.log('body: ', body);
        console.log('method:', method);
    } catch (error) {
        // error handling.
        console.log(error);
    }
  };

handler();