import { useLocation } from 'react-router-dom';
// @mui
import { Typography, Stack, Container } from '@mui/material';
//
import { RoutesPageKey } from 'common/enum';
import { Breadcrumbs, Helmet } from 'components';

function StoreDetailPage() {
  const { pathname } = useLocation();

  return (
    <>
      <Helmet title="Store Detail | MBKC" />

      <Container>
        <Stack mb={5}>
          <Typography variant="h4">Store Detail</Typography>
          <Breadcrumbs model="Store" pathname={pathname} navigateDashboard={RoutesPageKey.BRAND_DASHBOARD} />
        </Stack>
      </Container>
    </>
  );
}

export default StoreDetailPage;