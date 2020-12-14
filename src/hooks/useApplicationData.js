import React, { useState, useEffect, Fragment } from "react";

const axios = require('axios');

export default function useApplicationData(initial) {
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

  function bookInterview(id, interview) {
    console.log(id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const changedDay = (id) => {
      for (let day in state.days) {
        if (state.days[day].appointments.includes(id)){
          return day
        }
      }  
    }

    const day = {
      ...state.days[changedDay],
      spots: "2"
    };

    const spots = {
      ...state.days,
      [changedDay] : day
    }

 
  
    return axios.put(`/api/appointments/${id}`, {interview})
    .then((all) => {
      setState({...state, appointments, spots})
    })
  }

  function cancelInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`)
    .then((all) => {
      setState({...state, appointments})
    })
  }

  return {state, setDay, setDays, bookInterview, cancelInterview}
}