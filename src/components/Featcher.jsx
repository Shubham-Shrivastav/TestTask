import React, { useEffect, useState } from 'react';

const Featcher = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <>
      {loading && <h2>Loading..... </h2>}
      {!loading && data && (
        <div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Height</th>
                <th>Mass</th>
                <th>Gender</th>
                <th>Hair Color</th>
                <th>Skin Color</th>
                <th>Eye Color</th>
                <th>Birth Year</th>
                <th>Species</th>
              </tr>
            </thead>
            <tbody>
              {data.map((person, index) => (
                <tr key={index}>
                  <td>{person.name}</td>
                  <td>{person.height}</td>
                  <td>{person.mass}</td>
                  <td>{person.gender}</td>
                  <td>{person.hair_color}</td>
                  <td>{person.skin_color}</td>
                  <td>{person.eye_color}</td>
                  <td>{person.birth_year}</td>
                  <td>{person.species}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Featcher;
