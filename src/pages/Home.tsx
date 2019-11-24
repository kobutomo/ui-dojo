import React, { useState } from 'react'
import slider01 from "../img/slider01.jpg"
import slider02 from "../img/slider02.jpg"
import slider03 from "../img/slider03.jpg"
import EditableRatingStar from '../components/EditableRatingStar'
import RatingStar from '../components/RatingStar'
import Slider from '../components/Slider'
import EditableSlider from '../components/EditableSlider'
import Switch from '../components/Switch'
import Tabs from '../components/Tabs'
import DatePicker from '../components/DatePicker'
import TwitterClone from '../components/TwitterClone'
import Tetris from '../components/Tetris'
import CardForm from '../components/CardForm'

const Home: React.FC = () => {
  type state = {
    rating: number
    images: string[]
  }
  const initialState = {
    rating: 0,
    images: []
  }
  const [state, setState] = useState<state>(initialState)

  const changeRating = (rating: number) => {
    setState({ ...state, rating: rating })
  }

  const changeImages = (images: string[]) => {
    setState({ ...state, images: images })
  }



  return (
    <div id="container">
      {/* <h2>テトリス</h2>
      <Tetris
        fieldHeight={20}
        fieldWidth={10}
      /> */}
      <h2>ツイッターのエディタークローン<br/>（メンション、ハッシュタグなど対応）</h2>
      <TwitterClone />
      <h2>画像ギャラリー(readonly)</h2>
      <Slider images={[slider01, slider02, slider03]} />
      <h2>画像ギャラリー(編集用)</h2>
      <EditableSlider
        images={state.images}
        setState={changeImages}
      />
      <h2>タブ切り替え</h2>
      <Tabs />
      <h2>デートピッカー</h2>
      <DatePicker />
      <h2>細かいパーツ</h2>
      <div className="flex">
        <div className="star1">
          <p className="subTit">☆のやつ（readonly）</p>
          <RatingStar
            rating={3.5}
          />
        </div>
        <div className="star2">
          <p>編集用</p>
          <EditableRatingStar
            rating={state.rating}
            changeRating={changeRating}
          />
        </div>
        <div>
          <p className="subTit">iOSのアレ</p>
          <Switch />
        </div>
      </div>
    </div>
  )
}

export default Home
