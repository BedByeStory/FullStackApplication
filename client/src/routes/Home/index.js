import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import Paper from "material-ui/Paper";
import Grid from "material-ui/Grid";
import Footer from "../../components/Footer";
import iphoneX from "./images/iphonex.png";
import ipadIphone from "./images/ipad-iphone.png";
import clientLogos from "./images/client-logos.png";
import perspective from "./images/perspective.png";
import apple from "./images/appleicon.png";
import play from "./images/playicon.png";
import Banner from "../../ads/Banner";
import ClearBottom from '../../components/ClearBottom';
import "./index.css";

export default connect(({ profile }) => profile)(({ loading, profile }) => {
  if (!loading && profile) return <Redirect to="/status" />;
  return (
    <div>
      <header className="bg-gradient" id="home">
        <div className="container pt-5">
          <h1>Bed Bye Story</h1>
          <p className="tagline">
            Interact with friends and family around the world.
          </p>
        </div>
        <div className="img-holder mt-3">
          <img src={iphoneX} alt="phone" className="img-fluid" />
        </div>
      </header>

      {/* <div className="text-center py-4">
        <Banner />
      </div> */}

      <div className="section light-bg" id="features">
        <div className="container">
          <div className="section-title">
            <small>HIGHLIGHTS</small>
            <h3>Features you love</h3>
          </div>

          <div className="row">
            <div className="col-12 col-lg-4">
              <div className="card features">
                <div className="card-body">
                  <div className="media">
                    <span className="ti-face-smile gradient-fill ti-3x mr-3" />
                    <div className="media-body">
                      <h4 className="card-title">Connect</h4>
                      {/* <p className="card-text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Integer rutrum, urna eu pellentesque{" "}
                      </p> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <div className="card features">
                <div className="card-body">
                  <div className="media">
                    <span className="ti-settings gradient-fill ti-3x mr-3" />
                    <div className="media-body">
                      <h4 className="card-title">Create</h4>
                      {/* <p className="card-text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Integer rutrum, urna eu pellentesque{" "}
                      </p> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <div className="card features">
                <div className="card-body">
                  <div className="media">
                    <span className="ti-lock gradient-fill ti-3x mr-3" />
                    <div className="media-body">
                      <h4 className="card-title">Learn</h4>
                      {/* <p className="card-text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Integer rutrum, urna eu pellentesque{" "}
                      </p> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-6">
              <h2>Discover our App</h2>
              {/* <p className="mb-4">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Obcaecati vel exercitationem eveniet vero maxime ratione{" "}
              </p> */}
              <Link
              className="btn btn-primary"
              to={'/signup'}>Create an Account</Link>
            </div>
          </div>
          <div className="perspective-phone">
            <img
              src={ipadIphone}
              alt="perspective phone"
              className="img-fluid"
            />
          </div>
        </div>
      </div>

      <div className="section light-bg">
        <div className="container">
          <div className="row">
            <div className="col-md-8 d-flex align-items-center">
              <ul className="list-unstyled ui-steps">
                <li className="media">
                  <div className="circle-icon mr-4">1</div>
                  <div className="media-body">
                    <h5>Create an Account</h5>
                    {/* <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Integer rutrum, urna eu pellentesque pretium obcaecati vel
                      exercitationem{" "}
                    </p> */}
                  </div>
                </li>
                <li className="media my-4">
                  <div className="circle-icon mr-4">2</div>
                  <div className="media-body">
                    <h5>Share with family</h5>
                    {/* <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Integer rutrum, urna eu pellentesque pretium obcaecati vel
                      exercitationem eveniet
                    </p> */}
                  </div>
                </li>
                <li className="media">
                  <div className="circle-icon mr-4">3</div>
                  <div className="media-body">
                    <h5>Interact in real time</h5>
                    {/* <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Integer rutrum, urna eu pellentesque pretium obcaecati vel
                      exercitationem{" "}
                    </p> */}
                  </div>
                </li>
              </ul>
            </div>
            <div className="col-md-4">
              <img src={iphoneX} alt="iphone" className="img-fluid" />
            </div>
          </div>
        </div>
      </div>
      <div className="section bg-gradient">
        <div className="container">
          <div className="call-to-action">
            <h2>Start Now!</h2>
            <p className="tagline">
              Available for all major mobile and desktop platforms.{" "}
            </p>
            <div className="my-4">
              <Link
                className="btn btn-light"
                to={'/signup'}>Create an Account</Link>
              {/* <a href="#" className="btn btn-light">
                <img src={apple} alt="icon" /> App Store
              </a>
              <a href="#" className="btn btn-light">
                <img src={play} alt="icon" /> Google play
              </a> */}
            </div>
          </div>
        </div>
      </div>

      <div className="light-bg py-5" id="contact">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 text-center text-lg-left">
              {/* <p className="mb-2">
                {" "}
                <span className="ti-location-pin mr-2" /> 1485 Pacific St, Brooklyn,
                NY 11216 USA
              </p> */}
              <div className=" d-block d-sm-inline-block">
                <p className="mb-2">
                  <span className="ti-email mr-2" />{" "}
                  <a className="mr-4" target="_blank" href="https://m.me/bedbyestory">
                    Contact Us
                  </a>
                </p>
              </div>
              <div className="d-block d-sm-inline-block">
                {/* <p className="mb-0">
                  <span className="ti-headphone-alt mr-2" />{" "}
                  <a href="tel:51836362800">518-3636-2800</a>
                </p> */}
              </div>
            </div>
            <div className="col-lg-6">
              <div className="social-icons">
                <a href="https://www.facebook.com/bedbyestory/" target="_blank">
                  <span className="ti-facebook" />
                </a>
                {/* <a href="https://www.twitter.com/bedbyestory/" target="_blank">
                  <span className="ti-twitter-alt" />
                </a> */}
                <a href="https://www.instagram.com/bedbyestory/" target="_blank">
                  <span className="ti-instagram" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ClearBottom />
    </div>
  );
});
