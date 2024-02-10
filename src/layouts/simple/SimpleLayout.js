import { Outlet } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
// components
import GithubStar from '../../components/github';
import Logo from '../../components/logo';

// ----------------------------------------------------------------------

const StyledHeader = styled('header')(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: '100%',
  position: 'absolute',
  padding: theme.spacing(3, 3, 0),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(5, 5, 0),
  },
  display: 'flex',
  justifyContent: 'space-between',
}));

// ----------------------------------------------------------------------

export default function SimpleLayout() {
  return (
    <>
      <StyledHeader>
        <Logo />
        <GithubStar />
      </StyledHeader>

      <Outlet />
    </>
  );
}
