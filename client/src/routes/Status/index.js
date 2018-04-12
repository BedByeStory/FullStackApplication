import React from 'react'
import Grid from 'material-ui/Grid';
import Interactions from '../../interactions';
import Friends from '../Friends';
import Requests from '../Requests';
import ClearBottom from '../../components/ClearBottom';
import Banner from '../../ads/Banner';

export default () => <div className="container" style={{overflow: "hidden"}}>

  {/* <div className="row">
    <div className="text-center my-4 mx-auto">
      <Banner />
    </div>
  </div> */}

  <div className="row my-4">
    <div className="col-md-4 d-none d-md-flex" style={{ flexDirection: 'column' }}>
      <Friends className="mb-4" style={{ maxHeight: '400px', flex: '1 1 auto', overflowY: 'auto' }} />
      <Requests style={{ maxHeight: '400px', flex: '1 1 auto', overflowY: 'auto' }} />
    </div>
    <div className="col-md-8">
      <Interactions />
    </div>
  </div>

  <div className="row d-md-none mb-4">
    <div className="col-sm-12">
      <Friends />
    </div>
  </div>

  <div className="row d-md-none mb-4">
    <div className="col-sm-12">
      <Requests />
    </div>
  </div>

  <ClearBottom />
</div>
