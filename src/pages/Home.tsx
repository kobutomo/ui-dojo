import React, { useState } from 'react'
import EditableRatingStar from '../components/EditableRatingStar'
import RatingStar from '../components/RatingStar'

const Home: React.FC = () => {
  type state = {
    rating: number
  }
  const initialState = {
    rating: 0
  }
  const [state, setState] = useState<state>(initialState)

  const changeRating = (rating: number) => {
    setState({ ...state, rating: rating })
  }

  return (
    <div id="container">
      <h2>☆のやつ(readonly)</h2>
      <RatingStar
        rating={3.5}
      />
      <h2>☆のやつ(編集用)</h2>
      <EditableRatingStar
        rating={state.rating}
        changeRating={changeRating}
      />
    </div>
  )
}

export default Home
