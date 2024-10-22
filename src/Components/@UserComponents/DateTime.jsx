// import React from 'react';
// import dayjs from 'dayjs';
// import TextField from '@mui/material/TextField';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
// import Stack from '@mui/material/Stack';

// function DateTime() {
//   const [startTime, setStartTime] = React.useState(null);  // State for start time
//   const [endTime, setEndTime] = React.useState(null);      // State for end time

//   return (
//     <div>
//       <LocalizationProvider dateAdapter={AdapterDayjs}>
//         <Stack spacing={3}>
//           {/* Start Time Picker */}
//           <DateTimePicker
//             renderInput={(params) => <TextField {...params} />}
//             label="Start Time"
//             value={startTime}
//             onChange={(newValue) => {
//               setStartTime(newValue);
//             }}
//             minDateTime={dayjs('2022-04-02T12:00')}
//           />

//           {/* End Time Picker */}
//           <DateTimePicker
//             renderInput={(params) => <TextField {...params} />}
//             label="End Time"
//             value={endTime}
//             onChange={(newValue) => {
//               setEndTime(newValue);
//             }}
//             minDate={dayjs('2024-10-14')} // Minimum selectable date for the end time
//             minTime={dayjs('2024-10-14T08:00')} // Minimum selectable time for the end time
//             maxTime={dayjs('2024-10-14T18:45')} // Maximum selectable time for the end time
//           />
//         </Stack>
//       </LocalizationProvider>
//     </div>
//   );
// }

// export default DateTime;
