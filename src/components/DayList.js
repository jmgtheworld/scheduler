import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {

  const days = props.days.map(day => {
    return (
      <DayListItem 
        key = {day.id} 
        spots = {day.spots}
        selected = {day.name === props.day}
        setItem = {event => {props.setItem(days.name)}}
      />
    )
  });

  return (
    <ul> 
      {days}
    </ul>
  );
}