import { LOAD_PROFILE, SUCCESS_PROFILE, LOGIN_PROFILE, SIGNUP_PROFILE, ERROR_PROFILE, EDIT_PROFILE, LOGOUT } from '../reducers/profile'
import { login, signup, logout, updateProfile, getProfile } from '../../profile'

const act = (type, payload) => ({ type, payload })

export default ({
  active=(v => v),
  boot=(v => v)
}) => ({ dispatch, getState }) => {

  return next => action => {

    if (action.type === SUCCESS_PROFILE) {
      active(action.payload._id)
    }

    if (action.type === LOAD_PROFILE) {
      getProfile()
      .then((profile) => dispatch(act(SUCCESS_PROFILE, profile)))
      .catch(err => dispatch(act(ERROR_PROFILE, err)))
    }

    if (action.type === LOGIN_PROFILE) {
      login(action.payload)
      .then(() => boot({ dispatch, getState }))
      .catch(err => dispatch(act(ERROR_PROFILE, err)))
    }

    if (action.type === SIGNUP_PROFILE) {
      signup(action.payload)
      .then(() => boot({ dispatch, getState }))
      .catch(err => dispatch(act(ERROR_PROFILE, err)))
    }

    if (action.type === LOGOUT) {
      logout()
      .then(() => boot({ dispatch, getState }))
      .catch(err => dispatch(act(ERROR_PROFILE, err)))
    }

    if (action.type === EDIT_PROFILE) {
      updateProfile(action.payload)
      .then(() => dispatch(act(LOAD_PROFILE)))
      .catch(err => dispatch(act(ERROR_PROFILE, err)))
    }

    return next(action)
  }

}
