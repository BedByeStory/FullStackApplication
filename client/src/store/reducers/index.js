import { combineReducers } from 'redux'
import { rtc } from 'redux-rtc'
import profile from './profile'
import messages from './messages'
import count from './counter'
import alerts from './alerts'
import menu from './menu'
import people from './people'
import friends from './friends'
import requests from './requests'
import device from './device'
import peer from './peer'
import read from '../../interactions/Read/reducer'

export default combineReducers({
  rtc,
  profile,
  messages,
  device,
  menu,
  count,
  peer,
  people,
  friends,
  requests,
  alerts,
  read
})
