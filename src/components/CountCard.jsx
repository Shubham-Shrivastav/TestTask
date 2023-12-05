import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { FaAndroid, FaUserCircle, FaQuestionCircle } from 'react-icons/fa'; // Importing icons
import Avatar from '@mui/material/Avatar';

const CountCard = () => {
  const [totalPopulation, setTotalPopulation] = useState(0);
  const [speciesCounts, setSpeciesCounts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://swapi.dev/api/people/');
        const data = await response.json();
        const population = data.count;
        setTotalPopulation(population);

        const allCharacters = await getAllData('https://swapi.dev/api/people/');
        const speciesMap = new Map();

        await Promise.all(
          allCharacters.map(async (character) => {
            await Promise.all(
              character.species.map(async (speciesUrl) => {
                if (!speciesMap.has(speciesUrl)) {
                  speciesMap.set(speciesUrl, 1);
                } else {
                  speciesMap.set(speciesUrl, speciesMap.get(speciesUrl) + 1);
                }
              })
            );
          })
        );

        const speciesUrls = Array.from(speciesMap.keys());
        const speciesDataPromises = speciesUrls.map(async (speciesUrl) => {
          const response = await fetch(speciesUrl);
          const speciesData = await response.json();
          return {
            name: speciesData.name,
            count: speciesMap.get(speciesUrl),
          };
        });

        const speciesCountsArray = await Promise.all(speciesDataPromises);
        setSpeciesCounts(speciesCountsArray);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const getAllData = async (url) => {
    let results = [];
    let nextPage = url;

    while (nextPage) {
      const response = await fetch(nextPage);
      const data = await response.json();
      results = results.concat(data.results);
      nextPage = data.next;
    }

    return results;
  };

  const getSpeciesIcon = (speciesName) => {
    switch (speciesName.toLowerCase()) {
      case 'droid':
        return <FaAndroid />;
      case 'human':
        return <FaUserCircle />;
      default:
        return <FaQuestionCircle />;
    }
  };

  const displaySpeciesCounts = () => {
    return speciesCounts.map((species) => (
      <Box key={species.name} sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar>{getSpeciesIcon(species.name)}</Avatar>
        <Typography variant="subtitle1" sx={{ marginLeft: 1 }}>
          {species.name}: {species.count}
        </Typography>
      </Box>
    ));
  };

  return (
    <Card sx={{ minWidth: 275, maxWidth: 325, boxShadow: 2, m: 2 }} variant="outlined">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Known Population: {totalPopulation}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Species Counts:
        </Typography>
        {displaySpeciesCounts()}
        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
          <Avatar>
            <FaQuestionCircle />
          </Avatar>
          <Typography variant="subtitle1" sx={{ marginLeft: 1 }}>
            Unknown: {speciesCounts.find((species) => species.name === '')?.count || 0}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CountCard;
