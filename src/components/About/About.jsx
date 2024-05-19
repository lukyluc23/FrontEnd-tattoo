import "./About.css";

export const About = () => {
  return (
    <div id="about">
      <div className="about-container">
        <div className="row">
          <div className="col-xs-12 col-md-6">
            {" "}
            <img
              src="./src/assets/about.jpg"
              className="img-responsive"
              alt=""
            />{" "}
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="about-text">
              <h2>About Us</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Architecto dolorum autem vel inventore neque labore! Quidem
                repellendus dolore deserunt qui?
              </p>
              <h3>Why Choose Us?</h3>
              <div className="list-style">
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>
                    <li>lorem</li>
                    <li>ipsum .</li>
                    <li>dolor</li>
                    <li> sit amet</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
