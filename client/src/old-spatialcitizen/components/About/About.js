import Hero from "../Hero";
import NavigationBar from "../Navbar";

const AboutView = () => {
  return (
    <>
      <NavigationBar />
      <Hero text="About us" />
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2 my-5">
            <p className="lead">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
              vero veritatis impedit quod illum culpa! Aut doloremque a,
              molestiae impedit saepe necessitatibus fugit corporis aliquam
              aspernatur rem porro molestias voluptatibus.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutView;
