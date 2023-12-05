import React, { useEffect, useState } from 'react';
import { FaSpinner, FaAndroid, FaUserCircle, FaQuestionCircle } from 'react-icons/fa';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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


]

const Featcher = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://swapi.dev/api/people/')
            .then((res) => res.json())
            .then((result) => {
                setData(result.results);
                setLoading(false);
                console.log(result);
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
                <div>
                    <TableContainer component={Paper}>
                        <Table >
                            <TableHead>
                                <TableRow>
                                    {columns.map((columns) => (
                                        <TableCell key={columns.id}>{columns.name}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>


                            <TableBody sx={{ minWidth: 650 }} size="small">
                                {data.map((person, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{person.name}</TableCell>
                                        <TableCell>{person.height}</TableCell>
                                        <TableCell>{person.mass}</TableCell>
                                        <TableCell>{person.gender}</TableCell>
                                        <TableCell>{person.hair_color}</TableCell>
                                        <TableCell>{person.skin_color}</TableCell>
                                        <TableCell>{person.eye_color}</TableCell>
                                        <TableCell>{person.birth_year}</TableCell>
                                        <TableCell>{person.species}</TableCell>
                                        <TableCell>
                                            {person.species === 'Droid' ? (
                                                <FaAndroid />
                                            ) : person.species === 'Human' ? (
                                                <FaUserCircle />
                                            ) : (
                                                <FaQuestionCircle />
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            )}
        </>
    );
};

export default Featcher;
