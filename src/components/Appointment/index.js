import React from 'react';
import Header from "components/Appointment/header";
import Show from "components/Appointment/show";
import Empty from "components/Appointment/empty";
import Form from "components/Appointment/form";

import useVisualMode from "hooks/useVisualMode";

import "components/Appointment/style.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";



export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment">
      <Header time = {props.time}/>
      {mode === EMPTY && <Empty onAdd={()=> transition(CREATE)} />}
   
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit = {() => console.log("Clicked onEdit")}
          onConfirm = {() => console.log("Clicked onConfirm")}
        />
      )}

      {mode === CREATE && (
        <Form interviewers = {props.interviewers} onCancel = {()=> back()}/>
      )}

    </article>
  )
}