import React, { useState } from "react"
import { Editor, EditorState, CompositeDecorator, ContentBlock, ContentState } from "draft-js"
import styled from "styled-components"
import ProgressBar from "./ProgressBar"
import AddImage from "./AddImage"
import Button from "./Button"

const TwitterClone: React.FC = () => {
	const [editorState, setEditorState] = useState(EditorState.createEmpty(compositeDecorator))
	const onChange = (editorState: EditorState) => setEditorState(editorState)
	const textLength = editorState.getCurrentContent().getPlainText().length
	return (
		<Wrapper>
			<div className="editorWrap">
				<Editor
					editorState={editorState}
					onChange={onChange}
				>
				</Editor>
			</div>
			<ToolBar>
				<div>
					<AddImage></AddImage>
				</div>
				<div className="right">
					<ProgressBar textLength={textLength} />
					<Button>ボタン</Button>
				</div>
			</ToolBar>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	border: 1px solid rgb(230, 236, 240);
	width: 100%;
	max-width: 600px;
	box-sizing: border-box;
	padding: 10px 15px;
	margin: 0 auto;
	.editorWrap{
		font-size: 1.9rem;
		padding: 10px 0;
	}
`
const HashTag = styled.span`
	color: rgb(50, 122, 255);
`
const Mention = styled.span`
	color: rgb(50, 122, 255);
`

const ToolBar = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	.right{
		display: flex;
		align-items: center;
	}
`

const HANDLE_REGEX = /@[Ａ-Ｚａ-ｚA-Za-z一-鿆0-9０-９ぁ-ヶｦ-ﾟー]+/g
const HASHTAG_REGEX = /#[Ａ-Ｚａ-ｚA-Za-z一-鿆0-9０-９ぁ-ヶｦ-ﾟー]+/g

const HandleSpan: React.FC = (props) => {
	return <HashTag>{props.children}</HashTag>
}

const HashtagSpan: React.FC = (props) => {
	return <Mention>{props.children}</Mention>
}

function handleStrategy(contentBlock: ContentBlock, callback: (start: number, end: number) => void, contentState: ContentState) {
	findWithRegex(HANDLE_REGEX, contentBlock, callback)
}

function hashtagStrategy(contentBlock: ContentBlock, callback: (start: number, end: number) => void, contentState: ContentState) {
	findWithRegex(HASHTAG_REGEX, contentBlock, callback)
}

function findWithRegex(regex: RegExp, contentBlock: ContentBlock, callback: (start: number, end: number) => void) {
	const text = contentBlock.getText();
	let matchArr, start;
	while ((matchArr = regex.exec(text)) !== null) {
		start = matchArr.index;
		callback(start, start + matchArr[0].length);
	}
}
const compositeDecorator = new CompositeDecorator([
	{
		strategy: handleStrategy,
		component: HandleSpan,
	},
	{
		strategy: hashtagStrategy,
		component: HashtagSpan,
	},
])
export default TwitterClone