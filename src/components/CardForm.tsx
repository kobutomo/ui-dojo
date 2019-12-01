import React, { useState, useMemo, useCallback, useRef } from "react"
import styled, { css } from "styled-components"
import cardImg from "../assets/creditcard.jpg"
import downArrow from "../assets/ico_arrow.png"
import CardNumber from "./CardNumber"

type Props = {
  className?: string
}
type Focus = 0 | 1 | 2 | 3 | 4

type Ref = React.RefObject<HTMLLabelElement> |
  React.RefObject<HTMLDivElement>

const getFocusPos = (ref: Ref) => {
  return {
    width: ref.current ?
      ref.current.clientWidth :
      "100%",
    height: ref.current ?
      ref.current.clientHeight :
      "100%",
    transform: `translate(${ref.current ? ref.current.offsetLeft : 0}px, ${ref.current ? ref.current.offsetTop : 0}px)`,
    opacity: 1
  }
}

const months = Array(12).fill(null).map((elm, i) => {
  const month = (i + 1)
  if (month < 10) return "0" + month.toString()
  return month.toString()
})

const years = Array(12).fill(null).map((elm, i) => {
  const thisYear = new Date().getFullYear()
  return thisYear + i
})

const CardForm: React.FC<Props> = props => {
  const [cardNumber, setCardNumber] = useState<string>("")
  const [holder, setHolder] = useState("")
  const [expirationDate, setExpirationDate] = useState({ month: "", year: "" })
  const [cvv, setCvv] = useState<number>(NaN)
  const [isFrontSide, setIsFrontSide] = useState(true)

  /* フォーカスについて
  0: なし, 1: 番号 2:名義 3:有効期限 4:CVV */
  const [focusFor, setFocusFor] = useState<Focus>(0)

  const numberRef = useRef<HTMLLabelElement>(null)
  const holderRef = useRef<HTMLLabelElement>(null)
  const expiresRef = useRef<HTMLDivElement>(null)

  const focusStyle = useMemo(() => {
    switch (focusFor) {
      case 0:
        return {
          width: "100%",
          height: "100%",
          opacity: 0
        }
      case 1:
        return getFocusPos(numberRef)
      case 2:
        return getFocusPos(holderRef)
      case 3:
        return getFocusPos(expiresRef)

      default:
        break;
    }
  }, [focusFor])

  const hundleChangeNumber = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 16 || (/[^0-9]/).test(e.target.value)) return
    setCardNumber(e.target.value)
  }, [])

  const hundleChangeHolder = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setHolder((e.target.value).toUpperCase())
  }, [])

  const hundleChangeMonth = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setExpirationDate({ ...expirationDate, month: e.target.value })
  }, [expirationDate])

  const hundleChangeYear = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setExpirationDate({ ...expirationDate, year: e.target.value })
  }, [expirationDate])

  const hundleChangeCvv = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 4 || (/[^0-9]/).test(e.target.value)) return
    setCvv(parseInt(e.target.value))
  }, [])

  return (
    <div>
      <Card isFrontSide={isFrontSide}>
        <div className="cardWrapper">
          <div className="card" onClick={() => {
            // setIsFrontSide(prev => !prev)
            // setCardNumber(prev => prev + "1")
          }}
          >
            <div className="img">
              <img src={cardImg} alt="" />
            </div>
            <div className="card-content -front">
              <label
                htmlFor="cardNumber"
                className="card-content__number -focus"
                ref={numberRef}
              >
                <CardNumber cardNumber={cardNumber} />
              </label>
              <div className="card-content__bottom">
                <label
                  htmlFor="holder"
                  className="card-content__holder -focus"
                  ref={holderRef}
                >
                  <p className="card-content__txt">Card holder</p>
                  <p className="card-content__name">
                    {holder.length > 0 ? holder : "Full name"}
                  </p>
                </label>
                <div
                  className="card-content__date -focus"
                  ref={expiresRef}
                >
                  <p className="card-content__txt">Expires</p>
                  <label htmlFor="year" className="card-content__year">
                    {expirationDate.month.length > 0 ?
                      expirationDate.month : "MM"}
                  </label>
                  /
                  <label htmlFor="month" className="card-content__month">
                    {expirationDate.year.length > 0 ?
                      expirationDate.year.slice(2, 4) : "YY"}
                  </label>
                </div>
                {/* date */}
              </div>
              {/* bottom */}
            </div>
            {/* cardcontent */}
            <Focus
              style={focusStyle}
            />
          </div>
          {/* 表 */}
          <div className="card -back">
            <div className="img">
              <img src={cardImg} alt="" />
            </div>
            <div className="card-content -back">
              <p className="card-content__txt -cvv">CVV</p>
              <p className="card-content__cvv">{!isNaN(cvv) ? cvv.toString().replace(/./g, "*") : ""}</p>
            </div>
          </div>
          {/* 裏 */}
        </div>
      </Card>
      <Form>
        <div className="form-number">
          <p className="form__title">Card Number</p>
          <input type="text" id="cardNumber"
            onChange={e => hundleChangeNumber(e)}
            onFocus={() => setFocusFor(1)}
            onBlur={() => setFocusFor(0)}
            value={cardNumber}
          />
        </div>
        <div className="form-holder">
          <p className="form__title">Card Holder</p>
          <input type="text" id="holder"
            onChange={e => hundleChangeHolder(e)}
            onFocus={() => setFocusFor(2)}
            onBlur={() => setFocusFor(0)}
            value={holder}
          />
        </div>
        <div className="form-flex">
          <div className="form-expires">
            <p className="form__title">Expires</p>
            <div className="form-expires__inner">
              <select name="" id="month"
                onChange={e => hundleChangeMonth(e)}
                onFocus={() => setFocusFor(3)}
                onBlur={() => setFocusFor(0)}
                value={expirationDate.month.toString()}
              >
                <option value="" disabled>Month</option>
                {months.map(number => {
                  return <option key={number} value={number}>{number}</option>
                })}
              </select>
              <select name="" id="year"
                onChange={e => hundleChangeYear(e)}
                onFocus={() => setFocusFor(3)}
                onBlur={() => setFocusFor(0)}
                value={expirationDate.year.toString()}
              >
                <option value='' disabled>Year</option>
                {years.map(number => {
                  return <option key={number} value={number}>{number}</option>
                })}
              </select>
            </div>
          </div>
          {/* holder */}
          <div className="form-cvv">
            <p className="form__title">CVV</p>
            <input type="text" id="cardNumber"
              onChange={e => hundleChangeCvv(e)}
              onFocus={() => setIsFrontSide(false)}
              onBlur={() => setIsFrontSide(true)}
              value={!isNaN(cvv) ? cvv.toString() : ""}
            />
          </div>
        </div>
        {/* flex */}
      </Form>
    </div>
  )
}

