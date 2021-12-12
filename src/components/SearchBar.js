import { search_icon } from '../assets'

const SearchBar = ({ placeholder = '', input_ref, classes = '' }) => {
    return (
        <div className={`relative ${classes}`}>
            <input ref={input_ref} placeholder={placeholder} className='w-full p-2 pl-10 rounded-md text-sm focus:outline-none border border-gray-200 font-semibold placeholder-gray-300' />
            <img src={search_icon} alt='search-icon' className='absolute left-4 top-3 w-3 h-3' />
        </div>
    )
}

export default SearchBar