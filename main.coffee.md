S3 Trinket
==========

Usage
-----

Initializing

>     S3Trinket = require "s3-trinket"
>     trinket = S3Trinket(JSON.parse localStorage.TRINKET_POLICY)

Loading a workspace

>     trinket.loadWorkspace("master")
>     .then (data) ->
>       console.log "loaded workspace", data

Saving a workspace

>     trinket.saveWorkspace "master", data

Post edited images.

>     trinket.post "images", imgBlob, (namespacedSha) ->

After sifting post image sets.

>     trinket.post "image_sets", json, (namespacedSha) ->

    Uploader = require "./uploader"
    SHA1 = require "sha1"

    module.exports = S3Trinket = (policy) ->
      uploader = Uploader(policy)

      user = getUserFromPolicy(policy)
      {bucket} = extractPolicyData(policy.policy)
      base = "http://s3.amazonaws.com/#{bucket}/#{user}"

Post a blob to S3 using the given namespace as a content addressable store.

      post: (blob) ->
        blobToS3 uploader, "#{user}data", blob

      loadWorkspace: (name) ->
        $.getJSON "#{base}workspaces/#{name}.json"

      saveWorkspace: (name, data) ->
        key = "#{user}workspaces/#{name}.json"
        uploader.upload
          key: key
          blob: new Blob [JSON.stringify(data)], type: "application/json"
          cacheControl: 60
        .then ->
          key

      list: (namespace="") ->
        namespace = "#{namespace}"

        url = "#{base}#{namespace}"

        $.get(url).then (data) ->
          $(data).find("Key").map ->
            this.innerHTML
          .get()

Expose SHA1 for others to use.

    S3Trinket.SHA1 = SHA1

Helpers
-------

    {extractPolicyData} = require "./util"

    blobToS3 = (uploader, namespace, blob) ->
      deferred = $.Deferred()

      SHA1 blob, (sha) ->
        key = "#{namespace}/#{sha}"

        uploader.upload
          key: key
          blob: blob
        .then ->
          deferred.resolve key
        , (error) ->
          deferred.reject(error)

      deferred.promise()

    getUserFromPolicy = (policy) ->
      conditions = JSON.parse(atob(policy.policy)).conditions.filter ([a, b, c]) ->
        a is "starts-with" and b is "$key"

      conditions[0][2]
