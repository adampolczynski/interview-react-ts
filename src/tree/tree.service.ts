import treeJson from './data.json'

export interface AnimalFileRecord {
  [k: string]: AnimalFileRecord
}

export interface TreeNode {
  key: string
  indentation: number
  prefix: string
  index: number
  textInput: boolean
}

export class TreeService {
  public static arrayFromFile(): TreeNode[] {
    return this.objToArray(treeJson)
  }
  private static objToArray(obj: AnimalFileRecord, final: Record<string, TreeNode> = {}, indentation: number = 0) {
    Object.keys(obj).map((k) => {
      final[k] = { key: k, indentation, prefix: '-', index: 0, textInput: false } // would be nice to avoid unnecessary default values

      if (typeof obj[k] === 'object' && Object.keys(obj[k]).length > 0) {
        this.objToArray(obj[k], final, indentation + 1)
      }
    })

    return Object.values(final).map((values, index) => ({ ...values, index }))
  }
}
