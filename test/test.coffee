S3Trinket = require "../main"

trinket = S3Trinket(JSON.parse(localStorage.TRINKET_POLICY))

trinket.loadWorkspace("master").then (data) ->
  console.log data
