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

    const finalDateOfMonth =
      new Date(state.currentYear, state.currentMonth, 0).getDate()

    const firstDayOfTheWeek =
      new Date(state.currentYear, state.currentMonth - 1, 1).getDay()

    const dates = Array(35).fill(null).map((_, i) => {
      // 正規化した日付
      const normarizeDate = i - firstDayOfTheWeek + 1
      // 曜日は0が日曜日なので例えばfirstDayOfTheWeekが
      // 水曜日で3のとき、0 <= i < 3の範囲で""を返す。
      // => 一週目の日月火が空白になる。
      const isBeforeFirst = i < firstDayOfTheWeek
      const isAfterFinal = normarizeDate > finalDateOfMonth

      if (isBeforeFirst || isAfterFinal) {
        return ""
      }
      else return (normarizeDate).toString()
    })
    return dates
  }

  const changeMonth = (msg: "prev" | "next") => {
    setState(prevState => {
      if (msg === "prev") {
        if (prevState.currentMonth === 1) {
          return {
            ...state,
            currentYear: prevState.currentYear - 1,
            currentMonth: 12
          }
        }
        else {
          return {
            ...state,
            currentMonth: prevState.currentMonth - 1
          }
        }
      }

      else if (msg === "next") {
        if (prevState.currentMonth === 12) {
          return {
            ...state,
            currentYear: prevState.currentYear + 1,
            currentMonth: 1
          }
        }
        else {
          return {
            ...state,
            currentMonth: prevState.currentMonth + 1
          }
        }
      }
      else return state
    })
  }


  return (
    <div className={mod.datePicker}>
      <div className={mod.box}>
        <p
          className={mod.btn + " " + mod.prev}
          onClick={() => changeMonth("prev")}
          onTouchEnd={e => {
            e.preventDefault()
            changeMonth("prev")
          }}
        ><span></span></p>
        <p
          className={mod.btn + " " + mod.next}
          onClick={() => changeMonth("next")}
          onTouchEnd={e => {
            e.preventDefault()
            changeMonth("next")
          }}
        ><span></span></p>
        <p className={mod.year}><span>{state.currentMonth}</span> {state.currentYear}</p>
        <div className={mod.week}>
          {dayOfTheWeek.map((day, index) => <p key={index}>{day}</p>)}
        </div>
        <div className={mod.date}>
          {computeDates().map((date, index) => {
            const className = Number(date) === state.currentDate ? mod.current : undefined
            return (
              <p
                key={index}
                className={className}
                onClick={e => {
                  setState({ ...state, currentDate: Number(date) })
                }}
                onTouchEnd={e => {
                  e.preventDefault()
                  setState({ ...state, currentDate: Number(date) })
                }}
              > {date}</p>)
          })}
        </div>
      </div>
      <p className={mod.selected}>
        {`${state.currentYear}年${state.currentMonth}月${state.currentDate}日が選択されました`}<span role="img" aria-label="face">😎</span>
      </p>
    </div >
  )
}

export default DatePicker
