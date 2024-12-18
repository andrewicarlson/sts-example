1. Duplicate `.env.example` to a new `.env` file and add your access key ID, secret key, and default region. 
2. `npm i`
3. `node index.js`
4. Copy the header values into the Postman request (should use `x-amz-date`, `x-amz-security-token`, `x-amz-content-sha256`, and `authorization`)
5. If you want to interact with a different AWS resource, adjust the `HttpRequest` with the proper path, resource, headers, etc.