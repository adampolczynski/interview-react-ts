import { TreeNode } from './tree-node.component'
import { useTree } from './tree.hook'
import './index.css'

const Tree = () => {
  const { tree, addNode, removeNode, isUpsideDown, redrawUpsideDown, isAlphabetized, alphabetize } = useTree()

  return (
    <div>
      <b>
        1 & 2 - improved layout, load from file, redraw upside-down,
        <p>added prefix and dots, 3 - add/remove node, 'alphabetize'</p>
      </b>
      <div className="tree">
        {tree.map(({ key, index, indentation, prefix, textInput }) => {
          return (
            <TreeNode
              key={index}
              index={index}
              indentation={indentation}
              nodeKey={`${prefix} ${key}`}
              displayTextInput={textInput}
              handleEnter={addNode}
              handleRemove={removeNode}
            />
          )
        })}
      </div>
      <br />
      <button onClick={() => redrawUpsideDown()}>{isUpsideDown ? 'Back to normal' : 'Redraw upside down'}</button>
      &nbsp;&nbsp;&nbsp;
      <button onClick={() => alphabetize()}>{isAlphabetized ? 'De-alphabetize' : 'Alphabetize'}</button>
      <hr />
      <b>Initial 'inline' tree</b>
      <div className="tree">
        root
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;ant <br />
        &nbsp;&nbsp;&nbsp;&nbsp;bear <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cat <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dog <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;elephant <br />
        &nbsp;&nbsp;&nbsp;&nbsp;frog <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dolphin <br />
      </div>
    </div>
  )
}

export default Tree
