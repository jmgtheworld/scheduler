import React from 'react';
import Header from "components/Appointment/header";
import Show from "components/Appointment/show";
import Empty from "components/Appointment/empty";
import Form from "components/Appointment/form";
import Status from "components/Appointment/status";
import Confirm from "components/Appointment/confirm";
import Error from "components/Appointment/error";

import useVisualMode from "hooks/useVisualMode";

import "components/Appointment/style.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
   console.log(name)
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  }

  function cancelConfirm() {
    transition(SHOW)
  }

  function confirm() {
    transition(CONFIRM)
  }

  function cancel(name, interviewer) {
   
    const interview = {
      student: null,
      interviewer: null
    };

    transition(DELETING)
    props.cancelInterview(props.id ,interview)
    .then( () => transition(EMPTY))
    .catch(error => transition(ERROR_DELETE, true));
 
  }



  return (
    <article className="appointment">
      <Header time = {props.time}/>
      {mode === EMPTY && <Empty onAdd={()=> transition(CREATE)} />}
   
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit = {()=> transition(EDIT)}
          onCancel = {confirm}
          // onConfirm = {() => console.log("Clicked onConfirm")}
        />
      )}

      {mode === EDIT && (
        <Form value = {props.interview.student} 
              interviewer = {props.interview.interviewer} 
              interviewers = {props.interviewers} 
              onCancel = {()=> back()} 
              onSave = {save}/>
      )}

      {mode === CREATE && (
        <Form interviewers = {props.interviewers} onCancel = {()=> back()} onSave = {save}/>
      )}

      {mode === SAVING && <Status message = "Saving..."/> }
      {mode === CONFIRM && <Confirm  onCancel = {cancelConfirm} onConfirm = {cancel} message = "Are you sure you want to cancel this interview?" /> }
      {mode === DELETING && <Status message = "Deleting..."/> }

      {mode === ERROR_DELETE && <Error onClose = {()=> back()} message = "Error Deleting Message!"/> }
      {mode === ERROR_SAVE && <Error onClose = {()=> back()} message = "Error Saving Message!"/> }
    </article>
  )
}