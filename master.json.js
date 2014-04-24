window["distri/s3-trinket:master"]({
  "source": {
    "LICENSE": {
      "path": "LICENSE",
      "content": "The MIT License (MIT)\n\nCopyright (c) 2014 \n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the \"Software\"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.",
      "mode": "100644",
      "type": "blob"
    },
    "README.md": {
      "path": "README.md",
      "content": "s3-trinket\n==========\n\nClip data to S3 and organize workspaces, whatever that means!\n",
      "mode": "100644",
      "type": "blob"
    },
    "main.coffee.md": {
      "path": "main.coffee.md",
      "content": "S3 Trinket\n==========\n\n    S3 = require \"s3\"\n    SHA1 = require \"sha1\"\n\n    module.exports = (policy) ->\n      uploader = S3.uploader(policy)\n\n      user = getUserFromPolicy(policy)\n      base = \"http://#{policy.bucket}.s3.amazonaws.com/#{user}\"\n\nPost a blob to S3 using the given namespace as a content addressable store.\n\n      post: (namespace, blob) ->\n        blobToS3 uploader, \"#{user}#{namespace}\", blob\n\n      loadWorkspace: (name) ->\n        $.getJSON \"#{base}workspaces/#{name}.json\"\n\n      saveWorkspace: (name, data) ->\n        uploader.upload\n          key: \"#{user}workspaces/#{name}.json\"\n          blob: new Blob [JSON.stringify(data)], type: \"application/json\"\n          cacheControl: 60\n\n      list: (namespace=\"\") ->\n        namespace = \"#{namespace}\"\n\n        url = \"#{base}#{namespace}\"\n\n        $.get(url).then (data) ->\n          $(data).find(\"Key\").map ->\n            this.innerHTML\n          .get()\n\nHelpers\n-------\n\n    blobToS3 = (uploader, namespace, blob) ->\n      SHA1 blob, (sha) ->\n        key = \"#{namespace}/#{sha}\"\n\n        uploader.upload\n          key: key\n          blob: blob\n\n    getUserFromPolicy = (policy) ->\n      conditions = JSON.parse(atob(policy.policy)).conditions.filter ([a, b, c]) ->\n        a is \"starts-with\" and b is \"$key\"\n\n      conditions[0][2]\n",
      "mode": "100644"
    },
    "pixie.cson": {
      "path": "pixie.cson",
      "content": "version: \"0.1.0\"\nremoteDependencies: [\n  \"https://code.jquery.com/jquery-1.11.0.min.js\"\n]\ndependencies:\n  s3: \"distri/s3:v0.2.0\"\n  sha1: \"distri/sha1:v0.2.0\"\n",
      "mode": "100644"
    },
    "test/test.coffee": {
      "path": "test/test.coffee",
      "content": "S3Trinket = require \"../main\"\n\ntrinket = S3Trinket(JSON.parse(localStorage.TRINKET_POLICY))\n\ntrinket.loadWorkspace(\"master\").then (data) ->\n  console.log data\n",
      "mode": "100644"
    }
  },
  "distribution": {
    "main": {
      "path": "main",
      "content": "(function() {\n  var S3, SHA1, blobToS3, getUserFromPolicy;\n\n  S3 = require(\"s3\");\n\n  SHA1 = require(\"sha1\");\n\n  module.exports = function(policy) {\n    var base, uploader, user;\n    uploader = S3.uploader(policy);\n    user = getUserFromPolicy(policy);\n    base = \"http://\" + policy.bucket + \".s3.amazonaws.com/\" + user;\n    return {\n      post: function(namespace, blob) {\n        return blobToS3(uploader, \"\" + user + namespace, blob);\n      },\n      loadWorkspace: function(name) {\n        return $.getJSON(\"\" + base + \"workspaces/\" + name + \".json\");\n      },\n      saveWorkspace: function(name, data) {\n        return uploader.upload({\n          key: \"\" + user + \"workspaces/\" + name + \".json\",\n          blob: new Blob([JSON.stringify(data)], {\n            type: \"application/json\"\n          }),\n          cacheControl: 60\n        });\n      },\n      list: function(namespace) {\n        var url;\n        if (namespace == null) {\n          namespace = \"\";\n        }\n        namespace = \"\" + namespace;\n        url = \"\" + base + namespace;\n        return $.get(url).then(function(data) {\n          return $(data).find(\"Key\").map(function() {\n            return this.innerHTML;\n          }).get();\n        });\n      }\n    };\n  };\n\n  blobToS3 = function(uploader, namespace, blob) {\n    return SHA1(blob, function(sha) {\n      var key;\n      key = \"\" + namespace + \"/\" + sha;\n      return uploader.upload({\n        key: key,\n        blob: blob\n      });\n    });\n  };\n\n  getUserFromPolicy = function(policy) {\n    var conditions;\n    conditions = JSON.parse(atob(policy.policy)).conditions.filter(function(_arg) {\n      var a, b, c;\n      a = _arg[0], b = _arg[1], c = _arg[2];\n      return a === \"starts-with\" && b === \"$key\";\n    });\n    return conditions[0][2];\n  };\n\n}).call(this);\n",
      "type": "blob"
    },
    "pixie": {
      "path": "pixie",
      "content": "module.exports = {\"version\":\"0.1.0\",\"remoteDependencies\":[\"https://code.jquery.com/jquery-1.11.0.min.js\"],\"dependencies\":{\"s3\":\"distri/s3:v0.2.0\",\"sha1\":\"distri/sha1:v0.2.0\"}};",
      "type": "blob"
    },
    "test/test": {
      "path": "test/test",
      "content": "(function() {\n  var S3Trinket, trinket;\n\n  S3Trinket = require(\"../main\");\n\n  trinket = S3Trinket(JSON.parse(localStorage.TRINKET_POLICY));\n\n  trinket.loadWorkspace(\"master\").then(function(data) {\n    return console.log(data);\n  });\n\n}).call(this);\n",
      "type": "blob"
    }
  },
  "progenitor": {
    "url": "http://www.danielx.net/editor/"
  },
  "version": "0.1.0",
  "entryPoint": "main",
  "remoteDependencies": [
    "https://code.jquery.com/jquery-1.11.0.min.js"
  ],
  "repository": {
    "branch": "master",
    "default_branch": "master",
    "full_name": "distri/s3-trinket",
    "homepage": null,
    "description": "Clip data to S3 and organize workspaces, whatever that means!",
    "html_url": "https://github.com/distri/s3-trinket",
    "url": "https://api.github.com/repos/distri/s3-trinket",
    "publishBranch": "gh-pages"
  },
  "dependencies": {
    "s3": {
      "source": {
        "LICENSE": {
          "path": "LICENSE",
          "content": "The MIT License (MIT)\n\nCopyright (c) 2014 distri\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the \"Software\"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.",
          "mode": "100644",
          "type": "blob"
        },
        "README.md": {
          "path": "README.md",
          "content": "s3\n==\n\nUpload to S3\n",
          "mode": "100644",
          "type": "blob"
        },
        "main.coffee.md": {
          "path": "main.coffee.md",
          "content": "S3\n====\n\nUpload data directly to S3 from the client.\n\nUsage\n-----\n\n>     uploader = S3.uploader(JSON.parse(localStorage.S3Policy))\n>     uploader.upload\n>       key: \"myfile.text\"\n>       blob: new Blob [\"radical\"]\n>       cacheControl: 60 # default 31536000\n\nThe policy is a JSON object with the following keys:\n\n- `accessKey`\n- `acl`\n- `bucket`\n- `policy`\n- `signature`\n\nSince these are all needed to create and sign the policy we keep them all\ntogether.\n\nGiving this object to the uploader method creates an uploader capable of\nasynchronously uploading files to the bucket specified in the policy.\n\nNotes\n-----\n\nThe policy must specify a `Cache-Control` header because we always try to set it.\n\nImplementation\n--------------\n\n    module.exports =\n      fetchPolicy: (callback) ->\n        xhr = new XMLHttpRequest\n        xhr.open('GET', \"http://locohost:5000/policy.json\", true)\n        xhr.onreadystatechange = ->\n          return if xhr.readyState != 4\n\n          callback JSON.parse(xhr.responseText)\n\n        xhr.send()\n\n        return xhr\n\n      uploader: (credentials) ->\n        {acl, bucket, policy, signature, accessKey} = credentials\n\n        upload: ({key, blob, cacheControl}) ->\n          sendForm \"https://#{bucket}.s3.amazonaws.com\",\n            key: key\n            \"Content-Type\": blob.type\n            \"Cache-Control\": \"max-age=#{cacheControl or 31536000}\"\n            AWSAccessKeyId: accessKey\n            acl: acl\n            policy: policy\n            signature: signature\n            file: blob\n\nHelpers\n-------\n\n    sendForm = (url, data) ->\n      xhr = new XMLHttpRequest\n      xhr.open('POST', url, true)\n\n      formData = Object.keys(data).reduce (formData, key) ->\n        formData.append(key, data[key])\n\n        return formData\n      , new FormData\n\n      xhr.send formData\n\n      return xhr\n\nTODO\n----\n\nAll the data could be extracted from the policy data itself without needing to\ndouble specify acl, bucket, etc.\n",
          "mode": "100644",
          "type": "blob"
        },
        "pixie.cson": {
          "path": "pixie.cson",
          "content": "version: \"0.2.0\"\n",
          "mode": "100644",
          "type": "blob"
        },
        "test/upload.coffee": {
          "path": "test/upload.coffee",
          "content": "global.S3 = require \"/main\"\n",
          "mode": "100644",
          "type": "blob"
        }
      },
      "distribution": {
        "main": {
          "path": "main",
          "content": "(function() {\n  var sendForm;\n\n  module.exports = {\n    fetchPolicy: function(callback) {\n      var xhr;\n      xhr = new XMLHttpRequest;\n      xhr.open('GET', \"http://locohost:5000/policy.json\", true);\n      xhr.onreadystatechange = function() {\n        if (xhr.readyState !== 4) {\n          return;\n        }\n        return callback(JSON.parse(xhr.responseText));\n      };\n      xhr.send();\n      return xhr;\n    },\n    uploader: function(credentials) {\n      var accessKey, acl, bucket, policy, signature;\n      acl = credentials.acl, bucket = credentials.bucket, policy = credentials.policy, signature = credentials.signature, accessKey = credentials.accessKey;\n      return {\n        upload: function(_arg) {\n          var blob, cacheControl, key;\n          key = _arg.key, blob = _arg.blob, cacheControl = _arg.cacheControl;\n          return sendForm(\"https://\" + bucket + \".s3.amazonaws.com\", {\n            key: key,\n            \"Content-Type\": blob.type,\n            \"Cache-Control\": \"max-age=\" + (cacheControl || 31536000),\n            AWSAccessKeyId: accessKey,\n            acl: acl,\n            policy: policy,\n            signature: signature,\n            file: blob\n          });\n        }\n      };\n    }\n  };\n\n  sendForm = function(url, data) {\n    var formData, xhr;\n    xhr = new XMLHttpRequest;\n    xhr.open('POST', url, true);\n    formData = Object.keys(data).reduce(function(formData, key) {\n      formData.append(key, data[key]);\n      return formData;\n    }, new FormData);\n    xhr.send(formData);\n    return xhr;\n  };\n\n}).call(this);\n",
          "type": "blob"
        },
        "pixie": {
          "path": "pixie",
          "content": "module.exports = {\"version\":\"0.2.0\"};",
          "type": "blob"
        },
        "test/upload": {
          "path": "test/upload",
          "content": "(function() {\n  global.S3 = require(\"/main\");\n\n}).call(this);\n",
          "type": "blob"
        }
      },
      "progenitor": {
        "url": "http://www.danielx.net/editor/"
      },
      "version": "0.2.0",
      "entryPoint": "main",
      "repository": {
        "branch": "v0.2.0",
        "default_branch": "master",
        "full_name": "distri/s3",
        "homepage": null,
        "description": "Upload to S3",
        "html_url": "https://github.com/distri/s3",
        "url": "https://api.github.com/repos/distri/s3",
        "publishBranch": "gh-pages"
      },
      "dependencies": {}
    },
    "sha1": {
      "source": {
        "LICENSE": {
          "path": "LICENSE",
          "content": "The MIT License (MIT)\n\nCopyright (c) 2014 \n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the \"Software\"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.",
          "mode": "100644",
          "type": "blob"
        },
        "README.md": {
          "path": "README.md",
          "content": "sha1\n====\n\nSHA1 JS implementation. Currently wrapping CryptoJS with a more uniform API.\n\nUsage\n-----\n\nStrings\n\n    string = \"\"\n\n    SHA1 string, (sha) ->\n      sha # \"da39a3ee5e6b4b0d3255bfef95601890afd80709\"\n\nBlobs\n\n    blob = new Blob\n\n    SHA1 blob, (sha) ->\n      sha # \"da39a3ee5e6b4b0d3255bfef95601890afd80709\"\n\nArray buffers\n\n    arrayBuffer = new ArrayBuffer\n\n    SHA1 arrayBuffer, (sha) ->\n      sha # \"da39a3ee5e6b4b0d3255bfef95601890afd80709\"\n",
          "mode": "100644",
          "type": "blob"
        },
        "lib/crypto.js": {
          "path": "lib/crypto.js",
          "content": "/*\nCryptoJS v3.1.2\ncode.google.com/p/crypto-js\n(c) 2009-2013 by Jeff Mott. All rights reserved.\ncode.google.com/p/crypto-js/wiki/License\n*/\nvar CryptoJS=CryptoJS||function(e,m){var p={},j=p.lib={},l=function(){},f=j.Base={extend:function(a){l.prototype=this;var c=new l;a&&c.mixIn(a);c.hasOwnProperty(\"init\")||(c.init=function(){c.$super.init.apply(this,arguments)});c.init.prototype=c;c.$super=this;return c},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);a.hasOwnProperty(\"toString\")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},\nn=j.WordArray=f.extend({init:function(a,c){a=this.words=a||[];this.sigBytes=c!=m?c:4*a.length},toString:function(a){return(a||h).stringify(this)},concat:function(a){var c=this.words,q=a.words,d=this.sigBytes;a=a.sigBytes;this.clamp();if(d%4)for(var b=0;b<a;b++)c[d+b>>>2]|=(q[b>>>2]>>>24-8*(b%4)&255)<<24-8*((d+b)%4);else if(65535<q.length)for(b=0;b<a;b+=4)c[d+b>>>2]=q[b>>>2];else c.push.apply(c,q);this.sigBytes+=a;return this},clamp:function(){var a=this.words,c=this.sigBytes;a[c>>>2]&=4294967295<<\n32-8*(c%4);a.length=e.ceil(c/4)},clone:function(){var a=f.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var c=[],b=0;b<a;b+=4)c.push(4294967296*e.random()|0);return new n.init(c,a)}}),b=p.enc={},h=b.Hex={stringify:function(a){var c=a.words;a=a.sigBytes;for(var b=[],d=0;d<a;d++){var f=c[d>>>2]>>>24-8*(d%4)&255;b.push((f>>>4).toString(16));b.push((f&15).toString(16))}return b.join(\"\")},parse:function(a){for(var c=a.length,b=[],d=0;d<c;d+=2)b[d>>>3]|=parseInt(a.substr(d,\n2),16)<<24-4*(d%8);return new n.init(b,c/2)}},g=b.Latin1={stringify:function(a){var c=a.words;a=a.sigBytes;for(var b=[],d=0;d<a;d++)b.push(String.fromCharCode(c[d>>>2]>>>24-8*(d%4)&255));return b.join(\"\")},parse:function(a){for(var c=a.length,b=[],d=0;d<c;d++)b[d>>>2]|=(a.charCodeAt(d)&255)<<24-8*(d%4);return new n.init(b,c)}},r=b.Utf8={stringify:function(a){try{return decodeURIComponent(escape(g.stringify(a)))}catch(c){throw Error(\"Malformed UTF-8 data\");}},parse:function(a){return g.parse(unescape(encodeURIComponent(a)))}},\nk=j.BufferedBlockAlgorithm=f.extend({reset:function(){this._data=new n.init;this._nDataBytes=0},_append:function(a){\"string\"==typeof a&&(a=r.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var c=this._data,b=c.words,d=c.sigBytes,f=this.blockSize,h=d/(4*f),h=a?e.ceil(h):e.max((h|0)-this._minBufferSize,0);a=h*f;d=e.min(4*a,d);if(a){for(var g=0;g<a;g+=f)this._doProcessBlock(b,g);g=b.splice(0,a);c.sigBytes-=d}return new n.init(g,d)},clone:function(){var a=f.clone.call(this);\na._data=this._data.clone();return a},_minBufferSize:0});j.Hasher=k.extend({cfg:f.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){k.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(c,b){return(new a.init(b)).finalize(c)}},_createHmacHelper:function(a){return function(b,f){return(new s.HMAC.init(a,\nf)).finalize(b)}}});var s=p.algo={};return p}(Math);\n(function(){var e=CryptoJS,m=e.lib,p=m.WordArray,j=m.Hasher,l=[],m=e.algo.SHA1=j.extend({_doReset:function(){this._hash=new p.init([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(f,n){for(var b=this._hash.words,h=b[0],g=b[1],e=b[2],k=b[3],j=b[4],a=0;80>a;a++){if(16>a)l[a]=f[n+a]|0;else{var c=l[a-3]^l[a-8]^l[a-14]^l[a-16];l[a]=c<<1|c>>>31}c=(h<<5|h>>>27)+j+l[a];c=20>a?c+((g&e|~g&k)+1518500249):40>a?c+((g^e^k)+1859775393):60>a?c+((g&e|g&k|e&k)-1894007588):c+((g^e^\nk)-899497514);j=k;k=e;e=g<<30|g>>>2;g=h;h=c}b[0]=b[0]+h|0;b[1]=b[1]+g|0;b[2]=b[2]+e|0;b[3]=b[3]+k|0;b[4]=b[4]+j|0},_doFinalize:function(){var f=this._data,e=f.words,b=8*this._nDataBytes,h=8*f.sigBytes;e[h>>>5]|=128<<24-h%32;e[(h+64>>>9<<4)+14]=Math.floor(b/4294967296);e[(h+64>>>9<<4)+15]=b;f.sigBytes=4*e.length;this._process();return this._hash},clone:function(){var e=j.clone.call(this);e._hash=this._hash.clone();return e}});e.SHA1=j._createHelper(m);e.HmacSHA1=j._createHmacHelper(m)})();\n\n/*\nCryptoJS v3.1.2\ncode.google.com/p/crypto-js\n(c) 2009-2013 by Jeff Mott. All rights reserved.\ncode.google.com/p/crypto-js/wiki/License\n*/\n(function(){if(\"function\"==typeof ArrayBuffer){var b=CryptoJS.lib.WordArray,e=b.init;(b.init=function(a){a instanceof ArrayBuffer&&(a=new Uint8Array(a));if(a instanceof Int8Array||a instanceof Uint8ClampedArray||a instanceof Int16Array||a instanceof Uint16Array||a instanceof Int32Array||a instanceof Uint32Array||a instanceof Float32Array||a instanceof Float64Array)a=new Uint8Array(a.buffer,a.byteOffset,a.byteLength);if(a instanceof Uint8Array){for(var b=a.byteLength,d=[],c=0;c<b;c++)d[c>>>2]|=a[c]<<\n24-8*(c%4);e.call(this,d,b)}else e.apply(this,arguments)}).prototype=b}})();\n\nmodule.exports = CryptoJS;\n",
          "mode": "100644",
          "type": "blob"
        },
        "main.coffee.md": {
          "path": "main.coffee.md",
          "content": "SHA1\n====\n\nWrapping up CryptoJS SHA1 implementation to be a little nicer.\n\n    {SHA1} = CryptoJS = require(\"./lib/crypto\")\n\n    module.exports = (data, fn) ->\n      if data instanceof Blob\n        blobTypedArray data, (arrayBuffer) ->\n          fn(shaArrayBuffer(arrayBuffer))\n      else if data instanceof ArrayBuffer\n        defer ->\n          fn(shaArrayBuffer(data))\n      else\n        defer ->\n          fn(SHA1(data).toString())\n\nHelpers\n-------\n\n    defer = (fn) ->\n      setTimeout fn, 0\n\n    shaArrayBuffer = (arrayBuffer) ->\n      SHA1(CryptoJS.lib.WordArray.create(arrayBuffer)).toString()\n\n    blobTypedArray = (blob, fn) ->\n      reader = new FileReader()\n    \n      reader.onloadend = ->\n        fn(reader.result)\n    \n      reader.readAsArrayBuffer(blob)\n",
          "mode": "100644",
          "type": "blob"
        },
        "pixie.cson": {
          "path": "pixie.cson",
          "content": "version: \"0.2.0\"\n",
          "mode": "100644",
          "type": "blob"
        },
        "test/sha1.coffee": {
          "path": "test/sha1.coffee",
          "content": "SHA1 = require \"../main\"\n\ndescribe \"SHA1\", ->\n  it \"should hash stuff\", (done) ->\n    SHA1 \"\", (sha) ->\n      assert.equal sha, \"da39a3ee5e6b4b0d3255bfef95601890afd80709\"\n      done()\n\n  it \"should hash blobs\", (done) ->\n    blob = new Blob\n\n    SHA1 blob, (sha) ->\n      assert.equal sha, \"da39a3ee5e6b4b0d3255bfef95601890afd80709\"\n      done()\n\n  it \"should hash array buffers\", (done) ->\n    arrayBuffer = new ArrayBuffer\n\n    SHA1 arrayBuffer, (sha) ->\n      assert.equal sha, \"da39a3ee5e6b4b0d3255bfef95601890afd80709\"\n      done()\n",
          "mode": "100644",
          "type": "blob"
        }
      },
      "distribution": {
        "lib/crypto": {
          "path": "lib/crypto",
          "content": "/*\nCryptoJS v3.1.2\ncode.google.com/p/crypto-js\n(c) 2009-2013 by Jeff Mott. All rights reserved.\ncode.google.com/p/crypto-js/wiki/License\n*/\nvar CryptoJS=CryptoJS||function(e,m){var p={},j=p.lib={},l=function(){},f=j.Base={extend:function(a){l.prototype=this;var c=new l;a&&c.mixIn(a);c.hasOwnProperty(\"init\")||(c.init=function(){c.$super.init.apply(this,arguments)});c.init.prototype=c;c.$super=this;return c},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);a.hasOwnProperty(\"toString\")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},\nn=j.WordArray=f.extend({init:function(a,c){a=this.words=a||[];this.sigBytes=c!=m?c:4*a.length},toString:function(a){return(a||h).stringify(this)},concat:function(a){var c=this.words,q=a.words,d=this.sigBytes;a=a.sigBytes;this.clamp();if(d%4)for(var b=0;b<a;b++)c[d+b>>>2]|=(q[b>>>2]>>>24-8*(b%4)&255)<<24-8*((d+b)%4);else if(65535<q.length)for(b=0;b<a;b+=4)c[d+b>>>2]=q[b>>>2];else c.push.apply(c,q);this.sigBytes+=a;return this},clamp:function(){var a=this.words,c=this.sigBytes;a[c>>>2]&=4294967295<<\n32-8*(c%4);a.length=e.ceil(c/4)},clone:function(){var a=f.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var c=[],b=0;b<a;b+=4)c.push(4294967296*e.random()|0);return new n.init(c,a)}}),b=p.enc={},h=b.Hex={stringify:function(a){var c=a.words;a=a.sigBytes;for(var b=[],d=0;d<a;d++){var f=c[d>>>2]>>>24-8*(d%4)&255;b.push((f>>>4).toString(16));b.push((f&15).toString(16))}return b.join(\"\")},parse:function(a){for(var c=a.length,b=[],d=0;d<c;d+=2)b[d>>>3]|=parseInt(a.substr(d,\n2),16)<<24-4*(d%8);return new n.init(b,c/2)}},g=b.Latin1={stringify:function(a){var c=a.words;a=a.sigBytes;for(var b=[],d=0;d<a;d++)b.push(String.fromCharCode(c[d>>>2]>>>24-8*(d%4)&255));return b.join(\"\")},parse:function(a){for(var c=a.length,b=[],d=0;d<c;d++)b[d>>>2]|=(a.charCodeAt(d)&255)<<24-8*(d%4);return new n.init(b,c)}},r=b.Utf8={stringify:function(a){try{return decodeURIComponent(escape(g.stringify(a)))}catch(c){throw Error(\"Malformed UTF-8 data\");}},parse:function(a){return g.parse(unescape(encodeURIComponent(a)))}},\nk=j.BufferedBlockAlgorithm=f.extend({reset:function(){this._data=new n.init;this._nDataBytes=0},_append:function(a){\"string\"==typeof a&&(a=r.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var c=this._data,b=c.words,d=c.sigBytes,f=this.blockSize,h=d/(4*f),h=a?e.ceil(h):e.max((h|0)-this._minBufferSize,0);a=h*f;d=e.min(4*a,d);if(a){for(var g=0;g<a;g+=f)this._doProcessBlock(b,g);g=b.splice(0,a);c.sigBytes-=d}return new n.init(g,d)},clone:function(){var a=f.clone.call(this);\na._data=this._data.clone();return a},_minBufferSize:0});j.Hasher=k.extend({cfg:f.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){k.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(c,b){return(new a.init(b)).finalize(c)}},_createHmacHelper:function(a){return function(b,f){return(new s.HMAC.init(a,\nf)).finalize(b)}}});var s=p.algo={};return p}(Math);\n(function(){var e=CryptoJS,m=e.lib,p=m.WordArray,j=m.Hasher,l=[],m=e.algo.SHA1=j.extend({_doReset:function(){this._hash=new p.init([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(f,n){for(var b=this._hash.words,h=b[0],g=b[1],e=b[2],k=b[3],j=b[4],a=0;80>a;a++){if(16>a)l[a]=f[n+a]|0;else{var c=l[a-3]^l[a-8]^l[a-14]^l[a-16];l[a]=c<<1|c>>>31}c=(h<<5|h>>>27)+j+l[a];c=20>a?c+((g&e|~g&k)+1518500249):40>a?c+((g^e^k)+1859775393):60>a?c+((g&e|g&k|e&k)-1894007588):c+((g^e^\nk)-899497514);j=k;k=e;e=g<<30|g>>>2;g=h;h=c}b[0]=b[0]+h|0;b[1]=b[1]+g|0;b[2]=b[2]+e|0;b[3]=b[3]+k|0;b[4]=b[4]+j|0},_doFinalize:function(){var f=this._data,e=f.words,b=8*this._nDataBytes,h=8*f.sigBytes;e[h>>>5]|=128<<24-h%32;e[(h+64>>>9<<4)+14]=Math.floor(b/4294967296);e[(h+64>>>9<<4)+15]=b;f.sigBytes=4*e.length;this._process();return this._hash},clone:function(){var e=j.clone.call(this);e._hash=this._hash.clone();return e}});e.SHA1=j._createHelper(m);e.HmacSHA1=j._createHmacHelper(m)})();\n\n/*\nCryptoJS v3.1.2\ncode.google.com/p/crypto-js\n(c) 2009-2013 by Jeff Mott. All rights reserved.\ncode.google.com/p/crypto-js/wiki/License\n*/\n(function(){if(\"function\"==typeof ArrayBuffer){var b=CryptoJS.lib.WordArray,e=b.init;(b.init=function(a){a instanceof ArrayBuffer&&(a=new Uint8Array(a));if(a instanceof Int8Array||a instanceof Uint8ClampedArray||a instanceof Int16Array||a instanceof Uint16Array||a instanceof Int32Array||a instanceof Uint32Array||a instanceof Float32Array||a instanceof Float64Array)a=new Uint8Array(a.buffer,a.byteOffset,a.byteLength);if(a instanceof Uint8Array){for(var b=a.byteLength,d=[],c=0;c<b;c++)d[c>>>2]|=a[c]<<\n24-8*(c%4);e.call(this,d,b)}else e.apply(this,arguments)}).prototype=b}})();\n\nmodule.exports = CryptoJS;\n",
          "type": "blob"
        },
        "main": {
          "path": "main",
          "content": "(function() {\n  var CryptoJS, SHA1, blobTypedArray, defer, shaArrayBuffer;\n\n  SHA1 = (CryptoJS = require(\"./lib/crypto\")).SHA1;\n\n  module.exports = function(data, fn) {\n    if (data instanceof Blob) {\n      return blobTypedArray(data, function(arrayBuffer) {\n        return fn(shaArrayBuffer(arrayBuffer));\n      });\n    } else if (data instanceof ArrayBuffer) {\n      return defer(function() {\n        return fn(shaArrayBuffer(data));\n      });\n    } else {\n      return defer(function() {\n        return fn(SHA1(data).toString());\n      });\n    }\n  };\n\n  defer = function(fn) {\n    return setTimeout(fn, 0);\n  };\n\n  shaArrayBuffer = function(arrayBuffer) {\n    return SHA1(CryptoJS.lib.WordArray.create(arrayBuffer)).toString();\n  };\n\n  blobTypedArray = function(blob, fn) {\n    var reader;\n    reader = new FileReader();\n    reader.onloadend = function() {\n      return fn(reader.result);\n    };\n    return reader.readAsArrayBuffer(blob);\n  };\n\n}).call(this);\n",
          "type": "blob"
        },
        "pixie": {
          "path": "pixie",
          "content": "module.exports = {\"version\":\"0.2.0\"};",
          "type": "blob"
        },
        "test/sha1": {
          "path": "test/sha1",
          "content": "(function() {\n  var SHA1;\n\n  SHA1 = require(\"../main\");\n\n  describe(\"SHA1\", function() {\n    it(\"should hash stuff\", function(done) {\n      return SHA1(\"\", function(sha) {\n        assert.equal(sha, \"da39a3ee5e6b4b0d3255bfef95601890afd80709\");\n        return done();\n      });\n    });\n    it(\"should hash blobs\", function(done) {\n      var blob;\n      blob = new Blob;\n      return SHA1(blob, function(sha) {\n        assert.equal(sha, \"da39a3ee5e6b4b0d3255bfef95601890afd80709\");\n        return done();\n      });\n    });\n    return it(\"should hash array buffers\", function(done) {\n      var arrayBuffer;\n      arrayBuffer = new ArrayBuffer;\n      return SHA1(arrayBuffer, function(sha) {\n        assert.equal(sha, \"da39a3ee5e6b4b0d3255bfef95601890afd80709\");\n        return done();\n      });\n    });\n  });\n\n}).call(this);\n",
          "type": "blob"
        }
      },
      "progenitor": {
        "url": "http://www.danielx.net/editor/"
      },
      "version": "0.2.0",
      "entryPoint": "main",
      "repository": {
        "branch": "v0.2.0",
        "default_branch": "master",
        "full_name": "distri/sha1",
        "homepage": null,
        "description": "SHA1 JS implementation",
        "html_url": "https://github.com/distri/sha1",
        "url": "https://api.github.com/repos/distri/sha1",
        "publishBranch": "gh-pages"
      },
      "dependencies": {}
    }
  }
});