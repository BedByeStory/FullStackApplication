export default function getMedia (cb) {
  return navigator.mediaDevices.getUserMedia({
    video: true,//{ facingMode: "user" },
    audio: true
  })
  .catch(err => {
    console.warn(err)
    return null
  })
}
