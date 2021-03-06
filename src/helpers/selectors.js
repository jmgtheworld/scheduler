

export const getAppointmentsForDay = (state, day) => {
  let array = [];
  const filteredDay = state.days.filter(Day => Day.name === day);
  if (!filteredDay[0]){
    return array;
  }
  const appointmentsForFilteredDay = filteredDay[0].appointments;

  if (appointmentsForFilteredDay.length) {
    for(let appointment of appointmentsForFilteredDay) {
      array.push(state.appointments[appointment])
    }
  } 

  return array;
}

export const getInterview = (state, interview) => {

  if (!interview){
    return null;
  }

  let interviewInfo = {};
  const interviewerID = interview.interviewer;

  interviewInfo = {
    "student": interview.student,
    "interviewer": state.interviewers[interviewerID]
  }

  return interviewInfo;
}

export const getInterviewersForDay = (state, day) => {
  let array = [];
  const filteredDay = state.days.filter(Day => Day.name === day);

  if (!filteredDay[0]){
    return array;
  }

  const appointmentsForFilteredDay = filteredDay[0].interviewers;

  if (!appointmentsForFilteredDay){
    return array;
  }

  for(let appointment of appointmentsForFilteredDay) {
    array.push(state.interviewers[appointment])
  }
  
  return array;
}