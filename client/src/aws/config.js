/* global AWS */

var scriptSrc = 'https://sdk.amazonaws.com/js/aws-sdk-2.77.0.min.js'

const loadSDK = new Promise((res, rej) => {
  var script = document.createElement('script')
  document.head.appendChild(script)
  script.src = scriptSrc
  script.onload = res
  script.onerror = rej
}).then(() => window.AWS)

export default (region, identityPool) =>
  loadSDK.then(AWS => {
    if (!region) {
      return Promise.reject(new Error(`'region' must be supplied`))
    }
    if (!identityPool) {
      return Promise.reject(new Error(`'identityPool' must be supplied`))
    }

    AWS.config.update({
      region: region,
      credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: identityPool
      })
    })

    return AWS
  })
