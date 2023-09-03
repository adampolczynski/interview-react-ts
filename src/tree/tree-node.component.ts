import { createElement, useState } from 'react'
// import { v4 as uuid } from 'uuid'
// @TODO while assigning uuid() as element keys input stops working

interface TreeNodeProps {
  index: number
  nodeKey: string
  indentation: number
  displayTextInput: boolean
  handleEnter: (index: number, indentation: number, inputText: string) => void
  handleRemove: (index: number) => void
}

export const TreeNode = ({ index, nodeKey, indentation, displayTextInput, handleEnter, handleRemove }: TreeNodeProps) => {
  const [inputValue, setInputValue] = useState<string>('')

  const inputOnChangeHandler = (e: { target: { value: string } }) => {
    // @TODO type above as Event
    setInputValue(e.target.value)
  }

  const inputKeydownHandler = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEnter(index, indentation, inputValue)
    }
  }

  const removeIconClickHandler = () => {
    handleRemove(index)
  }

  const createIndentedElements = (type: 'span' | 'input', props: object, indentation: number) => {
    // @TODO type 'object' above
    const elements = []
    const numArr = Array.from(Array(indentation + 1).keys())
    for (const n of numArr) {
      let childEl
      if (numArr.length === n + 1) {
        if (type === 'span') {
          const removeIcon = createElement('span', { onClick: removeIconClickHandler, style: { cursor: 'pointer' } }, ' ❌')
          childEl = createElement(type, { ...props }, nodeKey, [removeIcon])
        } else {
          childEl = createElement(type, { ...props, tabIndex: index + 1 }, type === 'input' ? null : nodeKey)
        }
      } else {
        // always a container
        childEl = createElement('div', { className: 'tree-node' })
      }
      elements.push(childEl)
    }
    return elements
  }

  let childrenElements = createIndentedElements('span', {}, indentation)

  const rootText = childrenElements.length === 0 ? nodeKey : null

  if (displayTextInput) {
    const brElement = createElement('br')
    const textInputElementIndented = createIndentedElements(
      'input',
      { type: 'text', value: inputValue, onChange: inputOnChangeHandler, onKeyDown: inputKeydownHandler },
      indentation
    )
    childrenElements.push(brElement)
    childrenElements = childrenElements.concat(textInputElementIndented)
  }

  return createElement('div', { id: nodeKey }, rootText, childrenElements)
}
