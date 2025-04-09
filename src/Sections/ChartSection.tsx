import { ReactNode } from "react"

type Props = {
  children: ReactNode,
}


const ChartSection = ({children}: Props) => {
  return (
    <section className="bg-[#121418F2] py-6 lg:py-24 px-6 lg:px-24">
      {children}
    </section>
  )
}

export default ChartSection
