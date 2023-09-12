import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import {
  Box,
  Card,
  Container,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
//
import { OrderSort, StoreHeadCell, StoreTable } from '@types';
import { RoutesPageKey } from 'common/enum';
import { Breadcrumbs, Helmet } from 'components';
import RoutesDynamicKeys from 'constants/RoutesDynamicKeys';
import stores from 'mock/store';
import { StoreTableHead, StoreTableRow, StoreTableToolbar } from 'sections/brand';
import { getComparator, stableSort } from 'utils';

// ----------------------------------------------------------------------

const headCells: StoreHeadCell[] = [
  {
    id: 'title',
    numeric: false,
    disablePadding: true,
    label: 'Title',
  },
  {
    id: 'kitchenCenter',
    numeric: false,
    disablePadding: false,
    label: 'Kitchen center',
  },
  {
    id: 'startDay',
    numeric: false,
    disablePadding: false,
    label: 'Start day',
  },
  {
    id: 'endDay',
    numeric: false,
    disablePadding: false,
    label: 'End day',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Status',
  },
];

function ListStorePage() {
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const [order, setOrder] = useState<OrderSort>('asc');
  const [orderBy, setOrderBy] = useState<keyof StoreTable>('title');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterName, setFilterName] = useState<string>('');

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof StoreTable) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleNavigateDetail = (storeId: number) => {
    navigate(RoutesDynamicKeys.STORE_DETAIL + `/${storeId}`);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - stores.length) : 0;

  const visibleRows = useMemo(
    () => stableSort(stores, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage]
  );

  const isNotFound = !visibleRows.length && !!filterName;

  return (
    <>
      <Helmet title="List Store | MBKC" />

      <Container>
        <Stack mb={5}>
          <Typography variant="h4">List Store</Typography>
          <Breadcrumbs model="Store" pathname={pathname} navigateDashboard={RoutesPageKey.BRAND_DASHBOARD} />
        </Stack>

        <Card>
          <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <StoreTableToolbar filterName={filterName} onFilterName={handleFilterByName} />
              <TableContainer>
                <Table sx={{ minWidth: 800 }} aria-labelledby="tableTitle" size="medium">
                  <StoreTableHead
                    headCells={headCells}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                  />
                  <TableBody>
                    {visibleRows.map((store, index) => {
                      return <StoreTableRow index={index} store={store} handleNavigateDetail={handleNavigateDetail} />;
                    })}
                    {emptyRows > 0 && (
                      <TableRow
                        style={{
                          height: 53 * emptyRows,
                        }}
                      >
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                  {isNotFound && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={9} sx={{ py: 3 }}>
                          <Paper
                            sx={{
                              textAlign: 'center',
                            }}
                          >
                            <Typography variant="h6" paragraph>
                              Not found
                            </Typography>

                            <Typography variant="body2">
                              No results found for &nbsp;
                              <strong>&quot;{filterName}&quot;</strong>.
                              <br /> Try checking for typos or using complete words.
                            </Typography>
                          </Paper>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={stores.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </Box>
        </Card>
      </Container>
    </>
  );
}

export default ListStorePage;
