import PropTypes from 'prop-types';
import { useState, useRef } from 'react';
// @mui
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Card, Link, Stack, Typography } from '@mui/material';
// components
import Image from '../../../components/image';
import { MotionContainer, varFade } from '../../../components/animate';
import Carousel, { CarouselDots, CarouselArrows } from '../../../components/carousel';

// ----------------------------------------------------------------------

const StyledOverlay = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 8,
  position: 'absolute',
  backgroundColor: alpha(theme.palette.grey[900], 0.64),
}));

// ----------------------------------------------------------------------

AppSettingFeatured.propTypes = {
  list: PropTypes.array,
};

export default function AppSettingFeatured({ list, ...other }) {
  const theme = useTheme();

  const carouselRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(theme.direction === 'rtl' ? list.length - 1 : 0);

  const carouselSettings = {
    speed: 800,
    dots: true,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    beforeChange: (current, next) => setCurrentIndex(next),
    ...CarouselDots({
      sx: {
        top: 20,
        left: 20,
        position: 'absolute',
      },
    }),
  };

  const handlePrev = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <Card {...other}>
      <Carousel ref={carouselRef} {...carouselSettings}>
        {list?.map((app, index) => (
          <CarouselItem key={app.id} item={app} isActive={index === currentIndex} />
        ))}
      </Carousel>

      <CarouselArrows
        onNext={handleNext}
        onPrevious={handlePrev}
        sx={{ top: 8, right: 8, color: 'common.white' }}
      />
    </Card>
  );
}

// ----------------------------------------------------------------------

CarouselItem.propTypes = {
  isActive: PropTypes.bool,
  item: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
  }),
};

function CarouselItem({ item, isActive }) {
  // const { image, title, description } = item;

  return (
    <MotionContainer action animate={isActive} sx={{ position: 'relative' }}>
      <Image alt="carousel" src={item} />
    </MotionContainer>
  );
}
