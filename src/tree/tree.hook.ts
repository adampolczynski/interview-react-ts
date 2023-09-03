import { useState, useCallback, useEffect } from 'react'
import { TreeService, type TreeNode } from './tree.service'

export const useTree = () => {
  const [tree, setTree] = useState<TreeNode[]>(TreeService.arrayFromFile())
  const [isUpsideDown, setIsUpsideDown] = useState<boolean>(false)
  const [isAlphabetized, setIsAlphabetized] = useState<boolean>(false)

  const addNode = (index: number, indentation: number, inputText: string) => {
    const node = { key: inputText, indentation, prefix: '-', index: 0, textInput: false }
    redraw([...tree.slice(0, index + 1), node, ...tree.slice(index + 1)])
  }

  const removeNode = (index: number) => {
    redraw([...tree.slice(0, index), ...tree.slice(index + 1)])
  }

  const redrawUpsideDown = useCallback(() => {
    setTree(tree.sort((a, b) => (isUpsideDown ? a.index - b.index : b.index - a.index)))
    setIsUpsideDown(!isUpsideDown)
  }, [tree, isUpsideDown])

  const alphabetize = useCallback(() => {
    setTree(tree.sort((a, b) => (isAlphabetized ? a.index - b.index : a.key.localeCompare(b.key))))
    setIsAlphabetized(!isAlphabetized)
  }, [tree, isAlphabetized])

  const raisePrefixNumber = useCallback((lastPrefix: string) => {
    const prefixAsArray = lastPrefix.includes('.') ? lastPrefix.split('.') : [lastPrefix]
    const modifiedArray = prefixAsArray.map((n, i) => (i === prefixAsArray.length - 1 ? `${parseInt(n) + 1}` : n))
    return modifiedArray.join('.')
  }, [])

  const redraw = useCallback(
    (updatedTree?: TreeNode[]) => {
      let arr = (updatedTree || tree).reduce<TreeNode[]>((prev, curr, index) => {
        const { indentation: currIndent, key } = curr || {}

        // 1. === count prefix (1.1, 1.2, 1.2.2.1 etc) ===
        let prefix = ''

        if (prev.length === 0) {
          prefix = '1'
        } else {
          const { indentation: lastIndentation, prefix: lastPrefix } = prev[prev.length - 1]

          if (currIndent === lastIndentation) {
            prefix = raisePrefixNumber(lastPrefix)
          } else if (currIndent > lastIndentation) {
            // add prefix level 1 after dot
            prefix = `${lastPrefix}.1`
          } else {
            // cut diff in prefix and raise last prefix number
            prefix = lastPrefix.slice(0, lastPrefix.length - (lastIndentation - currIndent) * 2)
            prefix = raisePrefixNumber(prefix)
          }
        }

        // 2. === ensure dots after first letter ===
        const dots = Array.from(Array(currIndent))
          .map(() => '.')
          .join('')
        const dotsRemoved = key
          .split('')
          .filter((v) => v !== '.')
          .join('')
        const keyDotted = `${dotsRemoved.substring(0, 1)}${dots}${dotsRemoved.substring(1)}`

        return [...prev, { ...curr, prefix, index, key: keyDotted }]
      }, [])

      // 3. === map and specify textInput to display input ===
      arr = arr.map((node, i) => {
        let textInput = false

        const nextNodes = arr.filter(({ index }) => index > i)
        const endsIndentation = !nextNodes.find(({ indentation: nextIndentation }) => nextIndentation === node.indentation)

        if (endsIndentation) {
          textInput = true
        }

        return { ...node, textInput }
      })
      setTree(arr)
    },
    [tree, raisePrefixNumber]
  )

  useEffect(() => {
    redraw()
  }, [])

  return { tree, isUpsideDown, redrawUpsideDown, addNode, removeNode, isAlphabetized, alphabetize }
}
