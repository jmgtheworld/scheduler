import React from "react";
import "components/DayListItem.scss";

var classNames = require('classnames');

export default function DayListItem(props) {

  const {spots, selected} = props;

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": spots === 0
  });


  const formatSpots = (spots) => {
    if (spots === 0) {
      return "no spots"
    }
    if (spots === 1) {
      return "1 spot"
    }
    return `${spots} spots`
  }

  return (
    <li className = {dayClass}  data-testid = "day" onClick = {props.setItem}>
      <h2 className="text--regular"> {props.name} </h2> 
      <h3 className="text--light"> {formatSpots(spots) + " remaining"} </h3>
    </li>
  );
}