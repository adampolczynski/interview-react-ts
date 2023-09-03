import { TreeNode } from './tree-node.component'
import { useTree } from './tree.hook'
import './index.css'

const Tree = () => {
  const { tree, isUpsideDown, redrawUpsideDown } = useTree()

  return (
    <div>
      <b>Improved layout, redrawing upside-down, added prefix and dots</b>
      <div className="tree">
        {tree.map(({ key, index, indentation, prefix }) => {
          return <TreeNode key={index} index={index} indentation={indentation} nodeKey={`${prefix} ${key}`} />
        })}
      </div>
      <button onClick={() => redrawUpsideDown()}>{isUpsideDown ? 'Back to normal' : 'Redraw upside down'}</button>
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
