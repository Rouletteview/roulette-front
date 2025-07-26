import { ReactNode, useEffect } from "react"
import Header from "../../components/Header"
import NavBar from "../components/NavBar"
import Toast from "../components/Toast"

type Props = {
    children: ReactNode
}



const AppLayout = ({ children }: Props) => {
    
  useEffect(() => {
    const savedScrollPosition = sessionStorage.getItem('scrollPosition');
    if (savedScrollPosition) {
      const position = JSON.parse(savedScrollPosition);
      window.scrollTo(position.x, position.y);
      sessionStorage.removeItem('scrollPosition');
    }
  }, []);


  useEffect(() => {
    const handleBeforeUnload = () => {
      const scrollPosition = {
        x: window.scrollX,
        y: window.scrollY
      };
      sessionStorage.setItem('scrollPosition', JSON.stringify(scrollPosition));
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

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
