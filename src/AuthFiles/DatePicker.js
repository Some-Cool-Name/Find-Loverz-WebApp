import react, {useState} from 'react';
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

function DatePicker(props){
    const date = props.date;
    const setDate = props.setDate;
    return(
        <div className="datepicker">
            <Datepicker 
            selected={date} 
            onChange={d=>setDate(d)}
            dateFormat='dd/MM/yyyy'
            showYearDropdown
            scrollableYearDropdown
            isClearable
            ></Datepicker>
          
        </div>
    )
}

export default DatePicker;