import React from "react"

const Checkbox = ({formData, listData, handleCheckbox}) => {
    debugger
    const checked= formData[listData.id].includes(listData.slug)

    return(
        <>
        <input
            type="checkbox"
            key={listData.id} 
            id={listData.slug}
            label={listData.slug}
            checked={checked}
            onChange={handleCheckbox}/>
        <label htmlFor={listData.slug}>{listData.name}</label>
        </>
    )
}

export default Checkbox