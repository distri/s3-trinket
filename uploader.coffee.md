S3
====

Upload data directly to S3 from the client.

Usage
-----

>     uploader = S3.uploader(JSON.parse(localStorage.S3Policy))
>     uploader.upload
>       key: "myfile.text"
>       blob: new Blob ["radical"]
>       cacheControl: 60 # default 31536000

The policy is a JSON object with the following keys:

- `accessKey`
- `policy`
- `signature`

Since these are all needed to create and sign the policy we keep them all
together.

Giving this object to the uploader method creates an uploader capable of
asynchronously uploading files to the bucket specified in the policy.

Notes
-----

The policy must specify a `Cache-Control` header because we always try to set it.

Implementation
--------------

    module.exports = (credentials) ->
      {policy, signature, accessKey} = credentials
      {acl, bucket} = extractPolicyData(policy)

      upload: ({key, blob, cacheControl}) ->
        sendForm "https://s3.amazonaws.com/#{bucket}", objectToForm
          key: key
          "Content-Type": blob.type
          "Cache-Control": "max-age=#{cacheControl or 31536000}"
          AWSAccessKeyId: accessKey
          acl: acl
          policy: policy
          signature: signature
          file: blob

Helpers
-------

    {extractPolicyData} = require "./util"

    sendForm = (url, formData) ->
      $.ajax
        url: url
        data: formData
        processData: false
        contentType: false
        type: 'POST'

    objectToForm = (data) ->
      formData = Object.keys(data).reduce (formData, key) ->
        formData.append(key, data[key])

        return formData
      , new FormData

