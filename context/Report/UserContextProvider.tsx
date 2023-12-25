import { IUserContext } from "../../Utils/type";
import React, { useState } from "react"

export const UserContext = React.createContext<IUserContext | null>(null);

const UserContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [user, setUser] = useState<IUserContext["user"]>(null)
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;