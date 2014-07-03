S3Trinket = require "../main"

trinket = S3Trinket(JSON.parse(localStorage.TRINKET_POLICY))

describe "Trinket", ->
  it "should upload files to S3", (done) ->
    trinket.post(new Blob(["duder"], type: "text/plain")).then (key) ->
      console.log key
      done()
