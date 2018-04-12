import MobileDetect from 'mobile-detect'

export const SET_DEVICE = 'SET_DEVICE'

export default function (state={}, { type, payload }) {
  switch (type) {
    case SET_DEVICE:
      const md = new MobileDetect(payload)
      return {
        mobile: md.mobile(),
        phone: md.phone(),
        tablet: md.tablet(),
        userAgent: md.userAgent(),
        os: md.os(),
        isIPhone: md.is('iPhone')
      }
    default: return state
  }
}
