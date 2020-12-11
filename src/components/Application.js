import React, { useState, useEffect, Fragment } from "react";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay} from "helpers/selectors"

import "components/Application.scss";

const axios = require('axios');

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  const setDay = day => setState({ ...state, day });
  const setDays = (days) => setState(prev => ({ ...prev, days }));;

  useEffect(()=> {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then((all) => {
      console.log(all)
      setState(prev=> ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
      
    });
  },[])


  const dailyAppointments = getAppointmentsForDay(state, state.day)
  const dailyInterviewers = getInterviewersForDay(state, state.day)

  const allAppointments = dailyAppointments.map(appointment => {

    const interview = getInterview(state, appointment.interview);

    return (
              <Appointment key = {appointment.id} 
                          id = {appointment.id}
                          time = {appointment.time} 
                          interview= {interview}
                          interviewers = {dailyInterviewers}
              />  
           );
  })

  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList 
          days = {state.days}
          day = {state.day}
          setDay = {setDay}
          setDays = {setDays}
        />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        <Fragment>
          {allAppointments}
          <Appointment key="last" time="5pm" />
        </Fragment>
      </section>
    </main>
  );
}
