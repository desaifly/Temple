import * as React from "react";
import Loading from "../Loading/Loading";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick
import listPlugin from '@fullcalendar/list';
import { fadeIn } from "animate.css"
import { Settings } from "../../Resources/Utility/Config";
import '../../Resources/CSS/calendar.scss';
import bsBreakpoints from 'bs-breakpoints';
import $ from 'jquery';
import { isNullOrUndefined } from "../../Resources/Utility/verifying/verfyItems";

const basePath = "./Images";
class Calendar extends React.Component {
    constructor(props) {
        super(props);
        bsBreakpoints.init();
        this.state = {
            Settings: null,
            viewType: props.viewType ? props.viewType : "Weekly",
            breakpoint: bsBreakpoints.getCurrentBreakpoint(),
        }


    }

    componentDidUpdate(prevProps) {
        if (this.props.viewType !== prevProps.viewType) {
            this.setState({ viewType: this.props.viewType ? this.props.viewType : "Weekly" });
        }
    }
    componentDidMount() {

        let localSettings = null;
        Settings(["Calendar.json"])
            .then(result => {
                localSettings = JSON.parse(result);
                this.setState({ Settings: localSettings })
            })
        window.addEventListener('new.bs.breakpoint', event => {
            this.setState({
                breakpoint: event.detail
            });
        });

        $(function () {
            $('[data-toggle="popover"]').popover()
        })

        // Initialize popover component
        $(function () {
            $('[data-toggle="popover"]').popover()
        })
    }

    getHeader() {
        let breakpoint = bsBreakpoints.getCurrentBreakpoint();
        let output = {
            left: 'prev,next',
            center: 'title',
            right: "dayGridMonth,dayGridWeek,timeGridDay,listWeek"
        }

        if (breakpoint === "xSmall") {
            output.left = 'prev,next';
            output.center = 'title'
        }
        if (breakpoint === "small") {
            output.left = 'prev,next';
            output.center = ''
            output.right = "dayGridWeek,timeGridDay,listWeek"
        }
        return output;
    }

    render() {
        const { Settings, viewType, breakpoint } = this.state;
        return (

            <div className="d-flex w-100 h-100 justify-content-center animated fadeIn"  >
                {
                    Settings
                        ? <div className="d-flex w-100 flex-column animated fadeIn">
                            <FullCalendar defaultView={
                                viewType === "Weekly"
                                    ? "dayGridWeek"
                                    : "dayGridMonth"
                            }
                                eventClick={
                                    function (event) {

                                    }
                                }
                                eventRender={
                                    event => {
                                        if (!isNullOrUndefined(event.event.extendedProps.description)) {
                                            event.el.setAttribute('rel', "popover");
                                            event.el.setAttribute('data-container', "body");
                                            event.el.setAttribute('data-toggle', "popover");
                                            event.el.setAttribute('data-placement', "auto");
                                            event.el.setAttribute('data-html', "true");
                                            event.el.setAttribute('data-trigger', "hover");
                                            event.el.setAttribute('data-content', event.event.extendedProps.description);
                                        }

                                    }
                                }
                                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                                events={Settings.events}
                                header={this.getHeader()}
                                titleFormat={{ year: 'numeric', month: 'short', day: 'numeric' }}
                                height="auto"

                            />
                        </div>
                        : <div className="ImageSize2 pl-2"><Loading /></div>
                }
            </div>
        )
    }
}
export default Calendar
