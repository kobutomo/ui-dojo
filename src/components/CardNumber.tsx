import React from "react"
import styled from "styled-components"

const initialNumber = "################".split("")
type Props = {
  cardNumber: string
  className?: string
}

const CardNumber: React.FC<Props> = ({ cardNumber, className }) => {
  return (
    <div className={className}>
      {cardNumber.split("").map((char, i) => {
        const num = i + 1
        if (num > 4 && num < 13) char = "*"
        if (num % 4 === 0 && num !== 16) return (
          <span key={char + i.toString()}>
            <div className="char">{char}</div>
            <div className="char"></div>
          </span>
        )
        return (
          <span key={char + i.toString()}>
            <div className="char">{char}</div>
          </span>
        )
      })}
      {initialNumber.map((char, i) => {
        const num = i + 1
        if (num <= cardNumber.length) return undefined
        if (num % 4 === 0 && num !== 16) return (
          <span key={char + i.toString()}>
            <div className="char">{char}</div>
            <div className="char"></div>
          </span>
        )
        return (
          <span key={char + i.toString()}>
            <div className="char">{char}</div>
          </span>
        )
      })}
    </div>
  )
}

export default styled(CardNumber)`
.char{
  display: inline-block;
  width: 0.7em;
  font-size: 2.5rem;
}
`