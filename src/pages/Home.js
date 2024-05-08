import React from 'react'
import Breadcrumb from '../components/partials/Breadcrumb'

const Home = () => {
  return (
    <div className="content-wrapper">
        <section className="content-header">
          <Breadcrumb title="Dashboard" breadcrumb="Dashboard"/>
        </section>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card card-outline card-warning">
                  <div className="card-header">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <button className="btn btn-primary mr-2">Tambah Data</button>
                        <button className="btn btn-secondary mr-2">Export to PDF</button>
                        <button className="btn btn-success mr-2">Export to Excel</button>
                      </div>
                      <div>
                        <form className="form-inline">
                          <div className="input-group">
                            <input type="text" className="form-control" placeholder="Search" />
                            <div className="input-group-append">
                              <button type="submit" className="btn btn-warning">
                                <i className="fas fa-search"></i>
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <table id="example1" className="table table-bordered table-hover">
                      <thead>
                        <tr>
                          <th>Rendering engine</th>
                          <th>Browser</th>
                          <th>Platform(s)</th>
                          <th>Engine version</th>
                          <th>CSS grade</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Trident</td>
                          <td>Internet
                            Explorer 4.0
                          </td>
                          <td>Win 95+</td>
                          <td> 4</td>
                          <td>X</td>
                        </tr>
                        <tr>
                          <td>Trident</td>
                          <td>Internet
                            Explorer 5.0
                          </td>
                          <td>Win 95+</td>
                          <td>5</td>
                          <td>C</td>
                        </tr>
                        <tr>
                          <td>Trident</td>
                          <td>Internet
                            Explorer 5.5
                          </td>
                          <td>Win 95+</td>
                          <td>5.5</td>
                          <td>A</td>
                        </tr>
                        <tr>
                          <td>Trident</td>
                          <td>Internet
                            Explorer 6
                          </td>
                          <td>Win 98+</td>
                          <td>6</td>
                          <td>A</td>
                        </tr>
                        <tr>
                          <td>Trident</td>
                          <td>Internet Explorer 7</td>
                          <td>Win XP SP2+</td>
                          <td>7</td>
                          <td>A</td>
                        </tr>
                        <tr>
                          <td>Trident</td>
                          <td>AOL browser (AOL desktop)</td>
                          <td>Win XP</td>
                          <td>6</td>
                          <td>A</td>
                        </tr>
                        <tr>
                          <td>Gecko</td>
                          <td>Firefox 1.0</td>
                          <td>Win 98+ / OSX.2+</td>
                          <td>1.7</td>
                          <td>A</td>
                        </tr>
                        <tr>
                          <td>Gecko</td>
                          <td>Firefox 1.5</td>
                          <td>Win 98+ / OSX.2+</td>
                          <td>1.8</td>
                          <td>A</td>
                        </tr>
                        <tr>
                          <td>Gecko</td>
                          <td>Firefox 2.0</td>
                          <td>Win 98+ / OSX.2+</td>
                          <td>1.8</td>
                          <td>A</td>
                        </tr>
                        <tr>
                          <td>Gecko</td>
                          <td>Firefox 3.0</td>
                          <td>Win 2k+ / OSX.3+</td>
                          <td>1.9</td>
                          <td>A</td>
                        </tr>
                        <tr>
                          <td>Gecko</td>
                          <td>Camino 1.0</td>
                          <td>OSX.2+</td>
                          <td>1.8</td>
                          <td>A</td>
                        </tr>
                        <tr>
                          <td>Gecko</td>
                          <td>Camino 1.5</td>
                          <td>OSX.3+</td>
                          <td>1.8</td>
                          <td>A</td>
                        </tr>
                        <tr>
                          <td>Gecko</td>
                          <td>Netscape 7.2</td>
                          <td>Win 95+ / Mac OS 8.6-9.2</td>
                          <td>1.7</td>
                          <td>A</td>
                        </tr>
                        <tr>
                          <td>Gecko</td>
                          <td>Netscape Browser 8</td>
                          <td>Win 98SE+</td>
                          <td>1.7</td>
                          <td>A</td>
                        </tr>
                        <tr>
                          <td>Gecko</td>
                          <td>Netscape Navigator 9</td>
                          <td>Win 98+ / OSX.2+</td>
                          <td>1.8</td>
                          <td>A</td>
                        </tr>
                        <tr>
                          <td>Gecko</td>
                          <td>Mozilla 1.0</td>
                          <td>Win 95+ / OSX.1+</td>
                          <td>1</td>
                          <td>A</td>
                        </tr>
                        <tr>
                          <td>Gecko</td>
                          <td>Mozilla 1.1</td>
                          <td>Win 95+ / OSX.1+</td>
                          <td>1.1</td>
                          <td>A</td>
                        </tr>
                        <tr>
                          <td>Gecko</td>
                          <td>Mozilla 1.2</td>
                          <td>Win 95+ / OSX.1+</td>
                          <td>1.2</td>
                          <td>A</td>
                        </tr>
                        <tr>
                          <td>Gecko</td>
                          <td>Mozilla 1.3</td>
                          <td>Win 95+ / OSX.1+</td>
                          <td>1.3</td>
                          <td>A</td>
                        </tr>
                        <tr>
                          <td>Gecko</td>
                          <td>Mozilla 1.4</td>
                          <td>Win 95+ / OSX.1+</td>
                          <td>1.4</td>
                          <td>A</td>
                        </tr>
                        <tr>
                          <td>Gecko</td>
                          <td>Mozilla 1.5</td>
                          <td>Win 95+ / OSX.1+</td>
                          <td>1.5</td>
                          <td>A</td>
                        </tr>
                        <tr>
                          <td>Gecko</td>
                          <td>Mozilla 1.6</td>
                          <td>Win 95+ / OSX.1+</td>
                          <td>1.6</td>
                          <td>A</td>
                        </tr>
                        <tr>
                          <td>Gecko</td>
                          <td>Mozilla 1.7</td>
                          <td>Win 98+ / OSX.1+</td>
                          <td>1.7</td>
                          <td>A</td>
                        </tr>
                        <tr>
                          <td>Gecko</td>
                          <td>Mozilla 1.8</td>
                          <td>Win 98+ / OSX.1+</td>
                          <td>1.8</td>
                          <td>A</td>
                        </tr>
                        <tr>
                          <td>Gecko</td>
                          <td>Seamonkey 1.1</td>
                          <td>Win 98+ / OSX.2+</td>
                          <td>1.8</td>
                          <td>A</td>
                        </tr>
                        <tr>
                          <td>Gecko</td>
                          <td>Epiphany 2.20</td>
                          <td>Gnome</td>
                          <td>1.8</td>
                          <td>A</td>
                        </tr>
                        <tr>
                          <td>Webkit</td>
                          <td>Safari 1.2</td>
                          <td>OSX.3</td>
                          <td>125.5</td>
                          <td>A</td>
                        </tr>
                        <tr>
                          <td>Webkit</td>
                          <td>Safari 1.3</td>
                          <td>OSX.3</td>
                          <td>312.8</td>
                          <td>A</td>
                        </tr>
                        <tr>
                          <td>Webkit</td>
                          <td>Safari 2.0</td>
                          <td>OSX.4+</td>
                          <td>419.3</td>
                          <td>A</td>
                        </tr>
                        <tr>
                          <td>Webkit</td>
                          <td>Safari 3.0</td>
                          <td>OSX.4+</td>
                          <td>522.1</td>
                          <td>A</td>
                        </tr>
                        <tr>
                          <td>Webkit</td>
                          <td>OmniWeb 5.5</td>
                          <td>OSX.4+</td>
                          <td>420</td>
                          <td>A</td>
                        </tr>
                        <tr>
                          <td>Webkit</td>
                          <td>iPod Touch / iPhone</td>
                          <td>iPod</td>
                          <td>420.1</td>
                          <td>A</td>
                        </tr>
                        <tr>
                          <td>Webkit</td>
                          <td>S60</td>
                          <td>S60</td>
                          <td>413</td>
                          <td>A</td>
                        </tr>
                        <tr>
                          <td>Presto</td>
                          <td>Opera 7.0</td>
                          <td>Win 95+ / OSX.1+</td>
                          <td>-</td>
                          <td>A</td>
                        </tr>
                        <tr>
                          <td>Presto</td>
                          <td>Opera 7.5</td>
                          <td>Win 95+ / OSX.2+</td>
                          <td>-</td>
                          <td>A</td>
                        </tr>
                        <tr>
                          <td>Presto</td>
                          <td>Opera 8.0</td>
                          <td>Win 95+ / OSX.2+</td>
                          <td>-</td>
                          <td>A</td>
                        </tr>
                        <tr>
                          <td>Presto</td>
                          <td>Opera 8.5</td>
                          <td>Win 95+ / OSX.2+</td>
                          <td>-</td>
                          <td>A</td>
                        </tr>
                        <tr>
                          <td>Presto</td>
                          <td>Opera 9.0</td>
                          <td>Win 95+ / OSX.3+</td>
                          <td>-</td>
                          <td>A</td>
                        </tr>
                        <tr>
                          <td>Presto</td>
                          <td>Opera 9.2</td>
                          <td>Win 88+ / OSX.3+</td>
                          <td>-</td>
                          <td>A</td>
                        </tr>
                        <tr>
                          <td>Presto</td>
                          <td>Opera 9.5</td>
                          <td>Win 88+ / OSX.3+</td>
                          <td>-</td>
                          <td>A</td>
                        </tr>
                        <tr>
                          <td>Presto</td>
                          <td>Opera for Wii</td>
                          <td>Wii</td>
                          <td>-</td>
                          <td>A</td>
                        </tr>
                        <tr>
                          <td>Presto</td>
                          <td>Nokia N800</td>
                          <td>N800</td>
                          <td>-</td>
                          <td>A</td>
                        </tr>
                        <tr>
                          <td>Presto</td>
                          <td>Nintendo DS browser</td>
                          <td>Nintendo DS</td>
                          <td>8.5</td>
                          <td>C/A<sup>1</sup></td>
                        </tr>
                        <tr>
                          <td>KHTML</td>
                          <td>Konqureror 3.1</td>
                          <td>KDE 3.1</td>
                          <td>3.1</td>
                          <td>C</td>
                        </tr>
                        <tr>
                          <td>KHTML</td>
                          <td>Konqureror 3.3</td>
                          <td>KDE 3.3</td>
                          <td>3.3</td>
                          <td>A</td>
                        </tr>
                        <tr>
                          <td>KHTML</td>
                          <td>Konqureror 3.5</td>
                          <td>KDE 3.5</td>
                          <td>3.5</td>
                          <td>A</td>
                        </tr>
                        <tr>
                          <td>Tasman</td>
                          <td>Internet Explorer 4.5</td>
                          <td>Mac OS 8-9</td>
                          <td>-</td>
                          <td>X</td>
                        </tr>
                        <tr>
                          <td>Tasman</td>
                          <td>Internet Explorer 5.1</td>
                          <td>Mac OS 7.6-9</td>
                          <td>1</td>
                          <td>C</td>
                        </tr>
                        <tr>
                          <td>Tasman</td>
                          <td>Internet Explorer 5.2</td>
                          <td>Mac OS 8-X</td>
                          <td>1</td>
                          <td>C</td>
                        </tr>
                        <tr>
                          <td>Misc</td>
                          <td>NetFront 3.1</td>
                          <td>Embedded devices</td>
                          <td>-</td>
                          <td>C</td>
                        </tr>
                        <tr>
                          <td>Misc</td>
                          <td>NetFront 3.4</td>
                          <td>Embedded devices</td>
                          <td>-</td>
                          <td>A</td>
                        </tr>
                        <tr>
                          <td>Misc</td>
                          <td>Dillo 0.8</td>
                          <td>Embedded devices</td>
                          <td>-</td>
                          <td>X</td>
                        </tr>
                        <tr>
                          <td>Misc</td>
                          <td>Links</td>
                          <td>Text only</td>
                          <td>-</td>
                          <td>X</td>
                        </tr>
                        <tr>
                          <td>Misc</td>
                          <td>Lynx</td>
                          <td>Text only</td>
                          <td>-</td>
                          <td>X</td>
                        </tr>
                        <tr>
                          <td>Misc</td>
                          <td>IE Mobile</td>
                          <td>Windows Mobile 6</td>
                          <td>-</td>
                          <td>C</td>
                        </tr>
                        <tr>
                          <td>Misc</td>
                          <td>PSP browser</td>
                          <td>PSP</td>
                          <td>-</td>
                          <td>C</td>
                        </tr>
                        <tr>
                          <td>Other browsers</td>
                          <td>All others</td>
                          <td>-</td>
                          <td>-</td>
                          <td>U</td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr>
                          <th>Rendering engine</th>
                          <th>Browser</th>
                          <th>Platform(s)</th>
                          <th>Engine version</th>
                          <th>CSS grade</th>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card card-outline card-orange">
                  <form>
                    <div className="card-body">
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputFile">File input</label>
                        <div className="input-group">
                          <div className="custom-file">
                            <input type="file" className="custom-file-input" id="exampleInputFile" />
                            <label className="custom-file-label" htmlFor="exampleInputFile">Choose file</label>
                          </div>
                          <div className="input-group-append">
                            <span className="input-group-text">Upload</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer">
                      <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-3">
                <div className="card card-warning card-outline">
                  <div className="card-body box-profile">
                    <div className="text-center">
                      <img className="profile-user-img img-fluid img-circle" src="../../dist/img/user4-128x128.jpg" alt="User profile picture" />
                    </div>
                    <h3 className="profile-username text-center">Nina Mcintire</h3>
                    <p className="text-muted text-center">Software Engineer</p>
                    <ul className="list-group list-group-unbordered mb-3">
                      <li className="list-group-item">
                        <b>Followers</b> <a className="float-right">1,322</a>
                      </li>
                      <li className="list-group-item">
                        <b>Following</b> <a className="float-right">543</a>
                      </li>
                      <li className="list-group-item">
                        <b>Friends</b> <a className="float-right">13,287</a>
                      </li>
                    </ul>
                    <a href="#" className="btn btn-primary btn-block"><b>Follow</b></a>
                  </div>
                </div>
                <div className="card card-primary">
                  <div className="card-header">
                    <h3 className="card-title">About Me</h3>
                  </div>
                  <div className="card-body">
                    <strong><i className="fas fa-book mr-1" /> Education</strong>
                    <p className="text-muted">
                      B.S. in Computer Science from the University of Tennessee at Knoxville
                    </p>
                    <hr />
                    <strong><i className="fas fa-map-marker-alt mr-1" /> Location</strong>
                    <p className="text-muted">Malibu, California</p>
                    <hr />
                    <strong><i className="fas fa-pencil-alt mr-1" /> Skills</strong>
                    <p className="text-muted">
                      <span className="tag tag-danger">UI Design</span>
                      <span className="tag tag-success">Coding</span>
                      <span className="tag tag-info">Javascript</span>
                      <span className="tag tag-warning">PHP</span>
                      <span className="tag tag-primary">Node.js</span>
                    </p>
                    <hr />
                    <strong><i className="far fa-file-alt mr-1" /> Notes</strong>
                    <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam fermentum enim neque.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-9">
                <div className="card">
                  <div className="card-header p-2">
                    <ul className="nav nav-pills">
                      <li className="nav-item"><a className="nav-link active" href="#activity" data-toggle="tab">Activity</a></li>
                      <li className="nav-item"><a className="nav-link" href="#timeline" data-toggle="tab">Timeline</a></li>
                      <li className="nav-item"><a className="nav-link" href="#settings" data-toggle="tab">Settings</a></li>
                    </ul>
                  </div>
                  <div className="card-body">
                    <div className="tab-content">
                      <div className="active tab-pane" id="activity">
                        <div className="post">
                          <div className="user-block">
                            <img className="img-circle img-bordered-sm" src="../../dist/img/user1-128x128.jpg" alt="user image" />
                            <span className="username">
                              <a href="#">Jonathan Burke Jr.</a>
                              <a href="#" className="float-right btn-tool"><i className="fas fa-times" /></a>
                            </span>
                            <span className="description">Shared publicly - 7:30 PM today</span>
                          </div>
                          <p>
                            Lorem ipsum represents a long-held tradition for designers,
                            typographers and the like. Some people hate it and argue for
                            its demise, but others ignore the hate as they create awesome
                            tools to help create filler text for everyone from bacon lovers
                            to Charlie Sheen fans.
                          </p>
                          <p>
                            <a href="#" className="link-black text-sm mr-2"><i className="fas fa-share mr-1" /> Share</a>
                            <a href="#" className="link-black text-sm"><i className="far fa-thumbs-up mr-1" /> Like</a>
                            <span className="float-right">
                              <a href="#" className="link-black text-sm">
                                <i className="far fa-comments mr-1" /> Comments (5)
                              </a>
                            </span>
                          </p>
                          <input className="form-control form-control-sm" type="text" placeholder="Type a comment" />
                        </div>
                        <div className="post clearfix">
                          <div className="user-block">
                            <img className="img-circle img-bordered-sm" src="../../dist/img/user7-128x128.jpg" alt="User Image" />
                            <span className="username">
                              <a href="#">Sarah Ross</a>
                              <a href="#" className="float-right btn-tool"><i className="fas fa-times" /></a>
                            </span>
                            <span className="description">Sent you a message - 3 days ago</span>
                          </div>
                          <p>
                            Lorem ipsum represents a long-held tradition for designers,
                            typographers and the like. Some people hate it and argue for
                            its demise, but others ignore the hate as they create awesome
                            tools to help create filler text for everyone from bacon lovers
                            to Charlie Sheen fans.
                          </p>
                          <form className="form-horizontal">
                            <div className="input-group input-group-sm mb-0">
                              <input className="form-control form-control-sm" placeholder="Response" />
                              <div className="input-group-append">
                                <button type="submit" className="btn btn-danger">Send</button>
                              </div>
                            </div>
                          </form>
                        </div>
                        <div className="post">
                          <div className="user-block">
                            <img className="img-circle img-bordered-sm" src="../../dist/img/user6-128x128.jpg" alt="User Image" />
                            <span className="username">
                              <a href="#">Adam Jones</a>
                              <a href="#" className="float-right btn-tool"><i className="fas fa-times" /></a>
                            </span>
                            <span className="description">Posted 5 photos - 5 days ago</span>
                          </div>
                          <div className="row mb-3">
                            <div className="col-sm-6">
                              <img className="img-fluid" src="../../dist/img/photo1.png" alt="Photo" />
                            </div>
                            <div className="col-sm-6">
                              <div className="row">
                                <div className="col-sm-6">
                                  <img className="img-fluid mb-3" src="../../dist/img/photo2.png" alt="Photo" />
                                  <img className="img-fluid" src="../../dist/img/photo3.jpg" alt="Photo" />
                                </div>
                                <div className="col-sm-6">
                                  <img className="img-fluid mb-3" src="../../dist/img/photo4.jpg" alt="Photo" />
                                  <img className="img-fluid" src="../../dist/img/photo1.png" alt="Photo" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <p>
                            <a href="#" className="link-black text-sm mr-2"><i className="fas fa-share mr-1" /> Share</a>
                            <a href="#" className="link-black text-sm"><i className="far fa-thumbs-up mr-1" /> Like</a>
                            <span className="float-right">
                              <a href="#" className="link-black text-sm">
                                <i className="far fa-comments mr-1" /> Comments (5)
                              </a>
                            </span>
                          </p>
                          <input className="form-control form-control-sm" type="text" placeholder="Type a comment" />
                        </div>
                      </div>
                      <div className="tab-pane" id="timeline">
                        <div className="timeline timeline-inverse">
                          <div className="time-label">
                            <span className="bg-danger">
                              10 Feb. 2014
                            </span>
                          </div>
                          <div>
                            <i className="fas fa-envelope bg-primary" />
                            <div className="timeline-item">
                              <span className="time"><i className="far fa-clock" /> 12:05</span>
                              <h3 className="timeline-header"><a href="#">Support Team</a> sent you an email</h3>
                              <div className="timeline-body">
                                Etsy doostang zoodles disqus groupon greplin oooj voxy zoodles,
                                weebly ning heekya handango imeem plugg dopplr jibjab, movity
                                jajah plickers sifteo edmodo ifttt zimbra. Babblely odeo kaboodle
                                quora plaxo ideeli hulu weebly balihoo...
                              </div>
                              <div className="timeline-footer">
                                <a href="#" className="btn btn-primary btn-sm">Read more</a>
                                <a href="#" className="btn btn-danger btn-sm">Delete</a>
                              </div>
                            </div>
                          </div>
                          <div>
                            <i className="fas fa-user bg-info" />
                            <div className="timeline-item">
                              <span className="time"><i className="far fa-clock" /> 5 mins ago</span>
                              <h3 className="timeline-header border-0"><a href="#">Sarah Young</a> accepted your friend request
                              </h3>
                            </div>
                          </div>
                          <div>
                            <i className="fas fa-comments bg-warning" />
                            <div className="timeline-item">
                              <span className="time"><i className="far fa-clock" /> 27 mins ago</span>
                              <h3 className="timeline-header"><a href="#">Jay White</a> commented on your post</h3>
                              <div className="timeline-body">
                                Take me to your leader!
                                Switzerland is small and neutral!
                                We are more like Germany, ambitious and misunderstood!
                              </div>
                              <div className="timeline-footer">
                                <a href="#" className="btn btn-warning btn-flat btn-sm">View comment</a>
                              </div>
                            </div>
                          </div>
                          <div className="time-label">
                            <span className="bg-success">
                              3 Jan. 2014
                            </span>
                          </div>
                          <div>
                            <i className="fas fa-camera bg-purple" />
                            <div className="timeline-item">
                              <span className="time"><i className="far fa-clock" /> 2 days ago</span>
                              <h3 className="timeline-header"><a href="#">Mina Lee</a> uploaded new photos</h3>
                              <div className="timeline-body">
                                <img src="https://placehold.it/150x100" alt="..." />
                                <img src="https://placehold.it/150x100" alt="..." />
                                <img src="https://placehold.it/150x100" alt="..." />
                                <img src="https://placehold.it/150x100" alt="..." />
                              </div>
                            </div>
                          </div>
                          <div>
                            <i className="far fa-clock bg-gray" />
                          </div>
                        </div>
                      </div>
                      <div className="tab-pane" id="settings">
                        <form className="form-horizontal">
                          <div className="form-group row">
                            <label htmlFor="inputName" className="col-sm-2 col-form-label">Name</label>
                            <div className="col-sm-10">
                              <input type="email" className="form-control" id="inputName" placeholder="Name" />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label htmlFor="inputEmail" className="col-sm-2 col-form-label">Email</label>
                            <div className="col-sm-10">
                              <input type="email" className="form-control" id="inputEmail" placeholder="Email" />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label htmlFor="inputName2" className="col-sm-2 col-form-label">Name</label>
                            <div className="col-sm-10">
                              <input type="text" className="form-control" id="inputName2" placeholder="Name" />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label htmlFor="inputExperience" className="col-sm-2 col-form-label">Experience</label>
                            <div className="col-sm-10">
                              <textarea className="form-control" id="inputExperience" placeholder="Experience" defaultValue={""} />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label htmlFor="inputSkills" className="col-sm-2 col-form-label">Skills</label>
                            <div className="col-sm-10">
                              <input type="text" className="form-control" id="inputSkills" placeholder="Skills" />
                            </div>
                          </div>
                          <div className="form-group row">
                            <div className="offset-sm-2 col-sm-10">
                              <div className="checkbox">
                                <label>
                                  <input type="checkbox" /> I agree to the <a href="#">terms and conditions</a>
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="form-group row">
                            <div className="offset-sm-2 col-sm-10">
                              <button type="submit" className="btn btn-danger">Submit</button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    </div>
  )
}

export default Home
