import React from "react"

const useEditRestaurant = () => {
    const [editRestaurant, setEditRestaurant] = React.useState(null)
    const [inputValue, setInputValue] = React.useState('')

    const editRestaurantOpen = () => {
        setEditRestaurant(!editRestaurant)
    }

    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }

    return [editRestaurant, editRestaurantOpen, inputValue, handleInputChange]
}

export default useEditRestaurant