import React, { useState, useEffect } from "react"
import blocks from "../tetrisBlocks"
import TetrisField from "./TetrisField"
import styled from "styled-components"

type Props = {
	fieldWidth: number
	fieldHeight: number
}

type State = {
	currentPosX: number
	currentPosY: number
	currentBlockType: 1 | 2 | 3 | 4 | 5 | 6 | 7,
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
	const row = Array(x).fill(null).map(_ => 0)
	const field = Array(y).fill(null).map(_ => row)
	return field
}

const Tetris: React.FC<Props> = (props) => {
	const initialPosX = Math.floor(props.fieldWidth / 2)

	let field = []

	for (let i = 0; i < props.fieldHeight; i++) {
		let row = []
		for (let i = 0; i < props.fieldWidth; i++) {
			row.push(0)
		}
		field.push(row)
	}

	const initialState: State = {
		currentPosX: initialPosX,
		currentPosY: 1,
		currentBlockType: 2,
		currentBlockRotate: 0,
		score: 0,
		level: 1,
		blocksCount: 0,
		isGameOver: false,
		isPaused: false,
		field: field,
		blocks: blocks,
		timer: undefined
	}

	const [state, setState] = useState(initialState)

	useEffect(() => {
		const timer = window.setInterval(() => {
		}, 1000 - state.level * 10 > 600 ? 600 : state.level * 10)
		hundleUpdate("DOWN")

		return () => {
			window.clearInterval(timer)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	type moveCommand = "UP" | "DOWN" | "LEFT" | "RIGHT" | "ROTATE"

	const hundleUpdate = (command: moveCommand) => {
		// Do nothing if game ends, or is paused
		if (state.isGameOver || state.isPaused) {
			return
		}

		// Prepare variables for additions to x/y coordinates, current active tile and new rotation
		let xAdd = 0
		let yAdd = 0
		let rotateAdd: 0 | 1 = 0
		let block = state.currentBlockType

		if (command === "LEFT") {
			xAdd = -1
		}

		if (command === "RIGHT") {
			xAdd = 1
		}

		if (command === "ROTATE") {
			rotateAdd = 1
		}

		if (command === "DOWN") {
			console.log("down")
			yAdd = 1
		}

		// Get current x/y coordinates, active tile, rotate and all tiles
		let field = state.field
		let x = state.currentPosX
		let y = state.currentPosY
		console.log(x, y)
		let rotate = state.currentBlockRotate

		const blocks = state.blocks

		// Remove actual block from field to test for new insert position
		field[y + blocks[block][rotate][0][1]][x + blocks[block][rotate][0][0]] = 0
		field[y + blocks[block][rotate][1][1]][x + blocks[block][rotate][1][0]] = 0
		field[y + blocks[block][rotate][2][1]][x + blocks[block][rotate][2][0]] = 0
		field[y + blocks[block][rotate][3][1]][x + blocks[block][rotate][3][0]] = 0

		// Test if the move can be executed on actual field
		let xAddIsValid = true

		// Test if tile should move horizontally
		if (xAdd !== 0) {
			for (let i = 0; i <= 3; i++) {
				// Test if tile can be moved without getting outside the board
				if (
					x + xAdd + blocks[block][rotate][i][0] >= 0
					&& x + xAdd + blocks[block][rotate][i][0] < props.fieldWidth
				) {
					if (field[y + blocks[block][rotate][i][1]][x + xAdd + blocks[block][rotate][i][0]] !== 0) {
						// Prevent the move
						xAddIsValid = false
					}
				} else {
					// Prevent the move
					xAddIsValid = false
				}
			}
		}

		// If horizontal move is valid update x variable (move the block)
		if (xAddIsValid) {
			x += xAdd
		}

		// Try to rotate the block
		let newRotate = rotate + rotateAdd > 3 ? 0 : rotate + rotateAdd
		let rotateIsValid = true

		// Test if block should rotate
		if (rotateAdd !== 0) {
			for (let i = 0; i <= 3; i++) {
				// Test if block can be rotated without getting outside the board
				if (
					x + blocks[block][newRotate][i][0] >= 0 &&
					x + blocks[block][newRotate][i][0] < props.fieldWidth &&
					y + blocks[block][newRotate][i][1] >= 0 &&
					y + blocks[block][newRotate][i][1] < props.fieldHeight
				) {
					// Test of block rotation is not blocked by other blocks
					if (
						field[y + blocks[block][newRotate][i][1]][
						x + blocks[block][newRotate][i][0]
						] !== 0
					) {
						// Prevent rotation
						rotateIsValid = false
					}
				} else {
					// Prevent rotation
					rotateIsValid = false
				}
			}
		}

		// If rotation is valid update rotate variable (rotate the block)
		if (rotateIsValid) {
			rotate = newRotate as State["currentBlockRotate"]
		}

		// Try to speed up the fall of the block
		let yAddIsValid = true

		// Test if block should fall faster
		if (yAdd !== 0) {
			for (let i = 0; i <= 3; i++) {
				// Test if block can fall faster without getting outside the board
				if (
					y + yAdd + blocks[block][rotate][i][1] >= 0 &&
					y + yAdd + blocks[block][rotate][i][1] < props.fieldHeight
				) {
					// Test if faster fall is not blocked by other blocks
					if (
						field[y + yAdd + blocks[block][rotate][i][1]][
						x + blocks[block][rotate][i][0]
						] !== 0
					) {
						// Prevent faster fall
						yAddIsValid = false
					}
				} else {
					// Prevent faster fall
					yAddIsValid = false
				}
			}
		}

		// If speeding up the fall is valid (move the block down faster)
		if (yAddIsValid) {
			y += yAdd
		}

		// Render the block at new position
		field[y + blocks[block][rotate][0][1]][x + blocks[block][rotate][0][0]] = block
		field[y + blocks[block][rotate][1][1]][x + blocks[block][rotate][1][0]] = block
		field[y + blocks[block][rotate][2][1]][x + blocks[block][rotate][2][0]] = block
		field[y + blocks[block][rotate][3][1]][x + blocks[block][rotate][3][0]] = block

		// If moving down is not possible, remove completed rows add score
		// and find next tile and check if game is over
		if (!yAddIsValid) {
			for (let row = props.fieldHeight - 1; row >= 0; row--) {
				let isLineComplete = true

				// Check if row is completed
				for (let col = 0; col < props.fieldWidth; col++) {
					if (field[row][col] === 0) {
						isLineComplete = false
					}
				}

				// Remove completed rows
				if (isLineComplete) {
					for (let yRowSrc = row; row > 0; row--) {
						for (let col = 0; col < props.fieldWidth; col++) {
							field[row][col] = field[row - 1][col]
						}
					}

					// Check if the row is the last
					row = props.fieldHeight
				}
			}

			// Update state - update score, update number of tiles, change level
			setState(prev => ({
				...state,
				score: prev.score + 1 * prev.level,
				blocksCount: prev.blocksCount + 1,
				level: 1 + Math.floor(prev.blocksCount / 10)
			}))

			// Prepare new timer
			let timer

			// Reset the timer
			clearInterval(state.timer)

			// Update new timer
			timer = setInterval(
				() => hundleUpdate('DOWN'),
				1000 - (state.level * 10 > 600 ? 600 : state.level * 10)
			)

			// Use new timer
			setState({
				...state,
				timer: timer
			})

			// Create new tile
			block = Math.floor(Math.random() * 7 + 1) as State["currentBlockType"]
			x = props.fieldWidth / 2
			y = 1
			rotate = 0

			// Test if game is over - test if new tile can't be placed in field
			if (
				field[y + blocks[block][rotate][0][1]][x + blocks[block][rotate][0][0]] !== 0 ||
				field[y + blocks[block][rotate][1][1]][x + blocks[block][rotate][1][0]] !== 0 ||
				field[y + blocks[block][rotate][2][1]][x + blocks[block][rotate][2][0]] !== 0 ||
				field[y + blocks[block][rotate][3][1]][x + blocks[block][rotate][3][0]] !== 0
			) {
				// Stop the game
				setState({
					...state,
					isGameOver: true
				})
			} else {
				// Otherwise, render new block and continue
				field[y + blocks[block][rotate][0][1]][x + blocks[block][rotate][0][0]] = block
				field[y + blocks[block][rotate][1][1]][x + blocks[block][rotate][1][0]] = block
				field[y + blocks[block][rotate][2][1]][x + blocks[block][rotate][2][0]] = block
				field[y + blocks[block][rotate][3][1]][x + blocks[block][rotate][3][0]] = block
			}
		}

		// Update state - use new field, active x/y coordinates, rotation and activeTile
		setState({
			...state,
			field: field,
			currentPosX: x,
			currentPosY: y,
			currentBlockRotate: rotate,
			currentBlockType: block
		})

	}
	return (
		<Wrapper>
			{/* Tetris board */}
			<TetrisField
				field={state.field}
				isGameOver={state.isGameOver}
				score={state.score}
				level={state.level}
				rotate={state.currentBlockRotate}
			/>

			{/* Buttons to control blocks */}
			<div className='tetris__block-controls'>
				<button className="btn" onClick={() => hundleUpdate('LEFT')}>Left</button>

				<button className="btn" onClick={() => hundleUpdate('DOWN')}>Down</button>

				<button className="btn" onClick={() => hundleUpdate('RIGHT')}>Right</button>

				<button className="btn" onClick={() => hundleUpdate('ROTATE')}>Rotate</button>
			</div>

			{/* Buttons to control game */}
			<div className="tetris__game-controls">
				{/* <button className="btn" onClick={this.handleNewGameClick}>New Game</button> */}

				{/* <button className="btn" onClick={this.handlePauseClick}>{this.state.isPaused ? 'Resume' : 'Pause'}</button> */}
			</div>
		</Wrapper>
	)
}

export default Tetris

const Wrapper = styled.div`
	padding: 8px;
	margin: 0 auto;
	width: 500px;
`