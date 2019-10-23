import React from "react"
import styled from "styled-components"
import icon from '../assets/ico_image.svg'

const AddImage: React.FC = props => {
	return (
		<Wrapper>
			<label>
				<img src={icon} alt="" />
				<input type="file" name="" id="" />
			</label>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	input {
		display: none;
	}
	label{
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		cursor: pointer;
		width: 40px;
		height: 40px;
		&:hover{
			background-color: rgba(29,161,242,.1);
		}
	}
	img {
		width: 100%;
		width: 22px;
		height: 22px;
		height: auto;
	}
`

export default AddImage