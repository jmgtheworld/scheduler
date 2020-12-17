import React from "react";
import axios from "axios";

import { render, cleanup, getByText, queryByText, getByAltText, 
  getByPlaceholderText, waitForElement , fireEvent, prettyDOM, 
  getAllByTestId, queryByAltText, getByTestId, getByDisplayValue, getByLabelText } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

it("defaults to Monday and changes the schedule when a new day is selected", () => {
  const { getByText } = render(<Application />);
  return waitForElement(() => getByText("Monday"));
});

it("defaults to Monday and changes the schedule when a new day is selected", () => {
  const { getByText } = render(<Application />);
  return waitForElement(() => getByText("Monday")).then(() => {
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });
});

it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
  const { container } = render(<Application />);

  await waitForElement(() => getByText(container, "Archie Cohen"));

  const appointments = getAllByTestId(container, "appointment");
  const appointment = appointments[0];

  // 3. Click the "Add" button on the first empty appointment.
  fireEvent.click(getByAltText(appointment, "Add"));

  // 4. Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Lydia Miller-Jones" }
  });

  // 5. Click the first interviewer in the list.
  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

  // 6. Click the "Save" button on that same appointment.
  fireEvent.click(getByText(appointment, "Save"));

  // 7. Check that the element with the text "Saving" is displayed.
  expect(getByText(appointment, "Saving...")).toBeInTheDocument();

  // 8. Wait until the element with the text "Lydia Miller-Jones" is displayed.
  await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
  
  // 9. Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );

  expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  
});

it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
  // 1. Render the Application.
  const { container } = render(<Application />);

  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));

  // 3. Click the "Delete" button on the booked appointment.
  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
  );
  
  fireEvent.click(queryByAltText(appointment, "Delete"));

  // 4. Check that the confirmation message is shown.
  expect(getByText(appointment, "Are you sure you want to cancel this interview?"));

  // 5. Click the "Confirm" button on the confirmation.
  fireEvent.click(getByText(appointment, "Confirm"));

  // 6. Check that the element with the text "Deleting" is displayed.
  expect(getByText(appointment, "Deleting...")).toBeInTheDocument();
  
  // 7. Wait until the element with the "Add" button is displayed.
  await waitForElement(()=> queryByAltText(appointment, "Add"));

  // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );

  expect(getByText(day, "2 spots remaining")).toBeInTheDocument();

});

it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
  // 1. Render the Application.
  const { container } = render(<Application />);

  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));

  // We want to start by finding an existing interview.
  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
  );

  // With the existing interview we want to find the edit button.
  expect(getByAltText(appointment, "Edit")).toBeInTheDocument();
  fireEvent.click(getByAltText(appointment, "Edit"));

  // We change the name and save the interview.
  fireEvent.change(getByDisplayValue(appointment,  "Archie Cohen"), {
    target: { value: "Lydia Miller-Jones" }
  });

  // We don't want the spots to change for "Monday", since this is an edit.
  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );

  // 6. Click the "Save" button on that same appointment.
  fireEvent.click(getByText(appointment, "Save"));

  // 7. Check that the element with the text "Saving" is displayed.
  expect(getByText(appointment, "Saving...")).toBeInTheDocument();

  // 8. Wait until the element with the text "Lydia Miller-Jones" is displayed.
  await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

  expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  
});

it("shows the save error when failing to save an appointment", async () => {
  const { container } = render(<Application />);

  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));

   // We want to start by finding an existing interview.
  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
  );

  // With the existing interview we want to find the edit button.
  expect(getByAltText(appointment, "Edit")).toBeInTheDocument();
  fireEvent.click(getByAltText(appointment, "Edit"));

  // We change the name and save the interview.
  fireEvent.change(getByDisplayValue(appointment,  "Archie Cohen"), {
    target: { value: "Lydia Miller-Jones" }
  });

  // We don't want the spots to change for "Monday", since this is an edit.
  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );

  axios.put.mockRejectedValueOnce();
  fireEvent.click(getByText(appointment, "Save"));
  expect(getByText(appointment, "Saving...")).toBeInTheDocument();


  await waitForElement ( () => getByText(appointment, "Error Saving Message!") )
  expect(getByText(appointment, "Error Saving Message!")).toBeInTheDocument();
});


it("shows the delete error when failing to delete an existing appointment", async () => {
  const { container } = render(<Application />);

  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));

   // We want to start by finding an existing interview.
  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
  );

  // With the existing interview we want to find the edit button.
  expect(getByAltText(appointment, "Delete")).toBeInTheDocument();
 
  fireEvent.click(getByAltText(appointment, "Delete"));

  axios.delete.mockRejectedValueOnce();
  fireEvent.click(getByText(appointment, "Confirm"));
  expect(getByText(appointment, "Deleting...")).toBeInTheDocument();

  await waitForElement ( () => getByText(appointment, "Error Deleting Message!") )
  expect(getByText(appointment, "Error Deleting Message!")).toBeInTheDocument();

});