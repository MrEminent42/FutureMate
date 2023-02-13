import Box from '@mui/material/Box';
import InternList from '../components/InternList';
import ProfileFilters from '../components/ProfileFilters';
import { styled } from '@mui/system';
import Typography from "@mui/material/Typography";
import Skeleton from '@mui/material/Skeleton';
import { useAtom } from 'jotai';
import Fade from '@mui/material/Fade';
import { usersAtom } from '../config/firebase';

const Home = () => {
	const [users] = useAtom(usersAtom);

	if (!users) {
		return (
			<Fade in

				style={{
					transitionDelay: '800ms',
				}}
			>
				<Box sx={{ width: { xs: '100%', md: '600px' } }}>
					<HomeSkeleton />
					<Box sx={{ px: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
						<Skeleton variant="rectangular" height={'50px'} width={'80%'} sx={{ my: '15px', borderRadius: '20px' }} />
						<Skeleton variant="rectangular" height={'130px'} width={'100%'} sx={{ my: '15px', borderRadius: '20px' }} />
						<Skeleton variant="rectangular" height={'130px'} width={'100%'} sx={{ my: '15px', borderRadius: '20px' }} />
						<Skeleton variant="rectangular" height={'130px'} width={'100%'} sx={{ my: '15px', borderRadius: '20px' }} />
						<Skeleton variant="rectangular" height={'130px'} width={'100%'} sx={{ my: '15px', borderRadius: '20px' }} />
					</Box >
				</Box>
			</Fade>
		)
	}

	return (
		<Box sx={{ width: { xs: '100%', md: '600px' } }}>
			<TitleContainer>
				<PageTitle>Find Roomates</PageTitle>
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
				<PageTitle><Skeleton width={'300px'} /></PageTitle>
			</TitleContainer>
		</Box>
	)
}

export default Home;

const TitleContainer = styled(Box)(() => ({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
}))

export const PageTitle = styled(Typography)(() => ({
	fontSize: '2rem',
	fontWeight: '600',
	textAlign: 'center'
}))