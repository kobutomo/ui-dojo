import { useState, useMemo, useCallback, useEffect } from 'react'
// 選択された月の日数と曜日を計算する関数
const computeDates = (year: number, month: number) => {
	// 月の最後の日 ex.30
	const finalDateOfMonth =
		new Date(year, month, 0).getDate()

	// 1日の曜日 0~6 の範囲のnumber型
	const firstDayOfTheWeek =
		new Date(year, month - 1, 1).getDay()

	// 空白を含む日付の配列を取得
	const dates = Array(42).fill(null).map((_, i) => {
		// 正規化した日付
		const normarizeDate = i - firstDayOfTheWeek + 1

		// 曜日は0が日曜日なので例えばfirstDayOfTheWeekが
		// 3(水曜日)のとき、0 <= i < 3の範囲で""を返す。
		// => 一週目の日月火のマスが空白になる。
		const isOutOfMonth = normarizeDate <= 0 || normarizeDate > finalDateOfMonth

		// i番目のマスがその月の範囲外の場合空文字列を返す
		return isOutOfMonth ?
			"" : normarizeDate.toString()
	})
	return dates
}

type State = {
	currentYear: number;
	currentMonth: number;
	currentDate: number;
	currentDates: string[];
}

export default function useCalendar(): [State, (msg: "prev" | "next") => void, (date: string) => void] {
	// memo
	const initialState = useMemo(() => {
		const today = new Date(Date.now())
		const initialState = {
			currentYear: today.getFullYear(),
			currentMonth: today.getMonth() + 1,
			currentDate: today.getDate(),
			currentDates: [] as string[]
		}
		return initialState
	}, [])
	const [state, setState] = useState<State>(initialState)

	useEffect(() => {
		setState({
			...state,
			currentDates: computeDates(state.currentYear, state.currentMonth)
		})
	}, [state.currentYear, state.currentMonth])

	// 表示月を変更する処理
	const hundleChangeMonth = useCallback((msg: "prev" | "next") => {
		setState(prevState => {
			// 前の月ボタン
			if (msg === "prev") {
				// 表示している月が1月だったら0月ではなく12月にして年を1年減らす
				if (prevState.currentMonth === 1) {
					return {
						...prevState,
						currentYear: prevState.currentYear - 1,
						currentMonth: 12
					}
				}
				else {
					return {
						...prevState,
						currentMonth: prevState.currentMonth - 1
					}
				}
			}

			else if (msg === "next") {
				if (prevState.currentMonth === 12) {
					return {
						...prevState,
						currentYear: prevState.currentYear + 1,
						currentMonth: 1
					}
				}
				else {
					return {
						...prevState,
						currentMonth: prevState.currentMonth + 1
					}
				}
			}
			else return prevState
		})
	}, [])

	const hundleClickDate = useCallback((date: string) => {
		setState({ ...state, currentDate: parseInt(date) })
	}, [state])
	return [state, hundleChangeMonth, hundleClickDate]
}