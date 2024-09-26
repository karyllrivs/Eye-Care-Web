import { FaFilePdf } from 'react-icons/fa'

const PrintToPDFButton = ({ handlePrint }) => {
    return (
        <button type='button' onClick={handlePrint} className='flex gap-2 items-baseline font-bold rounded p-2 hover:text-blue-500 text-sm'>
            <FaFilePdf /> <span>Generate Report</span>
        </button>
    )
}

export default PrintToPDFButton