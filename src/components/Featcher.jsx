import React, { useState, useEffect } from 'react';
import { FaAndroid, FaUserCircle, FaQuestionCircle, FaSpinner } from 'react-icons/fa';
import { DataGrid } from '@mui/x-data-grid';

const Featcher = () => {
    const [tableData, setTableData] = useState({ count: 0, next: null, previous: null, results: [] });
    const [url, setUrl] = useState('https://swapi.dev/api/people/');
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }
                const data = await response.json();
                setTableData({ ...data, rows: data.results });
                setError(null);
            } catch (err) {
                setError('Error fetching data');
            }
        };

        fetchData();
    }, [url]);

    const columns = [
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'height', headerName: 'Height', width: 120 },
        { field: 'mass', headerName: 'Mass', width: 120 },
        { field: 'gender', headerName: 'Gender', width: 120 },
        { field: 'hair_color', headerName: 'Hair Color', width: 150 },
        { field: 'skin_color', headerName: 'Skin Color', width: 150 },
        { field: 'eye_color', headerName: 'Eye Color', width: 150 },
        { field: 'birth_year', headerName: 'Birth Year', width: 150 },
        { field: 'species', headerName: 'Species', width: 120 },
        {
            field: 'icon',
            headerName: 'Icon',
            width: 100,
            renderCell: (params) => {
                const species = params.row.species;
                return (
                    <span>
                        {species === 'Droid' ? <FaAndroid /> : species === 'Human' ? <FaUserCircle /> : <FaQuestionCircle />}
                    </span>
                );
            },
        },
    ];

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handlePageChange = (newPage) => {
        setUrl(`https://swapi.dev/api/people/?page=${newPage + 1}`);
    };

    const getRowId = (row) => row.name;

    const filteredData = tableData.results.filter((row) =>
        row.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            {error && <p>{error}</p>}
            <input
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={handleSearch}
            />
            <DataGrid
                rows={filteredData}
                columns={columns}
                pagination
                pageSize={10}
                rowCount={tableData.count}
                paginationMode="server"
                onPageChange={handlePageChange}
                pageSizeOptions={[10, 15, 20]}
                getRowId={getRowId}
            />
            {!tableData.count && <h2><FaSpinner /></h2>}
        </div>
    );
};

export default Featcher;
