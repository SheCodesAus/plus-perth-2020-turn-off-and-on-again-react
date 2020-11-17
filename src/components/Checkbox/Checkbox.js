import React from "react"

const Checkbox = ({formData, listData, handleCheckbox, formKey}) => {
    let checked = false
    if(formData[formKey]){
        checked = formData[formKey].includes(listData.slug)
    }
    // console.log(formData)
    return(
        <>
        <input
            type="checkbox"
            id={listData.slug}
            label={listData.slug}
            checked={checked}
            onChange = {(e) => handleCheckbox({
                checked: e.target.checked,
                name: e.target.id,
                stateKey: formKey,
            })}/>
        <label htmlFor={listData.slug}>{listData.name}</label>
        </>
    )
}

export default Checkbox