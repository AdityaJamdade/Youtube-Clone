import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Box, Typography, LinearProgress } from '@mui/material'
import { Videos } from './'
import { fetchFromAPI } from '../utils/fetchFromAPI'

const SearchFeed = () => {

  const [videos, setVideos] = useState([]);
  const { searchTerm } = useParams();

  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${searchTerm}`)
      .then(data => setVideos(data.items))
  }, [searchTerm]);

  if(!videos?.length) return (<><LinearProgress /><div style={{width:"100vw", height: "100vh", backgroundColor: "black", position:'sticky'}}></div></>)
  
  return (
    <Box p={2} sx={{ overflowY: 'auto', height: '90vh', flex: 2 }}>
      <Typography variant='h4' fontWeight="bold" mb={2} sx={{ color: 'white' }}>
        Search results for: <span style={{ color: '#F31503' }}>
          {searchTerm}
        </span>
      </Typography>

      <Videos videos={videos} />
    </Box>
  )
}

export default SearchFeed