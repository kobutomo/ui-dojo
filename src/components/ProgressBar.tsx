import React from "react"
import styled from "styled-components"

type Props = {
	textLength: number
}

const ProgressBar: React.FC<Props> = (props) => {
	const maxLength = 100
	const percent = props.textLength / maxLength
	const isOutOfLength = props.textLength > maxLength
	const isAlmostOut = maxLength - props.textLength < 10
	if (isOutOfLength) {
		return (
			<Caution>
				<span>{maxLength - props.textLength}</span>
			</Caution>
		)
	}
	return (
		<Circle isAlmostOut={isAlmostOut}>
			<svg className="back">
				<circle cx="50%" cy="50%"
					r={isAlmostOut ? "13" : "10"}
					strokeDashoffset={0}
				/>
			</svg>
			<svg className="front">
				<circle cx="50%" cy="50%"
					r={isAlmostOut ? "13" : "10"}
					strokeDashoffset={
						isAlmostOut
							? `${81.68 - percent * 81.68}`
							: `${62.83 - percent * 62.83}`
					} />
			</svg>
			<span>
				{isAlmostOut ? `${maxLength - props.textLength}` : ""}
			</span>
		</Circle>
	)
}

const Caution = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 22px;
	height: 22px;
	margin-right: 10px;
	span{
		color: rgb(224, 36, 94);
		font-size: 1.3rem;
	}
`

const Circle = styled.div`
position: relative;
width: ${(props: { isAlmostOut: boolean }) => props.isAlmostOut ? "30px" : "22px"};
height: ${(props: { isAlmostOut: boolean }) => props.isAlmostOut ? "30px" : "22px"};
margin-right: ${(props: { isAlmostOut: boolean }) => props.isAlmostOut ? "6px" : "10px"};
svg {
	transform: rotate(-90deg);
	position: absolute;
	top: 0;
	left: 0;
	fill: none;
	stroke-width: 2;
	width: 100%;
	height: 100%;
	stroke-dasharray: ${(props: { isAlmostOut: boolean }) => props.isAlmostOut ? "81.68" : "62.83"};
}
.front circle {
	stroke: ${(props: { isAlmostOut: boolean }) => props.isAlmostOut ? "#FFAD1F" : "#4fa8df"};
}
.back circle {
	stroke: #CCD6DD;
}
span{
	position: absolute;
	transform: translate(-50%, -50%);
	top: 50%;
	left: 50%;
	color: rgb(101, 119, 134);
	font-size: 1.3rem;
}
`

export default ProgressBar