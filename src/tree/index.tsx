import { TreeNode } from './tree-node.component'
import { useTree } from './tree.hook'
import './index.css'

const Tree = () => {
  const { tree, addNode, removeNode, isUpsideDown, redrawUpsideDown, isAlphabetized, alphabetize, jsonBinLoading } = useTree()

  return (
    <div>
      <b>
        1 & 2 - improved layout, load from file, redraw upside-down, added prefix and dots <br />
        3 - interactions - add/remove node, 'alphabetize' <br />
        4 - data persistence - save on tree change (JSONBIN integration) <br />
        <br />
      </b>
      {jsonBinLoading ? (
        <span>Loading...</span>
      ) : (
        <>
          <div className="tree">
            {tree.map(({ key, index, indentation, prefix, textInput }) => {
              return (
                <TreeNode
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
          &nbsp;&nbsp;&nbsp;
          <button onClick={() => window.localStorage.clear()}>Clear localStorage</button>
        </>
      )}
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
