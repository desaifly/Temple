import * as React from "react";
import Loading from "../Loading/Loading";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import { fadeIn } from "animate.css"
import { Settings } from "../../Resources/Utility/Config";

const basePath = "./Images";
class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Settings: null,
            viewModel: null,
        }


    }

    componentDidUpdate(prevProps) {
        // if (this.props.Settings !== prevProps.Settings) {
        //     this.setState({ Settings: this.props.Settings ? this.props.Settings : null });
        // }
    }
    componentDidMount() {

        let localSettings = null;
        Settings(["Calendar.json"])
            .then(result => {
                localSettings = JSON.parse(result);
                this.setState({ Settings: localSettings })
            })


    }

    render() {
        const { Settings, viewModel } = this.state;
        return (

            <div className="d-flex w-100 h-100 justify-content-center" >
                {
                    Settings
                        ? <div className="d-flex w-100 h-100 flex-column">
                            <FullCalendar defaultView="dayGridWeek" plugins={[dayGridPlugin]}
                                events={Settings.events}
                                header={{
                                    left: 'prev,next today',
                                    center: 'title',
                                    right: "dayGridMonth,dayGridWeek,timeGridDay,listWeek"
                                }}
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
