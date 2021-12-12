import { useState, useEffect, useRef } from 'react'
import { SearchBar, Table, Pagination } from './components'
import schema from './utils/tableschema'
import { message } from 'antd'
import './App.css'
import './tailwind.css'

const App = () => {
  const [state, setState] = useState({
    data: [], curData: [], loading: true, itemsSelected: [], editItems: [],
    paginationData: {total_pages: 0, total_results: 0, cur_page: 0}
  })
  const staticData = useRef([])
  const searchBar = useRef()
  const setSubState = (newState) => setState(prevState => { return {...prevState, ...newState} })

  const selectHandler = (event, id, toggleAll = false) => {
    const isSelected = event.target.checked
    let { itemsSelected, curData } = state
    let newArr = []

    if(isSelected) {
      newArr = toggleAll ? curData.map(item => item.id) : [...itemsSelected, id]
    } else {
      newArr = toggleAll ? [] : itemsSelected.filter(item => item !== id)
    }
    setSubState({ itemsSelected: newArr })
  }
  
  const deleteSelected = (event, id) => {
    const { data, itemsSelected } = state

    const deleteIds = id ? [id] : itemsSelected
    const newData = data.filter(item => !deleteIds.includes(item.id))
    staticData.current = staticData.current.filter(item => !deleteIds.includes(item.id))

    setSubState({ 
      data: newData, curData: newData.slice(0, 10), itemsSelected: id ? itemsSelected : [],
      paginationData: {total_pages: Math.ceil(newData.length / 10), cur_page: 0, total_results: newData.length},
    })
  }

  const editItemsHandler = (editdata, id) => {
    const { editItems } = state

    if(editdata) {
      const { data, paginationData } = state
      const { cur_page: curPage } = paginationData

      const name = document.getElementById(`name${id}`).value
      const email = document.getElementById(`email${id}`).value
      const role = document.getElementById(`role${id}`).value

      const newData = data.map(item => {
        if(item.id === id) {
          item = {...item, name, email, role}
        }
        return item
      })

      staticData.current = staticData.current.map(item => {
        if(item.id === id) {
          item = {...item, name, email, role}
        }
        return item
      })

      setSubState({ data: newData, curData: newData.slice(curPage * 10, (curPage + 1) * 10) })

    }
    setSubState({ editItems: editItems.includes(id) ? editItems.filter(item => item !== id) : [...editItems, id]})
  }

  const navigateToPage = (page) => {
    const { data, paginationData } = state

    const curData = data.slice(page * 10, (page + 1) * 10)
    setSubState({ paginationData: {...paginationData, cur_page: page}, curData, itemsSelected: [] })
  }

  useEffect(() => {
    const url = 'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
    fetch(url)
    .then(res => res.json())
    .then(data => {
      const curData = data.slice(0, 10)
      const paginationData = {
        total_pages: Math.ceil(data.length / 10), cur_page: 0, total_results: data.length
      }
      staticData.current = [...data]
      setSubState({ data, curData, paginationData, loading: false })
    })
    .catch((err) => message(err.message || "Couldn't fetch the data"))
  }, [])

  useEffect(() => {
    const onEnter = (event) => {
      const curElement = searchBar.current
      if (event.keyCode === 13 && document.activeElement === curElement) {
        const value = curElement.value
        if(value.trim()) {
          const { data } = state
          const newData = data.filter(item => [item.name, item.role, item.email].includes(value))

          setSubState({ data: newData, curData: newData.slice(0, 10), paginationData: {total_pages: Math.ceil(newData.length / 10), cur_page: 0, total_results: newData.length} })
        } else {
          const data = staticData.current
          const curData = data.slice(0, 10)
          const paginationData = {
            total_pages: Math.ceil(data.length / 10), cur_page: 0, total_results: data.length
          }
          setSubState({ data, curData, paginationData })
        }
      }
    }
    document.addEventListener('keyup', onEnter)

    return () => document.removeEventListener('keyup', onEnter)
  }, [state])

  const { paginationData, itemsSelected, editItems, curData, loading, data } = state
  const checkbox = 
    <input 
      type='checkbox' 
      onClick={(event => selectHandler(event, '', true))} 
      checked={itemsSelected.length === curData.length} 
      className='h-4 w-4 bg-gray-200 rounded-sm border-gray-300 text-blue-600 focus:ring-0 focus:ring-offset-0 focus:bg-gray-200 cursor-pointer' 
  />
  const HEADERS = data.length > 0 ? [checkbox, 'NAME', 'EMAIL', 'ROLE', 'ACTIONS'] : ['NAME', 'EMAIL', 'ROLE', 'ACTIONS']

  return (
    <div className="pt-10 px-40 bg-gray-100 min-h-screen">
      <SearchBar 
        placeholder='Search by name, email or role' 
        input_ref={searchBar} 
      />
      <Table
        loading={loading}
        data={curData}
        headers={HEADERS}
        tableschema={schema}
        classes='rounded-lg mt-6'
        selectHandler={selectHandler}
        itemsSelected={itemsSelected}
        deleteHandler={deleteSelected}
        editItems={editItems}
        editItemsHandler={editItemsHandler}
      />
      { !loading && curData.length > 0 &&
        <div className='text-center'>
          <Pagination
            totalpages={paginationData.total_pages}
            totalresults={paginationData.total_results}
            curpage={paginationData.cur_page}
            handler={navigateToPage}
          />
          <button 
            className={`mt-2 text-sm text-white bg-red-300 px-3 py-2 rounded-2xl ${itemsSelected.length === 0 ? 'cursor-not-allowed' : ''}`}  
            onClick={deleteSelected}
          >
            Delete selected
          </button>
        </div>
      }
    </div>
  )
}

export default App
