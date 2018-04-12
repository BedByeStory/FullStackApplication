import React from 'react'
import { findPeer } from './'
import { toast, style } from 'react-toastify'
import Peer from '../components/Peer'
import CallPeer from '../components/CallPeer'
import CallCanceled from '../components/CallCanceled'
import CallInProgress from '../components/CallInProgress'
import CallAlreadyInProgress from '../components/CallAlreadyInProgress'
import getUserMedia from '../utils/media'

const autoClose = 20000;

style({
  colorProgressDefault: "linear-gradient( 135deg, rgba(60, 8, 118, 0.8) 0%, rgba(250, 0, 118, 0.8) 100%)"
})

export function pingReceived (peer_id) {
  return function (dispatch, getState) {
    findPeer(peer_id)
    .then((peer) => {
      if (peer) toast(<Peer peer_id={peer_id} peer={peer} />)
    }).catch(() => {})
  }
}

export function chatReceived (peer_id) {
  return function (dispatch, getState) {
    findPeer(peer_id)
    .then((peer) => {
      if (peer) toast(<Peer peer_id={peer_id} peer={peer} />)
    }).catch(() => {})
  }
}

export function callReceived (peer_id) {
  return function (dispatch, getState) {
    findPeer(peer_id)
    .then((peer) => {
      if (peer) toast(<CallPeer peer_id={peer_id} peer={peer} />, { autoClose })
    }).catch(() => {})
  }
}

export function callCanceled (peer_id) {
  return function (dispatch, getState) {
    findPeer(peer_id)
    .then((peer) => {
      if (peer) toast(<CallCanceled peer_id={peer_id} peer={peer} />)
    }).catch(() => {})
  }
}

export function callInProgress (peer_id) {
  return function (dispatch, getState) {
    let onTimeout = (v => v);
    let toastId, timerId;

    findPeer(peer_id)
    .then((peer) => {
      if (peer) {
        timerId = setTimeout(onTimeout, autoClose)
        toastId = toast(<CallInProgress peer_id={peer_id} peer={peer} />, { autoClose })
      }
    }).catch(() => {})

    return {
      onTimeout: (cb) => {
        if (typeof cb === 'function') onTimeout = cb
      },
      close: () => {
        clearTimeout(timerId)
        toast.dismiss(toastId)
      }
    }
  }
}

export function callAlreadyInProgress (peer_id) {
  return function (dispatch, getState) {
    findPeer(peer_id)
    .then((peer) => {
      if (peer) toast(<CallAlreadyInProgress peer_id={peer_id} peer={peer} />, { autoClose })
    }).catch(() => {})
  }
}
