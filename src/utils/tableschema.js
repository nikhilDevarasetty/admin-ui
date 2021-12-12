import { delete_icon, edit_icon } from "../assets"

const schema = ({ data, itemsSelected, selectHandler, deleteHandler }) => {
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
      <td className='p-3' style={{ width: '22%' }}>{data.name}</td>
      <td className='p-3' style={{ width: '28%' }}>{data.email}</td>
      <td className='p-3' style={{ width: '20%' }}>{data.role}</td>
      <td className='p-3' style={{ width: '20%' }}>
        <img src={edit_icon} alt='edit-icon' className='cursor-pointer h-4 w-4' />
        <img src={delete_icon} alt='delete-icon' className='ml-4 cursor-pointer h-4 w-4' onClick={(event) => deleteHandler(event, data.id)} />
      </td>
    </tr>
  )
}

export default schema