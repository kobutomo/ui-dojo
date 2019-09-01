import React from 'react';
import mod from "../scss/modules.module.scss"
import ratingContext from "../contexts/ratingContext"

type props = {
  rating: number
}
const RatingStar: React.FC<props> = (props) => {
  const number = props.rating
  const integer = Math.floor(number) // ratingの整数部分
  return (
    <ratingContext.Consumer>
      {
        loginContext => (
          <div className={mod.ratingStar02}>
            <span onTouchEnd={() => loginContext.changeRating(1)}>
              <span>★</span>
              <span className={integer >= 1 ? mod.active : undefined}>★</span>
            </span>
            <span onTouchEnd={() => loginContext.changeRating(2)}>
              <span>★</span>
              <span className={integer >= 2 ? mod.active : undefined}>★</span>
            </span>
            <span onTouchEnd={() => loginContext.changeRating(3)}>
              <span>★</span>
              <span className={integer >= 3 ? mod.active : undefined}>★</span>
            </span>
            <span onTouchEnd={() => loginContext.changeRating(4)}>
              <span>★</span>
              <span className={integer >= 4 ? mod.active : undefined}>★</span>
            </span>
            <span onTouchEnd={() => loginContext.changeRating(5)}>
              <span>★</span>
              <span className={integer >= 5 ? mod.active : undefined}>★</span>
            </span>
            <p className={mod.num}>{number}</p>
          </div >
        )
      }
    </ratingContext.Consumer>
  )
}

export default RatingStar
