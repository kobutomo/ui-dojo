import React, { useState } from 'react'
import mod from "../scss/modules/datePicker.module.scss"

const DatePicker: React.FC = () => {

  const today = new Date(Date.now())

  const initialState = {
    currentYear: today.getFullYear(),
    currentMonth: today.getMonth() + 1,
    currentDate: today.getDate()
  }
  const [state, setState] = useState(initialState)

  const dayOfTheWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const computeDates = () => {

    const finalDateOfMonth = new Date(state.currentYear, state.currentMonth, 0).getDate()
    const firstDayOfTheWeek = new Date(state.currentYear, state.currentMonth - 1, 1).getDay()
    console.log([finalDateOfMonth, firstDayOfTheWeek])
    const dates = Array(35).fill(null).map((_, i) => {
      // 曜日は0が日曜日なので例えばfirstDayOfTheWeekが
      // 水曜日で3のとき、0 <= i < 3の範囲で""を返す。
      // => 一週目の日月火が空白になる。
      const isBeforeFirst = i < firstDayOfTheWeek
      const isAfterFinal = i + 1 > finalDateOfMonth

      if (isBeforeFirst || isAfterFinal) {
        return ""
      }
      else return (i + 1).toString()
    })
    return dates
  }


  return (
    <div className={mod.datePicker}>
      <div className={mod.box}>
        <p className={mod.year}><span>{state.currentMonth}</span> {state.currentYear}</p>
        <div className={mod.week}>
          {dayOfTheWeek.map(day => <p>{day}</p>)}
        </div>
        <div className={mod.date}>
          {computeDates()}
        </div>
      </div>
    </div>
  )
}

export default DatePicker
