/* global apntag pbjs initAdserver logAdResponse */
import React, { Children } from 'react';
import { CircularProgress } from 'material-ui/Progress';

export default class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    }
  }

  componentDidMount() {
    try {
      const { code, mediaTypes, bids, tagId, sizes } = this.props
      this.setState({ loading: true })
      pbjs.que.push(() => {
        pbjs.addAdUnits([{ code, mediaTypes, bids }]);
        pbjs.requestBids({
          bidsBackHandler: (bidResponses) => {
            this.setState({ loading: false })
            logAdResponse && logAdResponse(bidResponses);
            initAdserver && initAdserver();
          },
          timeout: 20000
        });
      });

      apntag.anq.push(() => {
        apntag.defineTag({
          tagId,
          sizes,
          targetId: code
        });
        apntag.showTag(code);
      });
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const { loading } = this.state
    const { code, mediaTypes, bids, tagId, sizes, children, ...props } = this.props
    return <div id={code} {...props}>
      { loading && <CircularProgress /> }
    </div>;
  }
}
