import React from 'react';
import mod from "../scss/modules/ratingStar.module.scss"

type props = {
  rating: number,
  changeRating: (rating: number) => void
}
const RatingStar: React.FC<props> = (props) => {
  const number = props.rating
  const integer = Math.floor(number) // ratingの整数部分
  return (
    <div className={mod.ratingStar02}>
      <span
        onTouchEnd={(e) => {
          props.changeRating(1)
          e.preventDefault()
        }}
        onClick={() => props.changeRating(1)}
      >
        <span>★</span>
        <span className={integer >= 1 ? mod.active : undefined}>★</span>
      </span>
      <span
        onTouchEnd={(e) => {
          props.changeRating(2)
          e.preventDefault()
        }}
        onClick={() => props.changeRating(2)}
      >
        <span>★</span>
        <span className={integer >= 2 ? mod.active : undefined}>★</span>
      </span>
      <span
        onTouchEnd={(e) => {
          props.changeRating(3)
          e.preventDefault()
        }}
        onClick={() => props.changeRating(3)}
      >
        <span>★</span>
        <span className={integer >= 3 ? mod.active : undefined}>★</span>
      </span>
      <span
        onTouchEnd={(e) => {
          props.changeRating(4)
          e.preventDefault()
        }}
        onClick={() => props.changeRating(4)}
      >
        <span>★</span>
        <span className={integer >= 4 ? mod.active : undefined}>★</span>
      </span>
      <span
        onTouchEnd={(e) => {
          props.changeRating(5)
          e.preventDefault()
        }}
        onClick={() => props.changeRating(5)}
      >
        <span>★</span>
        <span className={integer >= 5 ? mod.active : undefined}>★</span>
      </span>
      <p className={mod.num}>{number}</p>
    </div >
  )
}

export default RatingStar
