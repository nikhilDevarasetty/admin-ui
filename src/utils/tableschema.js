import { delete_icon, edit_icon } from "../assets"

const schema = ({ data, itemsSelected, editItems, selectHandler, deleteHandler, editItemsHandler }) => {
  const isEditMode = editItems.includes(data.id)

  return (
    <tr className="text-gray-600 text-sm">
      <td className='p-3' style={{ width: '10%' }}>
        <input 
          type='checkbox' 
          onClick={(event) => selectHandler(event, data.id)} 
          checked={itemsSelected.includes(data.id)} 
          className='rounded-sm text-blue-600 h-4 w-4 border-gray-300 focus:ring-0 focus:ring-offset-0 cursor-pointer' 
        />
      </td>
      <td className='p-3' style={{ width: '22%' }}>
        {isEditMode ?  <input defaultValue={data.name} id={`name${data.id}`} className="px-2 py-1 border border-gray-200 text-sm rounded w-4/5 focus:ring-blue-500" />: data.name}
      </td>
      <td className='p-3' style={{ width: '28%' }}>
        {isEditMode ?  <input defaultValue={data.email} id={`email${data.id}`} className="px-2 py-1 border border-gray-200 text-sm rounded w-4/5 focus:ring-blue-500" />: data.email}
      </td>
      <td className='p-3' style={{ width: '20%' }}>
        {isEditMode ?  <input defaultValue={data.role} id={`role${data.id}`} className="px-2 py-1 border border-gray-200 text-sm rounded w-4/5 focus:ring-blue-500" />: data.role}
      </td>
      <td className='p-3' style={{ width: '20%' }}>
      { isEditMode ?
        <>
          <button className="text-white text-sm bg-blue-400 px-2 py-1 rounded-md" onClick={() => editItemsHandler(true, data.id)}>edit</button>
          <button className="ml-4 px-2 py-1 border border-blue-500 rounded-md" onClick={() => editItemsHandler(false, data.id)}>cancel</button>
        </>
        :
        <>
          <img src={edit_icon} alt='edit-icon' className='cursor-pointer h-4 w-4' onClick={() => editItemsHandler(false, data.id)}/>
          <img src={delete_icon} alt='delete-icon' className='ml-4 cursor-pointer h-4 w-4' onClick={(event) => deleteHandler(event, data.id)} />
      </>
      }
      </td>
    </tr>
  )
}

export default schema