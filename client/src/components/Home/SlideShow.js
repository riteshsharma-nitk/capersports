import { Box, Card, CardMedia, Stack, styled} from '@mui/material'
import React from 'react'
import productImages1 from '../../images/banner6.jpg'
import productImages2 from '../../images/banner7.jpeg'
import Carousel from 'react-material-ui-carousel'


export default function SlideShow() {
  return (
  <Carousel cycleNavigation={true} fullHeightHover indicators={false} duration={1500} animation='fade' autoplay>
            {itemData.map((item) => (
             <Card key={item.img} sx={{borderRadius:0}}>
             <CardMedia component="img" image={item.img} alt="banner images"/>
            </Card>
            ))}
          </Carousel>  



  )
}

const itemData = [
  {
    img: productImages1,
    title: 'view1',
  },
  {
    img: productImages2,
    title: 'view2',
  },
  ];