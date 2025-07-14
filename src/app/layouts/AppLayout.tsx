import { ReactNode } from "react"
import Header from "../../components/Header"
import NavBar from "../components/NavBar"
import Toast from "../components/Toast"

type Props = {
    children: ReactNode
}



const AppLayout = ({ children }: Props) => {
    return (
        <>
            <Toast />
            <Header>
                <NavBar />
            </Header>
            {children}
            {/* Footer */}
        </>
    )
}

export default AppLayout
