import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from './Card';
import { Link } from 'react-router-dom';
import { fetchProperties } from '../services/api';
import { Button } from '@material-ui/core';
import { property as cardLocations } from '../data/mock-data'; 

const PropertyCards = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const properties = await fetchProperties();
      console.log('Received properties:', properties); // Add this line
      setCards(properties);
    };
  
    fetchAPI();
  }, []);
  
  // const [cards, setCards] = useState([cardLocations]);

  if (!cards.length) {
    return null;
  }

  return (
    <Box sx={{ mx: 2 }}>
      <Grid container rowSpacing={3} columnSpacing={3}>
        {cards.map((location) => {
          return (
            <Grid key={location.id} item xs={12} sm={4} md={4} lg={3}>
              <Button component={Link} to={`/properties/${location.property_id}`}
              sx={
                {
                  color: 'black',
                }
              }>
                <Card property={location} />
              </Button>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default PropertyCards;
