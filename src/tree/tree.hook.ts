import { useEffect, useState, useCallback } from 'react'
import { TreeService, type TreeNode } from './tree.service'

export const useTree = () => {
  const [tree, setTree] = useState<TreeNode[]>(TreeService.arrayFromFile())

  const [isUpsideDown, setIsUpsideDown] = useState<boolean>(false)

  const redrawUpsideDown = useCallback(() => {
    setTree(tree.sort((a, b) => (isUpsideDown ? a.index - b.index : b.index - a.index)))
    setIsUpsideDown(!isUpsideDown)
  }, [tree, setTree, isUpsideDown])

  const redraw = useCallback(() => {
    setTree(
      tree.reduce<TreeNode[]>((prev, curr, index) => {
        const { indentation, key } = curr || {}

        // 1. === count prefix (1.1, 1.2, 1.2.2.1 etc) ===
        let prefix = ''

        if (prev.length === 0) {
          prefix = '1'
        } else {
          const { indentation: lastIndentation, prefix: lastPrefix } = prev[prev.length - 1]

          if (indentation === lastIndentation) {
            prefix = raisePrefixNumber(lastPrefix)
          } else if (indentation > lastIndentation) {
            // add prefix level 1 after dot
            prefix = `${lastPrefix}.1`
          } else {
            // cut diff in prefix and raise last prefix number
            prefix = lastPrefix.slice(0, lastPrefix.length - (lastIndentation - indentation) * 2)
            prefix = raisePrefixNumber(prefix)
          }
        }

        // 2. === ensure dots after first letter ===
        const dots = Array.from(Array(indentation))
          .map(() => '.')
          .join('')
        const dotsRemoved = key
          .split('')
          .filter((v) => v !== '.')
          .join('')
        const keyDotted = `${dotsRemoved.substring(0, 1)}${dots}${dotsRemoved.substring(1)}`

        return [...prev, { ...curr, prefix, index, key: keyDotted }]
      }, [])
    )
  }, [tree])

  const raisePrefixNumber = (lastPrefix: string) => {
    const prefixAsArray = lastPrefix.includes('.') ? lastPrefix.split('.') : [lastPrefix]
    const modifiedArray = prefixAsArray.map((n, i) => (i === prefixAsArray.length - 1 ? `${parseInt(n) + 1}` : n))
    return modifiedArray.join('.')
  }

  useEffect(() => {
    redraw()
  }, [])

  return { tree, isUpsideDown, redrawUpsideDown }
}
