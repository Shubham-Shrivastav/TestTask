import React, { useEffect, useState } from 'react';
import { FaSpinner, FaAndroid, FaUserCircle, FaQuestionCircle } from 'react-icons/fa';
import { DataGrid } from '@mui/x-data-grid';

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

const Featcher = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://swapi.dev/api/people/')
            .then((res) => res.json())
            .then((result) => {
                const updatedData = result.results.map((item, index) => ({
                    id: index + 1,
                    ...item,
                }));
                setData(updatedData);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error:', error);
                setLoading(false);
            });
    }, []);

    return (
        <>
            {loading && <h2><FaSpinner /></h2>}
            {!loading && data && (
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={data}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        autoHeight
                    />
                </div>
            )}
        </>
    );
};

export default Featcher;
