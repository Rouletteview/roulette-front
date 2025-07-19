import { ReactNode } from "react"

type Props = {
  children?: ReactNode,
  imageURL?: string,
  backgroundColor?: string;
  heroBackground?: boolean;
  className?: string;
  height?: string;
}



export const HeroSection = ({ children, imageURL, heroBackground = true, backgroundColor, className, height = 'min-h-screen' }: Props) => {
  return (
    <section
      className={`bg-[${backgroundColor}] ${className} w-full bg-center bg-cover flex items-center justify-center text-white`}
      style={{ backgroundImage: `url('${imageURL}')` }}
    >
      <div className={`${heroBackground ? 'hero-background' : ''} ${height} w-full flex flex-col pt-28 md:pt-48`}>
        {children}
      </div>
    </section>
  )
}

export default HeroSection
