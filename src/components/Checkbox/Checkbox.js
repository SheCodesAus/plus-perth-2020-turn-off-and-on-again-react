import React from "react"

const Checkbox = ({formData, listData, handleCheckbox}) => {
    return(
        <>
        <input
            type="checkbox"
            key={listData.id} 
            id={listData.slug}
            label={listData.slug}
            checked={formData[listData.id].includes(listData.slug)}
            onChange={handleCheckbox}/>
        <label htmlFor={listData.slug}>{listData.name}</label>
        </>
    )
}

export default Checkbox