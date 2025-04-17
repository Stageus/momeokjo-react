import React from "react"

const useNicknameUpdate = () => {
    const [nicknameUpdate, setNicknameUpdate] = React.useState(null)

    const nicknameUpdateEdit = () => {
        setNicknameUpdate(!nicknameUpdate)
    }


    return [nicknameUpdate, nicknameUpdateEdit]
}

export default useNicknameUpdate