import React, { useState, useEffect } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../navbar/Navbar.jsx";
import "./Calendar.css";
import VacationPlanner from "../vacationPlanner/VacationPlanner.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  setStartDate,
  setEndDate,
} from "../../redux/slices/vacationRequest/vacationRequestSlice";
import { fetchIneligiblePeriods } from "../../redux/slices/ineligiblePeriod/ineligiblePeriodSlice";

function Calendar() {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      key: "selection",
    },
  ]);

  const dispatch = useDispatch();
  const vacationRequest = useSelector((state) => state.vacationRequest);
  const ineligiblePeriod = useSelector(
      (state) => state.ineligiblePeriods.periods
    );

  const reduxStartDate = vacationRequest?.startDate
    ? new Date(vacationRequest.startDate)
    : null;
  const reduxEndDate = vacationRequest?.endDate
    ? new Date(vacationRequest.endDate)
    : null;

  const ineligiblePeriods = useSelector(
    (state) => state.ineligiblePeriods?.periods || []
  );

  useEffect(() => {
    dispatch(fetchIneligiblePeriods());
  }, [dispatch]);

  const isDateWithinPeriod = (date, start, end) => {
    return date >= new Date(start) && date <= new Date(end);
  };

  const isDateIneligible = (date) => {
    for (const period of ineligiblePeriods) {
      if (isDateWithinPeriod(date, period.startDate, period.endDate)) {
        return true;
      }
    }
    return false;
  };

  const handleDateChange = (item) => {
    const startDate = new Date(item.selection.startDate);
    const endDate = new Date(item.selection.endDate);

    if (!isDateIneligible(startDate) && !isDateIneligible(endDate)) {
      setState([item.selection]);
      dispatch(setStartDate(startDate.toISOString()));
      dispatch(setEndDate(endDate.toISOString()));
    } else {
      alert(
        "One or more of the selected dates is ineligible. Please choose another date range."
      );
    }
  };

  const getIneligibleDates = () => {
    const dates = [];
    for (const period of ineligiblePeriods) {
      let current = new Date(period.startDate);
      while (current <= new Date(period.endDate)) {
        dates.push(new Date(current));
        current.setDate(current.getDate() + 1);
      }
    }
    return dates;
  };

  return (
    <div className="body-container">
      <Navbar />
      <div className="calendar-container">
        <div className="calendar-header">
          <DateRangePicker
            ranges={state}
            onChange={handleDateChange}
            disabledDates={getIneligibleDates()}
            minDate={new Date()}
          />
          <VacationPlanner
            startDate={state[0].startDate}
            endDate={state[0].endDate}
            reduxStartDate={reduxStartDate}
            reduxEndDate={reduxEndDate}
            dispatch={dispatch}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="mt-4">
          <h3>Ineligible Periods</h3>
          <ul className="list-group">
            {ineligiblePeriods.length > 0 ? (
              ineligiblePeriods.map((period, index) => (
                <li key={index} className="list-group-item">
                  {period.startDate} to {period.endDate}
                </li>
              ))
            ) : (
              <li className="list-group-item">No ineligible periods</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Calendar;
