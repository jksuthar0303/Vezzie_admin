import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';

import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { Card, Table, Button, TableBody, Container, TableContainer } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// utils

// components

import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../components/settings';
import {
  useTable,
  getComparator,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from '../../components/table';
// sections
import { CouponTableRow, CouponTableToolbar } from '../../sections/@dashboard/coupon/list';
import CouponNewEditDailog from '../../sections/@dashboard/coupon/CouponNewEditDialog';

import { couponDelete, couponViewList } from '../../Services/UserSer';

// ----------------------------------------------------------------------

const Public_OPTIONS = ['all', 'Public', 'Non Publice'];

const TABLE_HEAD = [
  { id: 'couponId', label: 'Coupon', align: 'left' },
  { id: 'code', label: 'Code', align: 'left' },
  { id: 'type', label: 'Type', align: 'left' },
  { id: 'limit', label: 'Limit', align: 'center', width: 140 },
  { id: 'discount', label: 'Discount', align: 'left', width: 140 },
  { id: 'minimum', label: 'Minimum Order', align: 'left', width: 140 },
  { id: 'appliedBy', label: 'ApplyiedBy', align: 'left', width: 140 },
  { id: 'description', label: 'Description', align: 'left', width: 140 },
  { id: 'public', label: 'Public', align: 'left' },
  { id: '' },
];

// ----------------------------------------------------------------------

export default function CouponListPage() {
  const { themeStretch } = useSettingsContext();

  const navigate = useNavigate();

  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    onSelectRow,
    //
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({ defaultOrderBy: 'createDate' });

  const [tableData, setTableData] = useState([]);

  const [filterName, setFilterName] = useState('');

  const [openPopover, setOpenPopover] = useState(false);

  const [isEdit, setIsEdit] = useState(false);

  const [editData, setEditData] = useState({});

  const [filterPublic, setFilterPublic] = useState('all');

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterPublic,
  });

  const dataInPage = dataFiltered?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const denseHeight = dense ? 56 : 76;

  const isFiltered = filterPublic !== 'all' || filterName !== '';

  const isNotFound =
    (!dataFiltered.length && !!filterName) || (!dataFiltered.length && !!filterPublic);

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(false);
  };

  const handleFilterName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleFilterPublic = (event) => {
    setPage(0);
    setFilterPublic(event.target.value);
  };

  const handleDeleteRow = async (id) => {
    await couponDelete(id);

    if (page > 0) {
      if (dataInPage?.length < 2) {
        setPage(page - 1);
      }
    }
  };

  const handleEditRow = (id) => {
    setIsEdit(true);
    setEditData(id);
    setOpenPopover(true);
    console.log({ id });
  };

  const handleViewRow = (id) => {
    navigate(PATH_DASHBOARD.invoice.view(id));
  };

  const handleResetFilter = () => {
    setFilterName('');
    setFilterPublic('all');
  };

  const fetchCouponList = async () => {
    try {
      const { data } = await couponViewList();
      console.log({ data });
      setTableData(data?.coupons);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchCouponList();
  }, []);

  return (
    <>
      <Helmet>
        <title> Coupon: List | Vezzie</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Coupon List"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Coupon',
            },
            {
              name: 'List',
            },
          ]}
          action={
            <Button
              component={RouterLink}
              onClick={handleOpenPopover}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New Coupon
            </Button>
          }
        />

        <Card>
          <CouponTableToolbar
            filterName={filterName}
            isFiltered={isFiltered}
            filterPublic={filterPublic}
            onFilterName={handleFilterName}
            optionsPublic={Public_OPTIONS}
            onResetFilter={handleResetFilter}
            onFilterPublic={handleFilterPublic}
          />

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <TableSelectedAction dense={dense} />

            <Scrollbar>
              <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                <TableHeadCustom order={order} orderBy={orderBy} headLabel={TABLE_HEAD} />

                <TableBody>
                  {dataFiltered
                    ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    ?.map((row) => (
                      <CouponTableRow
                        key={row?._id}
                        row={row}
                        selected={selected.includes(row._id)}
                        onSelectRow={() => onSelectRow(row._id)}
                        onViewRow={() => handleViewRow(row._id)}
                        onEditRow={() => handleEditRow(row)}
                        onDeleteRow={() => handleDeleteRow(row._id)}
                      />
                    ))}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
                  />

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={dataFiltered.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
            //
            dense={dense}
            onChangeDense={onChangeDense}
          />
        </Card>

        <CouponNewEditDailog
          openPopover={openPopover}
          handleClosePopover={handleClosePopover}
          isEdit={isEdit}
          currentCoupon={editData}
        />
      </Container>
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, comparator, filterName, filterService, filterPublic }) {
  console.log(inputData);
  const stabilizedThis = inputData?.map((el, index) => [el, index]);

  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis?.map((el) => el[0]);

  if (filterName) {
    inputData = inputData?.filter(
      (cetegory) =>
        cetegory?.title?.toLowerCase()?.indexOf(filterName?.toLowerCase()) !== -1 ||
        cetegory?.code?.toLowerCase()?.indexOf(filterName?.toLowerCase()) !== -1 ||
        cetegory?.type?.toLowerCase()?.indexOf(filterName?.toLowerCase()) !== -1
    );
  }

  if (filterPublic !== 'all') {
    inputData = inputData.filter((item) =>
      item.public ? filterPublic === 'Public' : filterPublic === 'Non Public'
    );
  }

  return inputData;
}
