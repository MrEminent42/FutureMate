import Box from '@mui/material/Box';
import InternList from '../components/InternList';
import ProfileFilters from '../components/ProfileFilters';

const Home = () => {

  return (
    <Box sx={{ width: { xs: '100%', md: '600px' } }}>
      <ProfileFilters />
      <InternList />
    </Box>
  )
}

export default Home;