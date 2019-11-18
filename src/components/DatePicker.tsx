import React from 'react'
import mod from "../scss/modules/datePicker.module.scss"
import useCalendar from "../hooks/useClendar"

const dayOfTheWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

const DatePicker: React.FC = () => {

  const [currentYear, currentMonth, currentDate, currentDates, hundleChangeMonth, hundleClickDate] = useCalendar()

  return (
    <div className={mod.datePicker}>
      <div className={mod.box}>
        <p
          className={mod.btn + " " + mod.prev}
          onClick={() => hundleChangeMonth("prev")}
          onTouchEnd={e => {
            e.preventDefault()
            hundleChangeMonth("prev")
          }}
        ><span></span></p>
        <p
          className={mod.btn + " " + mod.next}
          onClick={() => hundleChangeMonth("next")}
          onTouchEnd={e => {
            e.preventDefault()
            hundleChangeMonth("next")
          }}
        ><span></span></p>
        <p className={mod.year}><span>{currentMonth}</span> {currentYear}</p>
        <div className={mod.week}>
          {dayOfTheWeek.map((day, index) => <p key={index}>{day}</p>)}
        </div>
        <div className={mod.date}>
          {currentDates.map((date, index) => {
            // 日付がcurrentDateと同じだったらクラスを付ける
            const className = parseInt(date) === currentDate ? mod.current : undefined

            return (
              <p
                key={index}
                className={className}
                onClick={e => {
                  hundleClickDate(date)
                }}
                onTouchEnd={e => {
                  e.preventDefault()
                  hundleClickDate(date)
                }}
              > {date}</p>)
          })}
        </div>
      </div>
      <p className={mod.selected}>
        {`${currentYear}年${currentMonth}月${currentDate}日が選択されました`}
      </p>
    </div >
  )
}

export default DatePicker
