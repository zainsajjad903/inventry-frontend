import React from "react";
import { Link } from "react-router-dom";
export default function Sidebar({ isOpen = true }) {
  return (
    <>
      <aside className={`sidebar-left ${isOpen ? "is-open" : "is-collapsed"}`}>
        <div data-simplebar className="h-100">
          <div id="sidebar-menu">
            <ul className="left-menu list-unstyled" id="side-menu">
              <li>
                <Link to="/empolyeetable">
                  <i className="fas fa-gear "></i>
                  <span>Management</span>
                </Link>
              </li>
              <li>
                <Link to="/empolyeetable">
                  <i className="fas fa-users"></i>
                  <span>Empolyees</span>
                </Link>
              </li>
              <li>
                <Link to="/desigination">
                  <i className="fas fa-user-tie"></i>
                  <span>Desigination</span>
                </Link>
              </li>
              <li>
                <Link to="/department">
                  <i className="fas fa-building"></i>
                  <span>Department</span>
                </Link>
              </li>
              <li>
                <Link to="/user">
                  <i className="fas fa-user"></i>
                  <span>User</span>
                </Link>
              </li>
              <li>
                <Link to="/shift">
                  <i className="fas fa-clock"></i>
                  <span>Shift</span>
                </Link>
              </li>

              {/* <li className="menu-title">Elements</li>

              <li>
                <a href="javascript: void(0);" className="has-arrow ">
                  <i className="fa fa-palette"></i>
                  <span>Base</span>
                </a>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <a href="ui-accordions.html">
                      <i className="mdi mdi-checkbox-blank-circle align-middle"></i>
                      Accordions
                    </a>
                  </li>
                  <li>
                    <a href="ui-alerts.html">
                      <i className="mdi mdi-checkbox-blank-circle align-middle"></i>{" "}
                      Alerts
                    </a>
                  </li>
                  <li>
                    <a href="ui-badge.html">
                      <i className="mdi mdi-checkbox-blank-circle align-middle"></i>{" "}
                      Badges
                    </a>
                  </li>
                  <li>
                    <a href="ui-breadcrumb.html">
                      <i className="mdi mdi-checkbox-blank-circle align-middle"></i>{" "}
                      Breadcrumb
                    </a>
                  </li>
                  <li>
                    <a href="ui-buttons.html">
                      <i className="mdi mdi-checkbox-blank-circle align-middle"></i>{" "}
                      Buttons
                    </a>
                  </li>
                  <li>
                    <a href="ui-buttons-group.html">
                      <i className="mdi mdi-checkbox-blank-circle align-middle"></i>{" "}
                      Button Group
                    </a>
                  </li>
                  <li>
                    <a href="ui-cards.html">
                      <i className="mdi mdi-checkbox-blank-circle align-middle"></i>{" "}
                      Cards
                    </a>
                  </li>
                  <li>
                    <a href="ui-colors.html">
                      <i className="mdi mdi-checkbox-blank-circle align-middle"></i>{" "}
                      Colors
                    </a>
                  </li>
                  <li>
                    <a href="ui-dropdowns.html">
                      <i className="mdi mdi-checkbox-blank-circle align-middle"></i>{" "}
                      Dropdowns
                    </a>
                  </li>
                  <li>
                    <a href="ui-list-group.html">
                      <i className="mdi mdi-checkbox-blank-circle align-middle"></i>{" "}
                      List Group
                    </a>
                  </li>
                  <li>
                    <a href="ui-maker.html">
                      <i className="mdi mdi-checkbox-blank-circle align-middle"></i>
                      Makers
                    </a>
                  </li>
                  <li>
                    <a href="ui-modals.html">
                      <i className="mdi mdi-checkbox-blank-circle align-middle"></i>{" "}
                      Modals
                    </a>
                  </li>
                  <li>
                    <a href="ui-nav.html">
                      <i className="mdi mdi-checkbox-blank-circle align-middle"></i>{" "}
                      Navigation
                    </a>
                  </li>
                  <li>
                    <a href="ui-offcanvas.html">
                      <i className="mdi mdi-checkbox-blank-circle align-middle"></i>{" "}
                      Offcavas
                    </a>
                  </li>
                  <li>
                    <a href="ui-pagination.html">
                      <i className="mdi mdi-checkbox-blank-circle align-middle"></i>{" "}
                      Pagination
                    </a>
                  </li>
                  <li>
                    <a href="ui-placeholder.html">
                      <i className="mdi mdi-checkbox-blank-circle align-middle"></i>{" "}
                      Placeholder
                    </a>
                  </li>
                  <li>
                    <a href="ui-popover.html">
                      <i className="mdi mdi-checkbox-blank-circle align-middle"></i>{" "}
                      Popover
                    </a>
                  </li>
                  <li>
                    <a href="ui-progress-bars.html">
                      <i className="mdi mdi-checkbox-blank-circle align-middle"></i>{" "}
                      Progress bar
                    </a>
                  </li>
                  <li>
                    <a href="ui-spinner.html">
                      <i className="mdi mdi-checkbox-blank-circle align-middle"></i>{" "}
                      Spinners
                    </a>
                  </li>
                  <li>
                    <a href="ui-tabs.html">
                      <i className="mdi mdi-checkbox-blank-circle align-middle"></i>{" "}
                      Tabs
                    </a>
                  </li>
                  <li>
                    <a href="ui-tables.html">
                      <i className="mdi mdi-checkbox-blank-circle align-middle"></i>{" "}
                      Tables
                    </a>
                  </li>
                  <li>
                    <a href="ui-tooltip.html">
                      <i className="mdi mdi-checkbox-blank-circle align-middle"></i>{" "}
                      Tooltips
                    </a>
                  </li>
                  <li>
                    <a href="ui-typography.html">
                      <i className="mdi mdi-checkbox-blank-circle align-middle"></i>{" "}
                      Typography
                    </a>
                  </li>
                </ul>
              </li>

              <li>
                <a href="javascript: void(0);" className="has-arrow ">
                  <i className="fa fa-adjust"></i>
                  <span>Advanced</span>
                </a>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <a href="ui-avatar.html">
                      <i className="mdi mdi-checkbox-blank-circle align-middle"></i>{" "}
                      Avatar
                    </a>
                  </li>
                  <li>
                    <a href="ui-blockUI.html">
                      <i className="mdi mdi-checkbox-blank-circle align-middle"></i>{" "}
                      Block UI
                    </a>
                  </li>
                  <li>
                    <a href="ui-slick-carousel.html">
                      <i className="mdi mdi-checkbox-blank-circle align-middle"></i>{" "}
                      Carousel
                    </a>
                  </li>
                  <li>
                    <a href="ui-chat.html">
                      <i className="mdi mdi-checkbox-blank-circle align-middle"></i>{" "}
                      Chat
                    </a>
                  </li>
                  <li>
                    <a href="ui-context-menu.html">
                      <i className="mdi mdi-checkbox-blank-circle align-middle"></i>{" "}
                      Context menu
                    </a>
                  </li>
                  <li>
                    <a href="ui-grid-nav.html">
                      <i className="mdi mdi-checkbox-blank-circle align-middle"></i>{" "}
                      Grid nav
                    </a>
                  </li>
                  <li>
                    <a href="ui-rich-list.html">
                      <i className="mdi mdi-checkbox-blank-circle align-middle"></i>{" "}
                      Rich list
                    </a>
                  </li>
                  <li>
                    <a href="ui-sortable.html">
                      <i className="mdi mdi-checkbox-blank-circle align-middle"></i>{" "}
                      Sortable
                    </a>
                  </li>
                  <li>
                    <a href="ui-sweet-alert.html">
                      <i className="mdi mdi-checkbox-blank-circle align-middle"></i>{" "}
                      Sweetalert 2
                    </a>
                  </li>
                  <li>
                    <a href="ui-timeline.html">
                      <i className="mdi mdi-checkbox-blank-circle align-middle"></i>{" "}
                      Timeline
                    </a>
                  </li>
                  <li>
                    <a href="ui-toaster.html">
                      <i className="mdi mdi-checkbox-blank-circle align-middle"></i>{" "}
                      Toaster
                    </a>
                  </li>
                  <li>
                    <a href="ui-treeview.html">
                      <i className="mdi mdi-checkbox-blank-circle align-middle"></i>{" "}
                      Tree View
                    </a>
                  </li>
                </ul>
              </li>

              <li>
                <a href="javascript: void(0);" className="has-arrow">
                  <i className="fa fa-icons"></i>
                  <span>Icons</span>
                </a>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <a href="icons-materialdesign.html">
                      <i className="mdi mdi-checkbox-blank-circle align-middle"></i>{" "}
                      Material Design
                    </a>
                  </li>
                  <li>
                    <a href="icons-fontawesome.html">
                      <i className="mdi mdi-checkbox-blank-circle align-middle"></i>{" "}
                      Font awesome 5
                    </a>
                  </li>
                </ul>
              </li>

              <li>
                <a href="javascript: void(0);" className="has-arrow ">
                  <i className="fa fa-window-restore"></i>
                  <span>Cards</span>
                </a>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <a href="ui-card-base.html">
                      <i className="mdi mdi-checkbox-blank-circle align-middle"></i>{" "}
                      Base
                    </a>
                  </li>
                  <li>
                    <a href="ui-card-draggable.html">
                      <i className="mdi mdi-checkbox-blank-circle align-middle"></i>{" "}
                      Draggable
                    </a>
                  </li>
                  <li>
                    <a href="ui-card-tab.html">
                      <i className="mdi mdi-checkbox-blank-circle align-middle"></i>{" "}
                      Tab
                    </a>
                  </li>
                  <li>
                    <a href="ui-card-tool.html">
                      <i className="mdi mdi-checkbox-blank-circle align-middle"></i>{" "}
                      Tool
                    </a>
                  </li>
                </ul>
              </li>

              <li>
                <a href="javascript: void(0);" className="has-arrow ">
                  <i className="fa fa-shapes"></i>
                  <span>Widget</span>
                </a>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <a href="widget-general.html">
                      <i className="mdi mdi-checkbox-blank-circle align-middle"></i>{" "}
                      General
                    </a>
                  </li>
                  <li>
                    <a href="widget-chart.html">
                      <i className="mdi mdi-checkbox-blank-circle align-middle"></i>{" "}
                      Chart
                    </a>
                  </li>
                </ul>
              </li>

              <li className="menu-title">Data</li>

              <li>
                <a href="javascript: void(0);" className="has-arrow ">
                  <i className="fa fa-chart-pie align-middle"></i> Apexcharts
                </a>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <a href="charts-apex-line.html">
                      <i className="mdi mdi-checkbox-blank-circle"></i> Line
                    </a>
                  </li>
                  <li>
                    <a href="charts-apex-area.html">
                      <i className="mdi mdi-checkbox-blank-circle"></i> Area
                    </a>
                  </li>
                  <li>
                    <a href="charts-apex-column.html">
                      <i className="mdi mdi-checkbox-blank-circle"></i> Column
                    </a>
                  </li>
                  <li>
                    <a href="charts-apex-bar.html">
                      <i className="mdi mdi-checkbox-blank-circle"></i> Bar
                    </a>
                  </li>
                  <li>
                    <a href="charts-apex-mixed.html">
                      <i className="mdi mdi-checkbox-blank-circle"></i>{" "}
                      Mixed/Combo
                    </a>
                  </li>
                  <li>
                    <a href="charts-apex-range.html">
                      <i className="mdi mdi-checkbox-blank-circle"></i> Range
                      Area
                    </a>
                  </li>
                  <li>
                    <a href="charts-apex-timeline.html">
                      <i className="mdi mdi-checkbox-blank-circle"></i> Timeline
                    </a>
                  </li>
                  <li>
                    <a href="charts-apex-candle.html">
                      <i className="mdi mdi-checkbox-blank-circle"></i>{" "}
                      Candlestick
                    </a>
                  </li>
                  <li>
                    <a href="charts-apex-box&whisker.html">
                      <i className="mdi mdi-checkbox-blank-circle"></i> Box &
                      Whisker
                    </a>
                  </li>
                  <li>
                    <a href="charts-apex-pie.html">
                      <i className="mdi mdi-checkbox-blank-circle"></i>{" "}
                      Pie/Donut
                    </a>
                  </li>
                  <li>
                    <a href="charts-apex-radar.html">
                      <i className="mdi mdi-checkbox-blank-circle"></i> Radar
                    </a>
                  </li>
                  <li>
                    <a href="charts-apex-polar.html">
                      <i className="mdi mdi-checkbox-blank-circle"></i> Polar
                      Area
                    </a>
                  </li>
                  <li>
                    <a href="charts-apex-radial.html">
                      <i className="mdi mdi-checkbox-blank-circle"></i>{" "}
                      Radial/Circle
                    </a>
                  </li>
                  <li>
                    <a href="charts-apex-bubble.html">
                      <i className="mdi mdi-checkbox-blank-circle"></i> Bubble
                    </a>
                  </li>
                  <li>
                    <a href="charts-apex-scatter.html">
                      <i className="mdi mdi-checkbox-blank-circle"></i> Scatter
                    </a>
                  </li>
                  <li>
                    <a href="charts-apex-heatmap.html">
                      <i className="mdi mdi-checkbox-blank-circle"></i> Heatmap
                    </a>
                  </li>
                  <li>
                    <a href="charts-apex-treemap.html">
                      <i className="mdi mdi-checkbox-blank-circle"></i> Treemap
                    </a>
                  </li>
                </ul>
              </li>

              <li>
                <a href="javascript: void(0);" className="has-arrow ">
                  <i className="fas fa-table"></i>
                  <span>Datatable</span>
                </a>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <a href="javascript: void(0);" className="has-arrow ">
                      <i className="mdi mdi-checkbox-blank-circle align-middle"></i>{" "}
                      Basic
                    </a>
                    <ul className="sub-menu" aria-expanded="false">
                      <li>
                        <a href="datatable-base.html">
                          <i className="mdi mdi-circle-outline"></i> Base
                        </a>
                      </li>
                      <li>
                        <a href="datatable-footer.html">
                          <i className="mdi mdi-circle-outline"></i> Footer
                        </a>
                      </li>
                      <li>
                        <a href="datatable-scrollable.html">
                          <i className="mdi mdi-circle-outline"></i> Scrollable
                        </a>
                      </li>
                      <li>
                        <a href="datatable-pagination.html">
                          <i className="mdi mdi-circle-outline"></i> Pagination
                        </a>
                      </li>
                      <li>
                        <a href="datatable-page-length.html">
                          <i className="mdi mdi-circle-outline"></i> Length menu
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#!" className="has-arrow ">
                      <i className="mdi mdi-checkbox-blank-circle align-middle"></i>{" "}
                      Advanced
                    </a>
                    <ul className="sub-menu" aria-expanded="false">
                      <li>
                        <a href="datatable-adv-col-render.html">
                          <i className="mdi mdi-circle-outline"></i> Column
                          rendering
                        </a>
                      </li>
                      <li>
                        <a href="datatable-adv-col-visibility.html">
                          <i className="mdi mdi-circle-outline"></i> Column
                          visibility
                        </a>
                      </li>
                      <li>
                        <a href="datatable-adv-footer-callback.html">
                          <i className="mdi mdi-circle-outline"></i> Footer
                          callback
                        </a>
                      </li>
                      <li>
                        <a href="datatable-adv-multi-control.html">
                          <i className="mdi mdi-circle-outline"></i> Multiple
                          controls
                        </a>
                      </li>
                      <li>
                        <a href="datatable-adv-row-callback.html">
                          <i className="mdi mdi-circle-outline"></i> Row
                          callback
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#!" className="has-arrow ">
                      <i className="mdi mdi-checkbox-blank-circle align-middle"></i>{" "}
                      Extension
                    </a>
                    <ul className="sub-menu" aria-expanded="false">
                      <li>
                        <a href="datatable-ext-autofill.html">
                          <i className="mdi mdi-circle-outline"></i> Auto fill
                        </a>
                      </li>
                      <li>
                        <a href="datatable-ext-buttons.html">
                          <i className="mdi mdi-circle-outline"></i> Buttons
                        </a>
                      </li>
                      <li>
                        <a href="datatable-ext-col-reorder.html">
                          <i className="mdi mdi-circle-outline"></i> Column
                          reorder
                        </a>
                      </li>
                      <li>
                        <a href="datatable-ext-fixed-header.html">
                          <i className="mdi mdi-circle-outline"></i> Fixed
                          header
                        </a>
                      </li>
                      <li>
                        <a href="datatable-ext-fixed-column.html">
                          <i className="mdi mdi-circle-outline"></i> Fixed
                          column
                        </a>
                      </li>
                      <li>
                        <a href="datatable-ext-keytable.html">
                          <i className="mdi mdi-circle-outline"></i> Key table
                        </a>
                      </li>
                      <li>
                        <a href="datatable-ext-row-group.html">
                          <i className="mdi mdi-circle-outline"></i> Row group
                        </a>
                      </li>
                      <li>
                        <a href="datatable-ext-row-reorder.html">
                          <i className="mdi mdi-circle-outline"></i> Row reorder
                        </a>
                      </li>
                      <li>
                        <a href="datatable-ext-scrollable.html">
                          <i className="mdi mdi-circle-outline"></i> Scrollable
                        </a>
                      </li>
                      <li>
                        <a href="datatable-ext-searchpanes.html">
                          <i className="mdi mdi-circle-outline"></i> Search
                          panes
                        </a>
                      </li>
                      <li>
                        <a href="datatable-ext-select.html">
                          <i className="mdi mdi-circle-outline"></i> Select
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>

              <li className="menu-title">Form</li>

              <li>
                <a href="form-base.html">
                  <i className="fa fa-dice"></i> <span>Base</span>
                </a>
              </li>

              <li>
                <a href="#!" className="has-arrow">
                  <i className="fa fa-fill-drip"></i> <span>Advanced</span>
                </a>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <a href="form-autosize.html">
                      <i className="mdi mdi-checkbox-blank-circle align-middle"></i>{" "}
                      Autosize
                    </a>
                  </li>
                  <li>
                    <a href="form-bs-maxlength.html">
                      <i className="mdi mdi-checkbox-blank-circle align-middle"></i>{" "}
                      Bootstrap maxlength
                    </a>
                  </li>
                  <li>
                    <a href="form-clipboard.html">
                      <i className="mdi mdi-checkbox-blank-circle align-middle"></i>{" "}
                      Clipboard
                    </a>
                  </li>
                  <li>
                    <a href="form-datepicker.html">
                      <i className="mdi mdi-checkbox-blank-circle align-middle"></i>{" "}
                      Date picker
                    </a>
                  </li>
                  <li>
                    <a href="form-datetimepicker.html">
                      <i className="mdi mdi-checkbox-blank-circle align-middle"></i>{" "}
                      Date time picker
                    </a>
                  </li>
                  <li>
                    <a href="form-rangepicker.html">
                      <i className="mdi mdi-checkbox-blank-circle align-middle"></i>{" "}
                      Range picker
                    </a>
                  </li>
                  <li>
                    <a href="form-inputmask.html">
                      <i className="mdi mdi-checkbox-blank-circle align-middle"></i>{" "}
                      Input mask
                    </a>
                  </li>
                  <li>
                    <a href="form-select2.html">
                      <i className="mdi mdi-checkbox-blank-circle align-middle"></i>{" "}
                      Select2
                    </a>
                  </li>
                  <li>
                    <a href="form-rangeslider.html">
                      <i className="mdi mdi-checkbox-blank-circle align-middle"></i>{" "}
                      Slider
                    </a>
                  </li>
                  <li>
                    <a href="form-touchspin.html">
                      <i className="mdi mdi-checkbox-blank-circle align-middle"></i>{" "}
                      Touchspin
                    </a>
                  </li>
                  <li>
                    <a href="form-typeahead.html">
                      <i className="mdi mdi-checkbox-blank-circle align-middle"></i>{" "}
                      Typeahead
                    </a>
                  </li>
                </ul>
              </li>

              <li>
                <a href="#!" className="has-arrow">
                  <i className="fa fa-pencil-ruler"></i> <span>Editors</span>
                </a>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <a href="form-basic-editors.html">
                      <i className="mdi mdi-checkbox-blank-circle align-middle"></i>{" "}
                      Basic
                    </a>
                  </li>
                  <li>
                    <a href="form-bubble-editors.html">
                      <i className="mdi mdi-checkbox-blank-circle align-middle"></i>{" "}
                      Bubble
                    </a>
                  </li>
                  <li>
                    <a href="form-complex-editors.html">
                      <i className="mdi mdi-checkbox-blank-circle align-middle"></i>{" "}
                      Complex
                    </a>
                  </li>
                </ul>
              </li>

              <li>
                <a href="form-input-group.html">
                  <i className="fa fa-th-list"></i> <span>Group</span>
                </a>
              </li>
              <li>
                <a href="form-layout.html">
                  <i className="fa fa-ruler-combined"></i> <span>Layout</span>
                </a>
              </li>
              <li>
                <a href="form-validation.html">
                  <i className="fa fa-check"></i> <span>Validation</span>
                </a>
              </li>

              <li className="menu-title">Pages</li>

              <li>
                <a href="javascript: void(0);" className="has-arrow ">
                  <i className="fa fa-unlock-alt"></i>
                  <span>Authentication</span>
                </a>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <a href="auth-login.html">
                      <i className="mdi mdi-checkbox-blank-circle align-middle"></i>{" "}
                      Login
                    </a>
                  </li>
                  <li>
                    <a href="auth-register.html">
                      <i className="mdi mdi-checkbox-blank-circle align-middle"></i>{" "}
                      Register
                    </a>
                  </li>
                </ul>
              </li>

              <li>
                <a href="javascript: void(0);" className="has-arrow ">
                  <i className="fa fa-unlink"></i>
                  <span>Error</span>
                </a>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <a href="pages-404.html">
                      <i className="mdi mdi-checkbox-blank-circle align-middle"></i>{" "}
                      Error 404
                    </a>
                  </li>
                  <li>
                    <a href="pages-500.html">
                      <i className="mdi mdi-checkbox-blank-circle align-middle"></i>{" "}
                      Error 500
                    </a>
                  </li>
                </ul>
              </li>

              <li>
                <a href="pages-starter.html">
                  <i className="fas fa-pager"></i> <span>Starter Page</span>
                </a>
              </li>

            


              


           
              </li> */}
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
}
