import React, { useState, useRef } from 'react'
import mod from "../scss/modules.module.scss"

const timeout = (ms: number): Promise<void> => {
  return new Promise<void>(resolve => setTimeout(resolve, ms))
}

type props = {
  images: string[]
}

const Slider: React.FC<props> = (props: props) => {
  const initialState = props.images[0]
  const [src, setSrc] = useState(initialState)
  const eyecatch = useRef<HTMLDivElement | null>(null)
  async function slideImg(src: string) {
    const current = eyecatch.current
    if (current) {
      current.classList.remove(mod.eyecatchActive)
      setSrc(src)
      await timeout(230)
      current.classList.add(mod.eyecatchActive)
    }
  }
  return (
    <div className={mod.slider01}>
      <div className={mod.eyecatch + " " + mod.eyecatchActive} ref={eyecatch}>
        <img src={src} alt="" />
      </div>
      <ul className={mod.thumbnails}>
        {props.images.map((img) => {
          return (
            <li className={img === src ? mod.thumbnailActive : undefined} key={img} onTouchEnd={(e) => { e.preventDefault(); slideImg(img) }} onClick={() => { slideImg(img) }}>
              <img src={img} alt="" />
            </li>
          )
        }
        )}
      </ul>
    </div>
  )
}

export default Slider
