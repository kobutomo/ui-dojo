import React, { useState, useEffect } from "react"
import blocks from "../tetrisBlocks"

type Props = {
	fieldWidth: number
	fieldHeight: number
}

type State = {
	currentPosX: number
	currentPosY: number
	currentBlockType: 1 | 2 | 3 | 4,
	currentBlockRotate: 0 | 1 | 2 | 3,
	score: number
	level: number
	blocksCount: number
	isGameOver: boolean
	isPaused: boolean
	field: number[][]
	blocks: number[][][][]
	timer?: number
}

const initializeField = (x: number, y: number): State["field"] => {
	const row = Array(x).fill(0).map(_ => 0)
	const field = Array(y).fill(0).map(_ => row)
	return field
}

const Tetris: React.FC<Props> = (props) => {
	const initialPosX = Math.floor(props.fieldWidth / 2)

	const initialState: State = {
		currentPosX: initialPosX,
		currentPosY: 1,
		currentBlockType: 1,
		currentBlockRotate: 0,
		score: 0,
		level: 1,
		blocksCount: 0,
		isGameOver: false,
		isPaused: false,
		field: initializeField(props.fieldWidth, props.fieldHeight),
		blocks: blocks,
		timer: undefined
	}

	const [state, setState] = useState(initialState)

	useEffect(() => {
		const timer = window.setInterval(() => {
			hundleUpdate("DOWN")
		}, 1000 - state.level * 10 > 600 ? 600 : state.level * 10)

		return () => {
			window.clearInterval(timer)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	type moveCommand = "UP" | "DOWN" | "LEFT" | "RIGHT" | "ROTATE"

	const hundleUpdate = (comand: moveCommand) => {

	}
	return(
		<div>テトリス予定地</div>
	)
}

export default Tetris