import React from "react"

const useMyRestaurantLike = () => {
    const [myRestaurantLike, setMyRestaurantLike] = React.useState(null)

    const myRestaurantLikeOpen = () => {
        setMyRestaurantLike(!myRestaurantLike)
    }


    return [myRestaurantLike, myRestaurantLikeOpen]
}

export default useMyRestaurantLike