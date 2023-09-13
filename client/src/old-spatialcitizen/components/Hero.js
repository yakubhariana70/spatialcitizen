const Hero = ({ text }) => {

  return (
    <header className="bg-dark text-white p-5 hero-container">
      <h1 className="hero-text"> This is {text} </h1>
    </header>
  )
}

export default Hero;