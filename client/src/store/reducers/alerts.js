import { findUnreadAlerts, readAlert } from '../../alerts'

const LOAD_ALERTS = 'LOAD_ALERTS'
const SUCCESS_ALERTS = 'SUCCESS_ALERTS'
const ERROR_ALERTS = 'ERROR_ALERTS'

function alertsState (loading=false, alerts=[], error) {
  return { loading, alerts, error }
}

export function findAlerts () {
  return function (dispatch) {
    dispatch({ type: LOAD_ALERTS })

    return findUnreadAlerts()
    .then(payload => dispatch({ type: SUCCESS_ALERTS, payload }))
    .catch(payload => dispatch({ type: ERROR_ALERTS, payload }))
  }
}

export function readAlerts (alerts) {
  return function (dispatch) {
    dispatch({ type: LOAD_ALERTS })

    return Promise.all(alerts.map(({ _id }) => readAlert(_id)))
    .then(() => findUnreadAlerts())
    .then(payload => dispatch({ type: SUCCESS_ALERTS, payload }))
    .catch(payload => dispatch({ type: ERROR_ALERTS, payload }))
  }
}

export default function (state=alertsState(), { type, payload }) {
  switch (type) {
    case LOAD_ALERTS: return alertsState(true)
    case SUCCESS_ALERTS: return alertsState(false, payload)
    case ERROR_ALERTS: return alertsState(false, state.alerts, payload)
    default: return state
  }
}
