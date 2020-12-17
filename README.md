# Interview Scheduler

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Running Cypress E2E Test FrameWork

### Preparing the Database
Change developement env from development to test (found in environment.js in scheduler-api directory)

```sh
  const ENV = process.env.NODE_ENV || "test";
```
Reset the test database by making a GET request to http://localhost:8001/api/debug/reset. If configured properly, we can now run the following in vagrant (guest terminal)


### Terminal 1
Run the npm run test:server command in the scheduler-api directory.
```sh
npm run test:server
```
### Terminal 2
Run the webpack development server from the root of our Interview Scheduler client project.
```sh
npm start
```

### Terminal 3
On a different terminal, run the following to start cypress
```sh
npm run cypress
```


## Screenshots
!["Appointment form of scheduler app"](https://github.com/jmgtheworld/scheduler/blob/master/docs/Appointment-form.png?raw=true)

!["Appointment form with name error when user tries to submit form with empty name"](https://github.com/jmgtheworld/scheduler/blob/master/docs/Appointment-form-name-error.png?raw=true)

!["Appointment form with interviewer error when user tries to submit form without selecting an interviewer"](https://github.com/jmgtheworld/scheduler/blob/master/docs/Appointment-form-interviewer-error.png?raw=true)

!["Appointment form asking confirmation for deleting an existing appointment"](https://github.com/jmgtheworld/scheduler/blob/master/docs/Appointment-form-confirm-delete.png?raw=true)