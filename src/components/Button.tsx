import React from "react"
import styled from "styled-components"

type Props = {
	text?: string,
	onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const Button: React.FC<Props> = (props) => {
	return (
		<NormalButton onClick={props.onClick}>
			{props.children}
		</NormalButton>
	)
}

const NormalButton = styled.button`
	display: flex;
	align-items: center;
	height: 40px;
	background-color: rgb(29, 161, 242);
	font-weight: bold;
	font-size: 1.5rem;
	box-sizing: border-box;
	padding: 0 15px;
	padding-bottom: 2px;
	border-radius: 20px;
	color: #fff;
`

export default Button