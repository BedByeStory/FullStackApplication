import configAWS from './config'

export default ({ name, region, identityPool }) => {
  if (!name) return Promise.reject(new Error(`bucket 'name' must be supplied`))

  return configAWS(region, identityPool)
    .then(AWS => {
      return new AWS.S3({
        apiVersion: '2006-03-01',
        params: { Bucket: name }
      })
    })
}
