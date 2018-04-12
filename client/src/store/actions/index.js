/* global FB */

export function shareProfile () {
  return function (dispatch, getState) {
    const { profile: { profile }} = getState()
    if (profile) {
      const href = `${process.env.PUBLIC_URL}/profile/${profile._id}`
      console.log({href})
      const method = 'share'
      FB && FB.ui({ method, href })
    }
  }
}
