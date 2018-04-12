import io from 'socket.io-client'
import { createStore, applyMiddleware, compose } from 'redux'
import { createCookieMiddleware } from 'redux-cookie';
import Cookies from 'js-cookie'
import logger from 'redux-logger'
import reducers from './reducers'
import { friendsEpic, messagesEpic, profileEpic, alertsEpic, callEpic, pingEpic } from './epics/index'
import { pingReceived, callInProgress, callAlreadyInProgress, callCanceled, callReceived } from '../peers/peerConnect'
import { header } from '../utils/auth'
import { connected } from 'redux-rtc'
import boot from './boot'

const PUBLISH = 'publish'
const SUBSCRIBE = 'subscribe'
const UNSUB = 'unsubscribe'
const ACTIVE = 'active'
const socket = io(process.env.REACT_APP_API, {transports: ['websocket']})
const active = (user_id) =>  socket.emit(ACTIVE, [user_id])
const pub = (topic, val) => socket.emit(PUBLISH, [topic, val])
const sub = (topic, fn) => {
  let unsubscribed = false
  socket.emit(SUBSCRIBE, [topic])
  socket.on(topic, (...args) => !unsubscribed && fn(...args))
  return () => {
    unsubscribed = true
    socket.emit(UNSUB, [topic])
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = composeEnhancers(applyMiddleware(
  createCookieMiddleware(Cookies),
  connected,
  logger,
  friendsEpic({ pub, sub }),
  messagesEpic({ pub, sub }),
  alertsEpic({ pub, sub }),
  callEpic({ pub, sub, actions: { callCanceled, callInProgress, callAlreadyInProgress }}),
  pingEpic({ pub, sub, actions: { callReceived, pingReceived }}),
  profileEpic({ pub, sub, active, boot }),
))

export default (initial) => createStore(reducers, initial, middleware)

