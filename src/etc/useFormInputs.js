import { useState } from "react"

export default function useFormInputs() {
    const [ data, setData ] = useState({})

    function handleInput(name, event) {
        setData((v) => {v[name] = event.target.value; return v})
    }

    return [ data, handleInput ]
}