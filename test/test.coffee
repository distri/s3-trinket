S3Trinket = require "../main"

trinket = S3Trinket(JSON.parse(localStorage.TRINKET_POLICY))

trinket.saveWorkspace("yolo", radical: true).then (key) ->
  console.log key

trinket.post(new Blob(["duder"], type: "text/plain")).then (key) ->
  console.log key
