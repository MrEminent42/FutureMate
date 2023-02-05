import Box from '@mui/material/Box';
import MateList from '../components/MateList';
import ProfileFilters from '../components/ProfileFilters';

const Home = () => {

  return (
    <Box sx={{ width: { xs: '100%', md: '600px' } }}>
      <ProfileFilters />
      <MateList />
    </Box>
  )
}

export default Home;