S3Trinket = require "../main"

trinket = S3Trinket(JSON.parse(localStorage.FSPolicy))

describe "Trinket", ->
  it "should upload files to S3", (done) ->
    trinket.post(new Blob(["duder"], type: "text/plain")).then (key) ->
      console.log key
      done()
    , done

  it "should know the base path", ->
    console.log trinket.basePath()

  it "should be able to save and retrieve workspaces", (done) ->
    trinket.saveWorkspace "test",
      test: "holla!"
    .then ->
      trinket.loadWorkspace "test"
      .then (data) ->
        assert.equal data.test, "holla!"
        done()
