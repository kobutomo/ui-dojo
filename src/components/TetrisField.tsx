import * as React from 'react'
import styled from 'styled-components'

// Define props for TetrisField component
type Props = {
	field: number[][],
	isGameOver: boolean,
	score: number,
	level: number,
	rotate: number
}

// Create TetrisField component
const TetrisField: React.FC<Props> = (props) => {
	// Create board rows
	let rows: JSX.Element[] = []

	props.field.forEach((row, index) => {
		// Create board columns
		const cols = row.map((column: any, index: number) => <div className={`col-${column}`} key={index} />)

		rows.push(<div className="row" key={index}>{cols}</div>)
	})

	return (
		<Field>
			{/* Game info */}
			<div className="info">
				<p className="text">Level: {props.level}</p>

				<p className="text">Score: {props.score}</p>

				{props.isGameOver && <p className="text"><strong>Game Over</strong></p>}
			</div>

			{/* Game board */}
			<div className="board">{rows}</div>
		</Field>
	)
}

export default TetrisField

const Field = styled.div`
	display: flex;
	justify-content: space-between;
	.info {
		width: 100px;
	}
	.text {
		font-size: 1.8rem;
	}
	.row {
		display: flex;
	}
	[class*=col-] {
		padding: 12px;
		border: 1px solid #1a1c19;
	}
	.col-1 {
	background-color: #f21620;
	}
	.col-2 {
		background-color: #10ac84;
	}
	.col-3 {
		background-color: #5f27cd;
	}
	.col-4 {
		background-color: #d925cf;
	}
	.col-5 {
		background-color: #48dbfb;
	}
	.col-6 {
		background-color: #fd4964;
	}
	.col-7 {
		background-color: #72fa4e;
	}
`