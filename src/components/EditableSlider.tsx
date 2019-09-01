import React, { useState, useRef } from 'react'
import mod from "../scss/modules.module.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const timeout = (ms: number): Promise<void> => {
  return new Promise<void>(resolve => setTimeout(resolve, ms))
}

type props = {
  images: string[],
  setState: (value: string[]) => void
}

const EditableSlider: React.FC<props> = (props: props) => {
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
  const removeImage = (index: number): void => {
    console.log(index)
    let copyImages = props.images.concat()
    copyImages.splice(index, 1)
    props.setState(copyImages)
  }
  return (
    <div className={mod.slider01 + " " + mod.slider01_editable}>
      <div className={mod.eyecatch + " " + mod.eyecatchActive} ref={eyecatch}>
        <img src={src} alt="" />
      </div>
      <ul className={mod.thumbnails}>
        {props.images.map((img, index) => {
          return (
            <li className={img === src ? mod.thumbnailActive : undefined} key={img} onTouchEnd={(e) => { e.preventDefault(); slideImg(img) }} onClick={() => { slideImg(img) }}>
              <img src={img} alt="" />
              <div
                className={mod.remove}
                onTouchEnd={e => {
                  e.preventDefault()
                  removeImage(index)
                }}
                onClick={() => {
                  removeImage(index)
                }}
              >
                <FontAwesomeIcon icon={"times"} />
              </div>
            </li>
          )
        }
        )}
      </ul>
    </div>
  )
}

export default EditableSlider
