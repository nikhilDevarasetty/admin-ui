import Spinner from './Spinner'
import { no_data_icon } from '../assets'

const Table = ({ headers, customHeaders, data, tableschema, loading = false, custom_th='', classes = '', tableClasses='', ...rest }) => {
  if (!headers) {
    return null
  }

  const tableHeaders = customHeaders || headers
  const check = ( data && data.length === 0 ) || loading
  return (
    <div className={`overflow-x-auto border border-gray-200 bg-white ${classes}`}>
      { custom_th && custom_th} 
      <table className={ `min-w-full divide-y divide-gray-200 table-fixed ${tableClasses}`}>
        <thead className='bg-gray-200'>
          <tr>
            {!custom_th &&
              tableHeaders.map((item, index) => {
                return (
                  <th scope='col' key={index} className='p-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider truncate'>
                    {item}
                  </th>
                )
              })
            }
          </tr>
        </thead>
        <tbody className='bg-white divide-y'>
          {!check &&
            data.map((item, index) => {
              return tableschema({ data: item, headers, index, length: data.length, ...rest })
            })}
        </tbody>
      </table>
      { check && (
        <div className='grid grid-cols-1 py-16'>
          { !loading ?
            <>
              <img src={no_data_icon} alt='no-data-icon' className='h-14 w-16 inline-block  m-auto' />
              <span className='m-auto text-base font-semibold text-gray-600 mt-2'>No data found</span>
            </>
            :
            <Spinner classes='m-auto' />
          }
        </div>
      )}
    </div>
  )
}

export default Table
