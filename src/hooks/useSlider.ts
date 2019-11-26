import { useState, useMemo, useCallback, useEffect } from 'react'
import mod from "../scss/modules/slider.module.scss"

const timeout = (ms: number): Promise<void> => {
	return new Promise<void>(resolve => setTimeout(resolve, ms))
}


export default function useSlider(initialImages: string[] = []): [
	string[],
	React.Dispatch<React.SetStateAction<string[]>>,
	string,
	(next: string, current?: HTMLDivElement | undefined) => Promise<void>,
	(index: number) => Promise<void>,
	(files: FileList) => void
] {

	const initialState = initialImages
	const [images, setImages] = useState(initialState)

	const initialSrc = images[0] || ""

	const [src, setSrc] = useState(initialSrc)

	// サムネイルクリック時の処理。
	// アニメーションのために0.23秒間をあけてる。
	async function slideImage(next: string, current?: HTMLDivElement) {
		if (current) {
			current.classList.remove(mod.eyecatchActive)
			await timeout(230)
			setSrc(next)
			current.classList.add(mod.eyecatchActive)
		}
	}

	// 画像削除の処理
	async function removeImage(index: number) {
		// propsのコピーをとってそっちを編集する
		let copyImages = images.concat()
		copyImages.splice(index, 1)
		// setStateは非同期処理っぽいのでawaitなしだと
		// 後述のprops.images[newIndex]の値が意図したものにならない
		await setImages(copyImages)

		// 画像を削除した後に表示させる画像を指定する。
		let newIndex: number
		if (index === 0) {
			newIndex = 1
		} else {
			newIndex = index - 1
		}

		if (copyImages.length !== 0) {
			slideImage(images[newIndex])
		}
	}

	const setImage = (files: FileList) => {
		let imagesCopy = images.concat()
		for (let i = 0; i < files.length; i++) {
			const reader = new FileReader()
			const file = files[i]
			reader.onload = function () {
				if (this.result) {
					imagesCopy.push(this.result.toString())
					setImages(imagesCopy)
					// 最初のアップロードの場合(imagesCopy.length === 1)
					//アイキャッチをアップロードした画像に変更
					if (imagesCopy.length === 1) {
						slideImage(this.result.toString())
					}
				}
			}
			reader.readAsDataURL(file)
		}
	}

	return [images, setImages, src, slideImage, removeImage, setImage]
}