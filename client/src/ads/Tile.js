import React from 'react'
import Ad from '../components/Ad'

export default () =>
  <Ad
  code="apn_ad_slot_2"
  mediaTypes={{
    banner: {
      sizes: [[728, 90], [970, 90]]
    }
  }}
  bids={[
    {
      bidder: "appnexus",
      params: {
        placementId: "10433394"
      }
    },
    {
      bidder: "rubicon",
      params: {
        accountId: "1234",
        siteId: 1234,
        zoneId: 1234
      }
    }
  ]}
  tagId={10433394}
  sizes={[[300, 250], [300, 600]]} />
