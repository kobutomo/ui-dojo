import React, { useState, useMemo, useCallback } from "react"
import styled, { css } from "styled-components"
import cardImg from "../assets/creditcard.jpg"

type Props = {
	className?: string
}
type Focus = 0 | 1 | 2 | 3 | 4

const initialNumber = "################".split("")

const CardForm: React.FC<Props> = props => {
	const [cardNumber, setCardNumber] = useState<string>("")
	const [name, setName] = useState("")
	const [expirationDate, setExpirationDate] = useState({ month: 1, year: 2019 })
	const [isFrontSide, setIsFrontSide] = useState(true)

	/* フォーカスについて
	0: なし, 1: 番号 2:名義 3:有効期限 4:CVV */
	const [focusFor, setFocusFor] = useState<Focus>(0)

	const hash = useMemo(() => {
		return initialNumber.map((char, i) => {
			const num = i + 1
			if (num <= cardNumber.length) return undefined
			if (num % 4 === 0) return (
				<span><div>{char}</div><div></div></span>
			)
			return <span><div>{char}</div></span>
		}
		)
	}, [cardNumber])

	const number = useMemo(() => {
		return cardNumber.split("").map((char, i) => {
			const num = i + 1
			if (num > 4 && num < 13) char = "*"
			if (num % 4 === 0) return (
				<span><div>{char}</div><div></div></span>
			)
			return <span><div>{char}</div></span>
		}
		)
	}, [cardNumber])

	const hundleChangeNumber = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		// e.preventDefault()
		console.log()
		if (e.target.value.length > 16 || (/[^0-9]/).test(e.target.value)) {
			return
		}
		setCardNumber(e.target.value)
	}, [])

	return (
		<div>
			<Card isFrontSide={isFrontSide}>
				<div className="cardWrapper">
					<div className="card" onClick={() => {
						// setIsFrontSide(prev => !prev)
						setCardNumber(prev => prev + "1")
					}}
					>
						<div
							className="img"

						>
							<img src={cardImg} alt="" />
						</div>
						<div className="card-content -front">
							<label htmlFor="cardNumber" className="card-content__number focus">
								{number}
								{hash}
							</label>
							<div className="card-content__bottom">
								<label htmlFor="name" className="card-content__holder focus">
									<p className="card-content__txt">Card holder</p>
									<p className="card-content__name">Full name</p>
								</label>
								<div className="card-content__date focus">
									<p className="card-content__txt">Expires</p>
									<label htmlFor="month" className="card-content__month">
										MM</label>/<label htmlFor="year" className="card-content__year">YY</label>
								</div>
								{/* date */}
							</div>
							{/* bottom */}
						</div>
						{/* cardcontent */}
					</div>
					{/* 表 */}
					<div className="card -back">
						<div
							className="img"
							onClick={() => setIsFrontSide(prev => !prev)}
						>
							<img src={cardImg} alt="" />
						</div>
					</div>
					{/* 裏 */}
				</div>
			</Card>
			<Form>
				<div className="form-number">
					<p className="form__title">Card Number</p>
					<input type="text"
						onChange={e => hundleChangeNumber(e)}
						value={cardNumber}
					/>
				</div>
			</Form>
		</div>
	)
}

type CardProps = {
	isFrontSide: boolean
}
const Card = styled.div<CardProps>`
.focus{
	/* border: 2px solid #fff; */
	border-radius: 5px;
	padding: 10px;
}
.cardWrapper{
	position: relative;
	width: 430px;
	height: 270px;
	margin: 0 auto;
}
.card {
	position: absolute;
	overflow: hidden;
	border-radius: 15px;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	transition: all 0.8s cubic-bezier(0.71, 0.03, 0.56, 0.85);
	transform-style: preserve-3d;
	transition: all 0.8s cubic-bezier(0.71, 0.03, 0.56, 0.85);
	box-shadow: 0 20px 40px 0 rgba(14, 42, 90, 0.55);
	backface-visibility: hidden;
	${props => props.isFrontSide ? css`
		transform: perspective(2000px) rotate3d(0,0,0,180deg);
	` : css`
		transform: perspective(1000px) rotate3d(0,1,0,180deg);
	`}
	&.-back{
		.img{
			transform:rotateY(180deg)
		}
	${props => props.isFrontSide ? css`
		transform: perspective(2000px) rotate3d(0,1,0,-180deg);
	` : css`
		transform: perspective(1000px) rotate3d(0,0,0,-180deg);
	`}
	}
}
.img {
	&::before{
		content: "";
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background: rgba(6, 2, 29, 0.5);
	}
}
.card-content{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	padding: 0 30px;
	padding-top: 115px;
	height: 100%;
	color: #fff;
	text-shadow: 7px 6px 10px rgba(14, 42, 90, 0.8);
	&__number{
		margin-bottom: 18px;
		display: block;
		div{
			display: inline-block;
			width: 0.66em;
			font-size: 2.5rem;
		}
	}
	&__txt{
		font-size: 1.3rem;
		opacity: 0.7;
	}
	&__name{
		font-size: 1.8rem;
		text-transform: uppercase;
	}
	&__bottom{
		display: flex;
	}
	&__holder{
		display: block;
		width: calc(100% - 80px);
	}
	&__date{
		width: 80px;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		.card-content__txt{
			width: 100%;
			text-align: center;
		}
	}
	&__month,
	&__year{
		display: block;
		font-size: 1.8rem;
		text-transform: uppercase;
	}
}
`
const Form = styled.div`
	box-shadow: 0 10px 20px 0 rgba(14, 42, 90, 0.2);
	width: 600px;
	margin: 0 auto;
	margin-top: -100px;
	padding: 50px;
	padding-top: 200px;
	input[type="text"]{
		width: 100%;
		height: 50px;
		border-radius: 5px;
		box-shadow: none;
		border: 1px solid #ced6e0;
		transition: all 0.3s ease-in-out;
		font-size: 18px;
		padding: 5px 15px;
		background: none;
		color: #1a3b5d;
		box-sizing: border-box;
	}
`

export default CardForm