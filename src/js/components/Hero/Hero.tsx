import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Slider from "react-slick";

import MovieImage from "../MovieImage";
import Container from "@utils/Container";
import * as Styles from "./Hero.pcss";
import "../../../css/slick.pcss";

const HeroPrevArrow = props => (
  <i onClick={props.onClick} className="slick-arrow slick-prev material-icons">
    chevron_left
  </i>
);

const HeroNextArrow = props => (
  <i onClick={props.onClick} className="slick-arrow slick-next material-icons">
    chevron_right
  </i>
);

interface HeroProps {
  movies?: any[];
  config?: {
    images?: {
      backdrop_sizes?: any[];
      secure_base_url?: string;
    };
  };
}

const Hero: React.SFC<HeroProps> = ({
  movies,
  config: { images: { backdrop_sizes = [], secure_base_url: imageBaseUrl } }
}) => {
  const sliderSettings = {
    lazyLoad: true,
    className: Styles.container,
    dots: true,
    infinite: true,
    nextArrow: <HeroNextArrow />,
    prevArrow: <HeroPrevArrow />
  };

  const imageSize =
    window.innerWidth > 780 ? backdrop_sizes[3] : backdrop_sizes[1];
  const slides = movies.map(movie => (
    <div key={movie.id}>
      <Container>
        <div className={Styles.info}>
          <h2 className={Styles.title}>{movie.title}</h2>
          <p className={Styles.overview}>{`${movie.overview.substr(
            0,
            150
          )}...`}</p>
          <Link className={Styles.link} to={`/movie/${movie.id}`}>
            Read more
          </Link>
        </div>
      </Container>
      <MovieImage
        backdrop
        size={imageSize}
        imageBaseUrl={imageBaseUrl}
        path={movie.backdrop_path}
      />
    </div>
  ));
  return slides.length > 0 && <Slider {...sliderSettings}>{slides}</Slider>;
};

const mapStateToProps = (state, ownProps) => {
  return { ...ownProps, config: state.config };
};

export default connect(mapStateToProps)(Hero);
