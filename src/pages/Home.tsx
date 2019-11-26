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
import CardForm from "../components/CardForm"
import useSlider from "../hooks/useSlider"

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

  const [images, setImages, src, slideImage, removeImage, setImage] = useSlider()
  const changeImages = (images: string[]) => {
    setState({ ...state, images: images })
  }



  return (
    <div id="container">
      <h2>クレジットカードフォーム</h2>
      <p style={{ marginBottom: 30 }}>
        参考: <a href="https://qiita.com/baby-degu/items/d68e52a0727248ba2750" target="_blank" rel="noopener noreferrer" style={{ color: "#3366ff", textDecoration: "underline" }}>フロントエンドのコーディング課題６選-このフロントエンドの課題、実装できますか？</a><br /><br />未完成です。<br />Vueで書かれたものをReactで再実装。<br />なお、本来クレジットカードのフォームを自前で用意するのはセキュリティの観点からNGとのこと。
      </p>
      <CardForm />
      {/* <h2>テトリス</h2>
      <Tetris
        fieldHeight={20}
        fieldWidth={10}
      /> */}
      <h2>ツイッターのエディタークローン<br />（メンション、ハッシュタグなど対応）</h2>
      <TwitterClone />
      <h2>画像ギャラリー(readonly)</h2>
      <Slider images={[slider01, slider02, slider03]} />
      <h2>画像ギャラリー(編集用)</h2>
      <EditableSlider
        images={state.images}
        setImages={setImages}
        slideImage={slideImage}
        removeImage={removeImage}
        setImage={setImage}
        src={src}
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
