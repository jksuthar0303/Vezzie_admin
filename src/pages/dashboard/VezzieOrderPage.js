import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Tab,
  Tabs,
  Card,
  Table,
  Stack,
  Divider,
  TableBody,
  Container,
  TableContainer,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';

// components
import Label from '../../components/label';

import Scrollbar from '../../components/scrollbar';

import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../components/settings';
import {
  useTable,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
  TableSkeleton,
} from '../../components/table';
// sections

import { OrderTableRow, OrderTableToolbar } from '../../sections/@dashboard/order/list';
import OrderAnalytic from '../../sections/@dashboard/order/OrderAnalytic';
import { getOrderViewList } from '../../Services/UserSer';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Client Name', align: 'left' },
  { id: 'mobile', label: 'Mobile', align: 'left' },
  { id: 'createAt  ', label: 'Create At  ', align: 'left' },
  { id: 'paymentMode', label: 'Payment Mode', align: 'center' },
  { id: 'price', label: 'Amount', align: 'center' },
  { id: 'Address', label: 'Address', align: 'center', width: 140 },
  { id: 'status', label: 'Status', align: 'left' },
  { id: '' },
];

// ----------------------------------------------------------------------

export default function VezzieOrderPage() {
  const theme = useTheme();

  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const { themeStretch } = useSettingsContext();

  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    setRowsPerPage,
    //
    selected,

    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({
    defaultOrder: 'desc',
    defaultCurrentPage: parseInt(searchParams.get('page') || '0', 10),
    defaultRowsPerPage: parseInt(searchParams.get('perPage') || '50', 10),
  });

  const [tableData, setTableData] = useState([]);

  const [totalCount, setTotalCount] = useState(0);

  const [overview, setOverview] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [filterName, setFilterName] = useState('');

  const [filterStatus, setFilterStatus] = useState('all');

  const [filterEndDate, setFilterEndDate] = useState(null);

  const [filterService, setFilterService] = useState('all');

  const [filterStartDate, setFilterStartDate] = useState(null);

  const dataFiltered = tableData;

  const denseHeight = dense ? 56 : 76;

  const isFiltered = filterStatus !== 'all' || filterName !== '' || !!filterStartDate;

  const isNotFound = tableData?.length === 0;

  const getLengthByStatus = (status) => {
    const item = overview.find((o) => o._id === status);
    return item?.count || 0;
  };

  const getTotalPriceByStatus = (status) => {
    const item = overview.find((o) => o._id === status);
    return item?.totalPrice || 0;
  };

  const getTotalLength = () => overview.reduce((acc, curr) => acc + (curr?.count || 0), 0);

  const getTotalPrice = () => overview.reduce((acc, curr) => acc + (curr?.totalPrice || 0), 0);

  // eslint-disable-next-line no-unsafe-optional-chaining
  const getPercentByStatus = (status) => {
    const total = getTotalLength();
    return total === 0 ? 0 : (getLengthByStatus(status) / total) * 100;
  };

  const TABS = [
    { value: 'all', label: 'All', color: 'info', count: getTotalLength() },
    { value: 'paid', label: 'Paid', color: 'success', count: getLengthByStatus('paid') },
    { value: 'unpaid', label: 'Unpaid', color: 'warning', count: getLengthByStatus('unpaid') },
    { value: 'cancel', label: 'Cancel', color: 'error', count: getLengthByStatus('cancel') },
    { value: 'draft', label: 'Draft', color: 'default', count: getLengthByStatus('draft') },
  ];

  const handleFilterStatus = (event, newValue) => {
    setPage(0);
    setFilterStatus(newValue);
  };

  const handleFilterName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleFilterService = (event) => {
    setPage(0);
    setFilterService(event.target.value);
  };

  const handleResetFilter = () => {
    setFilterName('');
    setFilterStatus('all');
    setFilterService('all');
    setFilterEndDate(null);
    setFilterStartDate(null);
  };

  const handleViewRow = (id) => {
    navigate(PATH_DASHBOARD.order.view(id));
    console.log({ id });
  };

  const handlePageChange = (event, newPage) => {
    setTableData([]);
    setIsLoading(true);
    onChangePage(event, newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setTableData([]);
    setIsLoading(true);
    onChangeRowsPerPage(event);
  };

  const fetchOrderList = async () => {
    setIsLoading(true);
    try {
      const params = { page, limit: rowsPerPage };
      if (filterStatus !== 'all') params.status = filterStatus;
      if (filterName) params.search = filterName;
      if (filterStartDate) params.date = filterStartDate;

      const { data } = await getOrderViewList(params);
      setTableData(data?.orders);
      setTotalCount(data?.totalCount || 0);
      setOverview(data?.overview || []);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchOrderList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage, filterName, filterStatus, filterStartDate]);

  // Sync state to URL
  useEffect(() => {
    const currentUrlPage = parseInt(searchParams.get('page') || '0', 10);
    const currentUrlPerPage = parseInt(searchParams.get('perPage') || '50', 10);

    if (currentUrlPage !== page || currentUrlPerPage !== rowsPerPage) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set('page', page.toString());
      newParams.set('perPage', rowsPerPage.toString());
      setSearchParams(newParams, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage]);

  // Sync URL to state
  useEffect(() => {
    const currentUrlPage = parseInt(searchParams.get('page') || '0', 10);
    const currentUrlPerPage = parseInt(searchParams.get('perPage') || '50', 10);

    if (page !== currentUrlPage) {
      setPage(currentUrlPage);
    }
    if (rowsPerPage !== currentUrlPerPage) {
      setRowsPerPage(currentUrlPerPage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  console.log(tableData);

  return (
    <>
      <Helmet>
        <title> Orders: List | Vezzie</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Orders List"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Orders',
              href: PATH_DASHBOARD.order,
            },
            {
              name: 'List',
            },
          ]}
        />

        <Card sx={{ mb: 5 }}>
          <Scrollbar>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
              sx={{ py: 2 }}
            >
              <OrderAnalytic
                title="Total"
                total={getTotalLength()}
                percent={100}
                price={getTotalPrice()}
                icon="ic:round-receipt"
                color={theme.palette.info.main}
              />

              <OrderAnalytic
                title="Paid"
                total={getLengthByStatus('paid')}
                percent={getPercentByStatus('paid')}
                price={getTotalPriceByStatus('paid')}
                icon="eva:checkmark-circle-2-fill"
                color={theme.palette.success.main}
              />

              <OrderAnalytic
                title="Unpaid"
                total={getLengthByStatus('unpaid')}
                percent={getPercentByStatus('unpaid')}
                price={getTotalPriceByStatus('unpaid')}
                icon="eva:clock-fill"
                color={theme.palette.warning.main}
              />

              <OrderAnalytic
                title="Cancel"
                total={getLengthByStatus('cancel')}
                percent={getPercentByStatus('cancel')}
                price={getTotalPriceByStatus('cancel')}
                icon="eva:bell-fill"
                color={theme.palette.error.main}
              />

              <OrderAnalytic
                title="Draft"
                total={getLengthByStatus('draft')}
                percent={getPercentByStatus('draft')}
                price={getTotalPriceByStatus('draft')}
                icon="eva:file-fill"
                color={theme.palette.text.secondary}
              />
            </Stack>
          </Scrollbar>
        </Card>

        <Card>
          <Tabs
            value={filterStatus}
            onChange={handleFilterStatus}
            sx={{
              px: 2,
              bgcolor: 'background.neutral',
            }}
          >
            {TABS.map((tab) => (
              <Tab
                key={tab.value}
                value={tab.value}
                label={tab.label}
                icon={
                  <Label color={tab.color} sx={{ mr: 1 }}>
                    {tab.count}
                  </Label>
                }
              />
            ))}
          </Tabs>

          <Divider />

          <OrderTableToolbar
            filterName={filterName}
            isFiltered={isFiltered}
            filterService={filterService}
            filterEndDate={filterEndDate}
            onFilterName={handleFilterName}
            filterStartDate={filterStartDate}
            onResetFilter={handleResetFilter}
            onFilterService={handleFilterService}
            onFilterStartDate={(newValue) => {
              setFilterStartDate(newValue);
            }}
            onFilterEndDate={(newValue) => {
              setFilterEndDate(newValue);
            }}
          />

          <TableContainer
            sx={{
              position: 'relative',
              overflow: 'unset',
              opacity: isLoading && tableData?.length > 0 ? 0.6 : 1,
              pointerEvents: isLoading ? 'none' : 'auto',
            }}
          >
            <TableSelectedAction dense={dense} />

            <Scrollbar>
              <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                <TableHeadCustom
                  onSort={onSort}
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                />

                <TableBody>
                  {isLoading && tableData?.length === 0 ? (
                    [...Array(rowsPerPage)].map((_, i) => (
                      <TableSkeleton key={i} sx={{ height: denseHeight }} />
                    ))
                  ) : (
                    <>
                      {dataFiltered?.map((row) => (
                        <OrderTableRow
                          key={row._id}
                          row={row}
                          selected={selected.includes(row._id)}
                          onViewRow={() => handleViewRow(row._id)}
                        />
                      ))}

                      <TableEmptyRows
                        height={denseHeight}
                        emptyRows={Math.max(0, rowsPerPage - (dataFiltered?.length || 0))}
                      />

                      <TableNoData isNotFound={isNotFound && !isLoading} />
                    </>
                  )}
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={totalCount}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
            rowsPerPageOptions={[50, 75, 100]}
            loading={isLoading}
            //
            dense={dense}
            onChangeDense={onChangeDense}
          />
        </Card>
      </Container>
    </>
  );
}
