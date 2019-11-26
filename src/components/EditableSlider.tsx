import React, { useState, useRef } from 'react'
import mod from "../scss/modules/slider.module.scss"

const timeout = (ms: number): Promise<void> => {
  return new Promise<void>(resolve => setTimeout(resolve, ms))
}

type props = {
  images: string[],
  setImages: (value: string[]) => void,
  src: string,
  slideImage: (next: string, current?: HTMLDivElement | undefined) => Promise<void>,
  removeImage: (index: number) => Promise<void>,
  setImage: (files: FileList) => void
}

const EditableSlider: React.FC<props> = (props: props) => {
  // FIXME: eyecatchの状態管理は下のhasEyecatchと統一したい
  
  const hasEyecatch = props.images.length > 0
  const eyecatch = useRef<HTMLDivElement | null>(null)
  
  
  // propsで画像を受け取っていればEyecatchを表示する
  const showEyecatch = () => {
    if (hasEyecatch) {
      return (
        <img src={props.src} alt="" />
      )
    }
  }

  const showInput = () => {
    // 画像が3枚より少ない場合アップロード用のフィールドを表示する
    if (props.images.length !== 3) {
      return (
        <li className={mod.input}>
          <label
            onDragOver={e => {
              e.currentTarget.classList.add(mod.drag)
            }}
            onDragLeave={e => {
              e.currentTarget.classList.remove(mod.drag)
            }}
            onDrop={e => {
              e.currentTarget.classList.remove(mod.drag)
            }}
          >
            <input type="file"
              onChange={e => {
                if (e.target.files) props.setImage(e.target.files)
              }}
            />
            <span>画像を追加</span>
          </label>
        </li>
      )
    }
  }

  return (
    <div className={mod.slider01 + " " + mod.slider01_editable}>
      <div className={mod.eyecatch + " " + mod.eyecatchActive} ref={eyecatch}>
        {showEyecatch()}
      </div>
      <ul className={mod.thumbnails}>
        {props.images.map((img, index) => {
          return (
            <li className={img === props.src ? mod.thumbnailActive : undefined} key={img} onTouchEnd={(e) => { e.preventDefault(); props.slideImage(img) }} onClick={() => { props.slideImage(img) }}>
              <img src={img} alt="" />
              <div
                className={mod.remove}
                onTouchEnd={e => {
                  e.preventDefault()
                  props.removeImage(index)
                }}
                onClick={() => {
                  props.removeImage(index)
                }}
              >
              </div>
            </li>
          )
        }
        )}
        {showInput()}
      </ul>
    </div>
  )
}

export default EditableSlider
