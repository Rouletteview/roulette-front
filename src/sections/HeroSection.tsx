import { ReactNode } from "react"

type Props = {
  children?: ReactNode,
  imageURL?: string,
  backgroundColor?: string;
  heroBackground?: boolean;
}



export const HeroSection = ({ children, imageURL, heroBackground = true, backgroundColor }: Props) => {
  return (
    <section
      className={`bg-[${backgroundColor}] w-full bg-center bg-cover flex items-center justify-center text-white`}
      style={{ backgroundImage: `url('${imageURL}')` }}
    >
      <div className={`${heroBackground ? 'hero-background' : ''} w-full min-h-screen flex flex-col pt-28 md:pt-48`}>
        {children}
      </div>
    </section>




  )
}

export default HeroSection
