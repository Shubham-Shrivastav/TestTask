import React, { useEffect, useState } from 'react';
import { FaSpinner, FaAndroid, FaUserCircle, FaQuestionCircle } from 'react-icons/fa';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TextField, Box, Button } from '@mui/material';
const columns = [
    { id: 'name', name: 'Name' },
    { id: 'height', name: 'Height' },
    { id: 'Mass', name: 'Mass' },
    { id: 'gender', name: 'Gender' },
    { id: 'hair_color', name: 'Hair Color' },
    { id: 'skin_color', name: 'Skin Color' },
    { id: 'eye_color', name: 'Eye Color' },
    { id: 'birth_year', name: 'Birth Year' },
    { id: 'species', name: 'Species' },
    { id: 'icon', name: 'Icon' },
];
const speciesIcon = (species) => {
    switch (species) {
        case 'Droid':
            return <FaAndroid />;
        case 'Human':
            return <FaUserCircle />;
        default:
            return <FaQuestionCircle />;
    }
};
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}
function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}
const Featcher = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('');
    const [search, setSearch] = useState('');
    const handleSearchChange = (event) => {
        setSearch(event.target.value.toLowerCase());
    };
    const handleSearch = () => {
        setLoading(true);
        fetch(`https://swapi.dev/api/people/?search=${search}`)
            .then((res) => res.json())
            .then((result) => {
                setData(result.results);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error:', error);
                setLoading(false);
            });
    };
    const handleSortRequest = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    useEffect(() => {
        fetch('https://swapi.dev/api/people/')
            .then((res) => res.json())
            .then((result) => {
                setData(result.results);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error:', error);
                setLoading(false);
            });
    }, []);
    const sortedData = stableSort(data, getComparator(order, orderBy));
    return (
        <>
            {loading && <h2><FaSpinner /></h2>}
            {!loading && (
                <div>
                    <Box sx={{ justifyContent: 'flex-start', m: 1 }}>
                        <TextField
                            id="search"
                            label="Search by name"
                            variant="outlined"
                            size="small"
                            placeholder="Name"
                            sx={{ width: 300 }}
                            value={search}
                            onChange={handleSearchChange}
                        />
                        <Button variant="contained" sx={{ mx: 2 }} onClick={handleSearch}>
                            Search
                        </Button>
                    </Box>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            onClick={() => handleSortRequest(column.id)}
                                        >
                                            {column.name}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody sx={{ minWidth: 650 }} size="small">
                                {sortedData
                                    .filter((item) =>
                                        item.name.toLowerCase().includes(search)
                                    )
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((person, index) => (
                                        <TableRow key={index}>
                                            {columns.map((column) => (
                                                <TableCell key={column.id}>
                                                    {column.id === 'icon'
                                                        ? speciesIcon(person[column.id])
                                                        : person[column.id]}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={data.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={(event, newPage) => setPage(newPage)}
                            onRowsPerPageChange={(event) => {
                                setRowsPerPage(parseInt(event.target.value, 10));
                                setPage(0);
                            }}
                        />
                    </TableContainer>
                </div>
            )}
        </>
    );
};
export default Featcher;

