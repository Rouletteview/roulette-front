import { ReactNode } from "react"

type Props = {
  children?: ReactNode,
  imageURL: string
}



export const HeroSection = ({ children, imageURL }: Props) => {
  return (
    <section
      className="w-full bg-center bg-cover flex items-center justify-center text-white"
      style={{ backgroundImage: `url('${imageURL}')` }}
    >
      <div className="hero-background w-full min-h-screen flex flex-col pt-28 md:pt-48">
        {children}
      </div>
    </section>




  )
}

export default HeroSection
