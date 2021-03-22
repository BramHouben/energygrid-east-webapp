import React, { Component } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import ReactTooltip from "react-tooltip";
import "./index.css";

export default class HeatMap extends Component {
  constructor(props) {
    super(props);
  }

  shiftDate(date, numDays) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + numDays);
    return newDate;
  }

  getRange(count) {
    return Array.from({ length: count }, (_, i) => i);
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 100)) + min;
  }

  render() {
    const today = new Date();

    const randomValues = this.getRange(365).map((index) => {
      return {
        date: this.shiftDate(today, -index),
        count: this.getRandomInt(1, 3),
      };
    });

    return (
      <div>
        <CalendarHeatmap
          startDate={this.shiftDate(today, -365)}
          endDate={today}
          values={randomValues}
          classForValue={(value) => {
            if (!value) {
              return "color-empty";
            }
            return `color-github-${
              value.count < 0
                ? 0
                : value.count >= 0 && value.count < 25
                ? 1
                : value.count >= 25 && value.count < 50
                ? 2
                : value.count >= 50 && value.count < 75
                ? 3
                : value.count >= 75
                ? 4
                : 0
            }`;
          }}
          tooltipDataAttrs={(value) => {
            return {
              "data-tip": `${value.date
                .toISOString()
                .slice(0, 10)} energy in KwH: ${value.count}`,
            };
          }}
          showWeekdayLabels={true}
          onClick={(value) =>
            alert(`Clicked on value with count: ${value.count}`)
          }
        />
        <ReactTooltip />
      </div>
    );
  }
}
