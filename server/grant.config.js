module.exports = {
  server: {
    protocol: "http",
    host: "localhost:3030"
  },
  facebook: {
    key: "1730689793909314",
    secret: "5d1b92dbec1754a8046bb6d3b420e555",
    callback: "/facebook_callback",
    scope: [
      "email",
      "user_friends",
      "public_profile"
    ]
  }
}
