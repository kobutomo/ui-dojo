import React, { useState } from 'react'
import mod from "../scss/modules/tabs.module.scss"

const Tabs: React.FC = () => {

  const initialState = {
    prevTabIndex: 0,
    currentTabIndex: 0
  }
  const [state, setState] = useState(initialState)

  const tabNames =
    [
      "TAB01",
      "TAB02",
      "TAB03",
      "TAB04",
    ]
  const content =
    [
      <p>TAB01の中身<span role="img" aria-label="face">😌</span></p>,
      <p>TAB02の中身<span role="img" aria-label="face">😙</span></p>,
      <p>TAB03の中身<span role="img" aria-label="face">😁</span></p>,
      <p>TAB04の中身<span role="img" aria-label="face">😎</span><span role="img" aria-label="hands">🙌</span></p>
    ]

  const hundleClickTab = (index: number) => {
    const prevIndex = state.currentTabIndex
    setState({ prevTabIndex: prevIndex, currentTabIndex: index })
  }

  // それぞれのタブにつけるクラスを取得する関数
  // DOM操作に関してはjQueryと変わらず面倒くさい
  const getClasses = (index: number) => {
    // クリックされたタブかどうか
    if (index === state.currentTabIndex) {
      // タブがさっきのタブより右か左か
      if (index > state.prevTabIndex) {
        return `${mod.item} ${mod.current} ${mod.fromLeft}`
      }
      else if (index < state.prevTabIndex) {
        return `${mod.item} ${mod.current} ${mod.fromRight}`
      }
      //どちらでもないとき。おそらく最初だけ
      else {
        // どっちかから来たことにしないとwidthが0のままになる
        // のでfromLeftつけてます
        return `${mod.item} ${mod.current} ${mod.fromLeft}`
      }
    }
    // さっきまで選ばれてたタブだった場合
    else if (index === state.prevTabIndex) {
      if (index > state.currentTabIndex) {
        return `${mod.item} ${mod.toLeft}`
      }
      else if (index < state.currentTabIndex) {
        return `${mod.item} ${mod.toRight}`
      }
      else {
        return mod.item
      }
    }
    else {
      return mod.item
    }
  }


  return (
    <div>
      <ul className={mod.tabs}>
        {tabNames.map((tab, index) => {
          return (
            <li
              className={getClasses(index)}
              key={index}
              onClick={e => {
                hundleClickTab(index)
              }}
              onTouchEnd={e => {
                e.preventDefault()
                hundleClickTab(index)
              }}
            >
              <span>{tab}</span>
            </li>
          )
        })}
      </ul>

      <div className={mod.content}>
        {content[state.currentTabIndex]}
      </div>
    </div >
  )
}

export default Tabs
