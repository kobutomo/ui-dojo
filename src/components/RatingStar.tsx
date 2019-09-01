import React from 'react';
import mod from "../scss/modules.module.scss"

type props = {
  rating: number
}
const RatingStar: React.FC<props> = (props) => {
  const number = props.rating
  const integer = Math.floor(number) // ratingの整数部分
  const decimal = (number - integer) // ratingの小数部分
  const adjustedDecimal = decimal === 0 ? 0 : 0.5 + (decimal - 0.5) * 0.5 // 小数部分を見えやすくするために調節
  return (
    <div className={mod.ratingStar01}>
      <span>
        <span>★</span>
        <span className={integer >= 0 ? mod.active : undefined}>★</span>
      </span>
      <span>
        <span>★</span>
        <span className={integer >= 1 ? mod.active : undefined} style={integer === 1 ? { width: adjustedDecimal * 100 + "%" } : undefined}>★</span>
      </span>
      <span>
        <span>★</span>
        <span className={integer >= 2 ? mod.active : undefined} style={integer === 2 ? { width: adjustedDecimal * 100 + "%" } : undefined}>★</span>
      </span>
      <span>
        <span>★</span>
        <span className={integer >= 3 ? mod.active : undefined} style={integer === 3 ? { width: adjustedDecimal * 100 + "%" } : undefined}>★</span>
      </span>
      <span>
        <span>★</span>
        <span className={integer >= 4 ? mod.active : undefined} style={integer === 4 ? { width: adjustedDecimal * 100 + "%" } : undefined}>★</span>
      </span>
      <p className={mod.num}>{number}</p>
    </div >
  )
}

export default RatingStar
