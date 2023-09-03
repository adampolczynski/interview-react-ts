import { createElement } from 'react'

interface TreeNodeProps {
  index: number
  nodeKey: string
  indentation: number
}

export const TreeNode = ({ nodeKey, indentation }: TreeNodeProps) => {
  const createIndentedElements = (type: 'span' | 'input', props: object, indentation: number) => {
    // @TODO type 'object' above
    const elements = []
    const numArr = Array.from(Array(indentation + 1).keys())
    for (const n of numArr) {
      let childEl
      if (numArr.length === n + 1) {
        if (type === 'span') {
          childEl = createElement(type, { ...props, key: `${type}-${n}` }, nodeKey)
        } else {
          childEl = createElement(type, { ...props, key: `${type}-${n}` }, type === 'input' ? null : nodeKey)
        }
      } else {
        // always a container
        childEl = createElement('div', { className: 'tree-node', key: `${type}-${n}` })
      }
      elements.push(childEl)
    }
    return elements
  }

  const childrenElements = createIndentedElements('span', {}, indentation)

  const rootText = childrenElements.length === 0 ? nodeKey : null

  return createElement('div', { id: nodeKey }, rootText, childrenElements)
}
