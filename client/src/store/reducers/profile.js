export const LOAD_PROFILE = 'LOAD_PROFILE'
export const SUCCESS_PROFILE = 'SUCCESS_PROFILE'
export const ERROR_PROFILE = 'ERROR_PROFILE'
export const LOGIN_PROFILE = 'LOGIN_PROFILE'
export const SIGNUP_PROFILE = 'SIGNUP_PROFILE'
export const EDIT_PROFILE = 'EDIT_PROFILE'
export const PROFILE_NOT_FOUND = 'PROFILE_NOT_FOUND'
export const LOGOUT = 'LOGOUT'

const profileState = (loading, profile=null, error='') => ({ loading, profile, error })

export default (state=profileState(), { type, payload }) => {
  switch (type) {
    case LOAD_PROFILE: return profileState(true)
    case SUCCESS_PROFILE: return profileState(false, payload, '')
    case ERROR_PROFILE: return profileState(false, state.profile, payload)
    default: return state
  }
}
