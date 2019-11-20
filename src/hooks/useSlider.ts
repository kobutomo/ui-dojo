import { useState, useMemo, useCallback, useEffect } from 'react'
import mod from "../scss/modules/slider.module.scss"

const timeout = (ms: number): Promise<void> => {
	return new Promise<void>(resolve => setTimeout(resolve, ms))
}

export default function useSlider(images: string[] = []) {
	const initialState = {
		images: images
	}
	const [state, setState] = useState(initialState)

	const initialSrc = state.images[0] || ""

	const [src, setSrc] = useState(initialSrc)

	// サムネイルクリック時の処理。
	// アニメーションのために0.23秒間をあけてる。
	async function slideImg(next: string, current: HTMLDivElement | undefined) {
		if (current) {
			current.classList.remove(mod.eyecatchActive)
			await timeout(230)
			setSrc(next)
			current.classList.add(mod.eyecatchActive)
		}
	}

}