import React from 'react'

const Input = (props) => {
    return (
        <>
            <div className="input-container">
                <label htmlFor={props.name}>{props.name}</label>
                <input onChange={(e) => {
                    props.onChange(e)
                }} type={props.type} name={props.name} placeholder={props.placeholder} value={props.value} />
            </div>
        </>
    )
}

export default Input
