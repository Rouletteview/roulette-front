import { ReactNode } from "react"
import Header from "../../components/Header"
import NavBar from "../components/NavBar"

type Props = {
    children: ReactNode
}



const AppLayout = ({ children }: Props) => {
    return (
        <>
            <Header>
                <NavBar />
            </Header>
            {children}
            {/* Footer */}
        </>
    )
}

export default AppLayout