const Focus = styled.div`
position: absolute;
box-sizing: border-box;
transition: all 0.35s cubic-bezier(0.71, 0.03, 0.56, 0.85);
border: 2px solid rgba(255, 255, 255, 0.65);
border-radius: 5px;
left: 0;
top: 0;
z-index:1;
`

type CardProps = {
  isFrontSide: boolean
}
const Card = styled.div<CardProps>`
position: relative;
width: 430px;
height: 270px;
margin: 0 auto;
.-focus{
  border-radius: 5px;
  padding: 10px;
}
.cardWrapper{
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
  z-index:2;
  top: 0;
  left: 0;
  width: 100%;
  padding: 0 30px;
  padding-top: 115px;
  height: 100%;
  color: #fff;
  text-shadow: 7px 6px 10px rgba(14, 42, 90, 0.8);
  &__number{
    display: inline-block;
    margin-bottom: 18px;
  }
  &__txt{
    font-size: 1.3rem;
    opacity: 0.7;
    &.-cvv{
      text-align: right;
      padding-right: 10px;
      padding-bottom: 0px;
      font-size: 1.4rem;
      opacity: 1;
    }
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
  &__cvv {
    background-color: #fff;
    color: #1a3b5d;
    text-shadow: none;
    height: 40px;
    border-radius: 5px;
    text-align: right;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    text-align: right;
    padding-right: 10px;
    font-size: 1.3rem;
    line-height: 1;
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
input,select{
  width: 100%;
  height: 50px;
  border-radius: 5px;
  border: 1px solid #ced6e0;
  transition: all 0.3s ease-in-out;
  font-size: 18px;
  padding: 5px 15px;
  background: none;
  color: #1a3b5d;
  box-sizing: border-box;
  font-family:inherit;
}
input:focus,
select:focus{
  border: 1px solid #4fa7ff;
  box-shadow: 0 10px 20px 0 rgba(14, 42, 90, 0.2);
}
select{
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: none;
  background: transparent;
  background-image: url(${downArrow});
  background-size: 12px;
  background-position: 90% center;
  background-repeat: no-repeat;
  padding-right: 30px;
}
.form__title{
  font-size: 1.4rem;
  margin-bottom: 5px;
  font-weight: 500;
  color: #1a3b5d;
  width: 100%;
  display: block;
  user-select: none;
}
.form-flex{
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
.form-holder{
  margin-top: 20px;
}
.form-expires{
  flex: 1;
  &__inner{
    display: flex;
  }
  #month{
    margin-right: 20px;
  }
}
.form-cvv{
  max-width: 150px;
  margin-left: 35px;
}
`

export default CardForm