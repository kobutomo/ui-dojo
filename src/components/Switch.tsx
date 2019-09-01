import React, { useState } from "react"
import mod from "../scss/modules/switch.module.scss"

const Switch: React.FC = () => {
  const [state, setState] = useState(false)
  const switchState = () => {
    setState(prev => {
      return !prev
    })
  }
  const classes = state ?
    mod.switch01 + " " + mod.active :
    mod.switch01

  return (
    <div>
      <div
        className={classes}
        onClick={e => switchState()}
        onTouchEnd={
          e => {
            e.preventDefault()
            switchState()
          }
        }
      >
        <div className={mod.ball}></div>
      </div>
    </div>
  )
}

export default Switch
