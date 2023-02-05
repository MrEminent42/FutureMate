import Box from '@mui/material/Box';
import InternList from '../components/InternList';
import ProfileFilters from '../components/ProfileFilters';
import { styled } from '@mui/system';
import Typography from "@mui/material/Typography";
import Skeleton from '@mui/material/Skeleton';

const Home = () => {

  return (
    <Box sx={{ width: { xs: '100%', md: '600px' } }}>
      <TitleContainer>
        <Title>Roomates</Title>
      </TitleContainer>
      <ProfileFilters />
      <InternList />
    </Box>
  )
}

export const HomeSkeleton = () => {
  return (
    <Box sx={{ width: { xs: '100%', md: '600px' } }}>
      <TitleContainer>
        <Title><Skeleton width={'300px'} /></Title>
      </TitleContainer>
    </Box>
  )
}

export default Home;

const TitleContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}))

const Title = styled(Typography)(() => ({
  fontSize: '2rem',
  fontWeight: '600',
  textAlign: 'center'
}))