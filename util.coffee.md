Util
====


    getKey = (conditions, key) ->
      results = conditions.filter (condition) ->
        typeof condition is "object"
      .map (object) ->
        object[key]
      .filter (value) ->
        value

      results[0]

    module.exports =
      extractPolicyData: (policy) ->
        policyObject = JSON.parse(atob(policy))
  
        conditions = policyObject.conditions
  
        acl: getKey(conditions, "acl")
        bucket: getKey(conditions, "bucket")
