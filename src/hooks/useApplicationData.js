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

  const changedDay = (state) => {
    const updatedDays = [];
      for (let day of state.days) {
        let updatedSpots = 0;
        day.appointments.forEach( (appointmentid) => {
          if (state.appointments[appointmentid].interview === null) {
            updatedSpots++
          }
        })
        updatedDays.push({...day, spots: updatedSpots})
      }  
      return updatedDays
    }

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

  

    return axios.put(`/api/appointments/${appointment.id}`, appointment)
    .then((all) => {
      setState(prev => {
        const newState = {...prev, appointments}
        let updatedDays = changedDay(newState)
        newState.days = updatedDays
        return newState
      })
    })
  }

  function cancelInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${appointment.id}`, appointment)
    .then((all) => {
      setState(prev => {
        const newState = {...prev, appointments}
        let updatedDays = changedDay(newState)
        newState.days = updatedDays
        return newState
      })
    })
  }

  return {state, setDay, setDays, bookInterview, cancelInterview}
}