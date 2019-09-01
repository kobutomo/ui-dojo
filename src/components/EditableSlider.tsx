import React, { useState, useRef } from 'react'
import mod from "../scss/modules/slider.module.scss"

const timeout = (ms: number): Promise<void> => {
  return new Promise<void>(resolve => setTimeout(resolve, ms))
}

type props = {
  images: string[],
  setState: (value: string[]) => void
}

const EditableSlider: React.FC<props> = (props: props) => {
  // FIXME: eyecatchの状態管理は下のhasEyecatchと統一したい
  const initialState = props.images[0] || ""
  const [src, setSrc] = useState(initialState)

  // propsで画像を受け取っていればEyecatchを表示する
  const initialEyecatchState =
    src.length > 0 ?
      true : false

  // eyecath表示非表示の状態管理
  const [hasEyecatch, setHasEyecatch] = useState(initialEyecatchState)
  const eyecatch = useRef<HTMLDivElement | null>(null)

  // サムネイルクリック時の処理。
  // アニメーションのために0.23秒間をあけてる。
  async function slideImg(src: string) {
    const current = eyecatch.current
    if (current) {
      current.classList.remove(mod.eyecatchActive)
      await timeout(230)
      setSrc(src)
      current.classList.add(mod.eyecatchActive)
    }
  }

  // 画像削除の処理
  async function removeImage(index: number) {
    // propsのコピーをとってそっちを編集する
    let copyImages = props.images.concat()
    copyImages.splice(index, 1)
    // setStateは非同期処理っぽいのでawaitなしだと
    // 後述のprops.images[newIndex]の値が意図したものにならない
    await props.setState(copyImages)

    // 画像を削除した後に表示させる画像を指定する。
    let newIndex: number
    if (index === 0) {
      newIndex = 1
    } else {
      newIndex = index - 1
    }

    if (copyImages.length === 0) {
      setHasEyecatch(false)
    }
    else {
      slideImg(props.images[newIndex])
    }
  }

  // input:fileの処理
  const setImage = (files: FileList) => {
    let imagesCopy = props.images.concat()
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader()
      const file = files[i]
      reader.onload = function () {
        if (this.result) {
          imagesCopy.push(this.result.toString())
          props.setState(imagesCopy)
          // 最初のアップロードの場合(imagesCopy.length === 1)
          //アイキャッチをアップロードした画像に変更
          if (imagesCopy.length === 1) {
            slideImg(this.result.toString())
            setHasEyecatch(true)
          }
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const showEyecatch = () => {
    if (hasEyecatch) {
      return (
        <img src={src} alt="" />
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
                if (e.target.files) setImage(e.target.files)
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
