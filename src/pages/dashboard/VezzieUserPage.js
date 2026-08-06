import { Helmet } from 'react-helmet-async';
import { paramCase } from 'change-case';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Card, Table, TableBody, Container, TableContainer } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';

// components
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
  TablePaginationCustom,
} from '../../components/table';
// sections
import { UserTableToolbar, UserTableRow } from '../../sections/@dashboard/user/list';
import { clientUserList } from '../../Services/UserSer';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'mobile', label: 'Mobile', align: 'left' },
  { id: 'address', label: 'Address', align: 'left' },
  { id: 'city', label: 'City', align: 'left' },
  { id: 'pinCode', label: 'Pin Code', align: 'left' },
  { id: 'state', label: 'State', align: 'left' },
];

// ----------------------------------------------------------------------

export default function VezzieUserPage() {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    // onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const { themeStretch } = useSettingsContext();

  const navigate = useNavigate();

  const [tableData, setTableData] = useState([]);

  const [filterName, setFilterName] = useState('');

  const [filterAddress, setFilterAddress] = useState('');

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterAddress,
  });

  const dataInPage = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const denseHeight = dense ? 52 : 72;

  const isFiltered = filterName !== '' || filterAddress !== '';

  const isNotFound =
    (!dataFiltered.length && !!filterName) || (!dataFiltered.length && !!filterAddress);

  const handleFilterName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleFilterAddress = (event) => {
    setPage(0);
    setFilterAddress(event.target.value);
  };

  const handleDeleteRow = (id) => {
    const deleteRow = tableData.filter((row) => row.id !== id);
    setSelected([]);
    setTableData(deleteRow);

    if (page > 0) {
      if (dataInPage.length < 2) {
        setPage(page - 1);
      }
    }
  };

  const handleEditRow = (id) => {
    navigate(PATH_DASHBOARD.user.edit(paramCase(id)));
  };

  const handleResetFilter = () => {
    setFilterName('');
    setFilterAddress('');
  };

  const fetchUserList = async () => {
    try {
      const { data } = await clientUserList();
      console.log({ data });
      setTableData(data?.users);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchUserList();
  }, []);
  return (
    <>
      <Helmet>
        <title> User: List | VEZZIE </title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="User List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'User', href: PATH_DASHBOARD.vezzieUser },
            { name: 'List' },
          ]}
        />

        <Card>
          <UserTableToolbar
            isFiltered={isFiltered}
            filterName={filterName}
            filterAddress={filterAddress}
            onFilterName={handleFilterName}
            onFilterAddress={handleFilterAddress}
            onResetFilter={handleResetFilter}
          />

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <Scrollbar>
              <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  onSort={onSort}
                  // rowCount={dataFiltered.length}
                  // numSelected={selected.length}
                  // onSelectAllRows={(checked) =>
                  //   onSelectAllRows(
                  //     checked,
                  //     dataFiltered.map((row) => row._id)
                  //   )
                  // }
                />

                <TableBody>
                  {dataFiltered
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <UserTableRow
                        key={row._id}
                        row={row}
                        selected={selected.includes(row._id)}
                        onSelectRow={() => onSelectRow(row._id)}
                        onDeleteRow={() => handleDeleteRow(row._id)}
                        onEditRow={() => handleEditRow(row.name)}
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
      </Container>
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, comparator, filterName, filterAddress }) {
  const stabilizedThis = inputData?.map((el, index) => [el, index]);

  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis?.map((el) => el[0]);

  if (filterName) {
    inputData = inputData?.filter(
      (user) =>
        (user?.name && user?.name?.toLowerCase().indexOf(filterName?.toLowerCase()) !== -1) ||
        user?.mobile?.toString().indexOf(filterName) !== -1 ||
        (user?.email && user?.email?.indexOf(filterName) !== -1)
    );
  }

  if (filterAddress) {
    inputData = inputData.filter(
      (user) =>
        (user?.pinCode && user?.pinCode?.toString().indexOf(filterAddress) !== -1) ||
        (user?.address &&
          user?.address?.toLowerCase().indexOf(filterAddress?.toLowerCase()) !== -1) ||
        (user?.city && user?.city?.toLowerCase().indexOf(filterAddress?.toLowerCase()) !== -1) ||
        (user?.state && user?.state?.toLowerCase().indexOf(filterAddress?.toLowerCase()) !== -1)
    );
  }

  return inputData;
}
