import React from "react";
import "components/InterviewerListItem.scss";

var classNames = require('classnames');

export default function InterviewerListItem(props) {

  const {avatar, selected}  = props;

  const dayClass = classNames("interviewers__item", {
    "interviewers__item--selected": selected,
  });

  const imageClass = classNames ("interviewers__item-image", {
    "interviewers__item-image--selected-image": selected
  })
  

  return (
    <li className={dayClass} onClick = {props.setInterviewer}>
      <img
        className= {imageClass}
        src= {avatar}
        alt="Sylvia Palmer"
      />
       {props.selected && props.name}
    </li>
  );
}