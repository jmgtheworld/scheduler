import React, { useState, useEffect, Fragment } from "react";
import DayList from "components/DayList";
import Appointment from "components/Appointment";

import "components/Application.scss";

const axios = require('axios');

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "David Wallace",
      interviewer: {
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  {
    id: 4,
    time: "3pm",
  },
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "Pam",
      interviewer: {
        id: 3,
        name: "Mildred Nazir",
        avatar: "https://i.imgur.com/T2WwVfS.png",
      }
    }
  }
];

export default function Application(props) {

  const [days,setDays] = useState([])
  const url = "http://localhost:8001/api/days";

  useEffect(()=> {
    axios.get(url)
    .then(response => {
      console.log(response.data)
      setDays(response.data)
    })
  },[])

  const allAppointments = appointments.map(appointment => {
    return (
              <Appointment key = {appointment.id} 
                          time = {appointment.time} 
                          interview= {appointment.interview}
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
          days = {days}
          setDay = {setDays}
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
