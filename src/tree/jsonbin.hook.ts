import { TreeNode } from './tree.service'
import { useEffect, useState } from 'react'
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://api.jsonbin.io/v3',
  headers: {
    'Content-Type': 'application/json',
    'X-Master-Key': import.meta.env.VITE_JSONBIN_MASTER_KEY,
    'X-Access-Key': import.meta.env.VITE_JSONBIN_ACCESS_KEY,
  },
})

interface BinApiResponse {
  record: TreeNode[]
  metadata: { id: string; name: string }
}

export const useJsonBinStorage = () => {
  const storedBinId = window.localStorage.getItem('bin_id')

  const [loading, setLoading] = useState<boolean>(true)
  const [storedTree, setStoredTree] = useState<TreeNode[]>()

  const storeTree = async (arr: TreeNode[]) => {
    try {
      const { data } = await axiosInstance.post<BinApiResponse>('/b', arr)
      window.localStorage.setItem('bin_id', data.metadata.id)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    if (storedBinId) {
      axiosInstance
        .get<BinApiResponse>(`/b/${storedBinId}`)
        .then(({ data }) => {
          setStoredTree(data.record)
        })
        .catch(console.error)
        .finally(() => {
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [])

  return { storedTree, storeTree, loading }
}
