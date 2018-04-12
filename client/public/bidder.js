var pbjs = pbjs || {};
pbjs.que = pbjs.que || [];
var PREBID_TIMEOUT = 20000;
var adUnits = [
  {
    code: "apn_ad_slot_1",
    mediaTypes: {
      banner: {
        sizes: [[300, 250], [300, 600]]
      }
    },
    bids: [
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
    ]
  },
  {
    code: "apn_ad_slot_2",
    mediaTypes: {
      banner: {
        sizes: [[728, 90], [970, 90]]
      }
    },
    bids: [
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
    ]
  }
];

pbjs.que.push(function() {
  pbjs.setConfig({
    s2sConfig: {
      accountId: "1c1ea5e7-b82e-4864-a3ca-b87d2a2a6de3",
      enabled: true,
      bidders: ["appnexus", "pubmatic"],
      timeout: 1000,
      adapter: "prebidServer",
      endpoint: "https://prebid.adnxs.com/pbs/v1/auction",
      syncEndpoint: "https://prebid.adnxs.com/pbs/v1/cookie_sync",
      cookieSet: true,
      cookiesetUrl: "https://acdn.adnxs.com/cookieset/cs.js"
    }
  });
  // pbjs.addAdUnits(adUnits);
  // pbjs.requestBids({
  //   bidsBackHandler: function(bidResponses) {
  //     logAdResponse(bidResponses);
  //     initAdserver();
  //   },
  //   timeout: PREBID_TIMEOUT
  // });
}); //end queue

var apntag = apntag || {};
apntag.anq = apntag.anq || [];
apntag.anq.push(function() {
  //set global page options
  // apntag.setPageOpts({
  //   member: 1543,
  //   keywords: {
  //     artist: "Prince",
  //     genre: ["rock", "pop"]
  //   },
  //   user: {
  //     age: 26,
  //     gender: 1
  //   }
  // });
  //define ad tags
  // apntag.defineTag({
  //   tagId: 10433394,
  //   sizes: [728, 90],
  //   targetId: "apn_ad_slot_1"
  // });
  // apntag.defineTag({
  //   tagId: 10433394,
  //   sizes: [[300, 250], [300, 600]],
  //   targetId: "apn_ad_slot_2"
  // });
}); //end queue

//start loading tags
function initAdserver() {
  // if (pbjs.requestSent) {
  //   return;
  // }
  pbjs.requestSent = true;
  pbjs.que.push(function() {
    apntag.anq.push(function() {
      pbjs.setTargetingForAst();
      apntag.loadTags();
    });
  });
}

function logAdResponse(bidResponses) {
  console.log("\n");
  console.log("\n//////////////////////////////////////////////////");

  var output = { available: [], other: [] };
  Object.keys(bidResponses).forEach(function(key) {
    bidResponses[key].bids.forEach(function(bid) {
      if (bid.statusMessage === "Bid available") {
        output.available.push(bid.bidder);
      }
      if (bid.statusMessage === "Bid returned empty or error response") {
        output.other.push(bid.bidder);
      }
    });
  });

  console.log("available: ", output.available);
  console.log("empty or error: ", output.other);
  console.log("//////////////////////////////////////////////////\n\n");
}
