import axios from "axios";
import { useEffect, useState } from "react";
import { Result, RootObject } from "../../Models/Objects";
import "./Characters.css";

function Characters(): JSX.Element {
    const [origin, setOrigin] = useState<Result[]>([]);
    const [characters, setCharacters] = useState<Result[]>([]);

    const handleChange = (category: string) => {
        console.log('got : ' + category);
        if (category !== 'All') {
            setCharacters(origin.filter(record => record.species === category));
        } else {
            setCharacters(origin)
        }
    }

    useEffect(() => {
        axios.get<RootObject>('https://rickandmortyapi.com/api/character')
            .then(res => {
                setCharacters(res.data.results);
                setOrigin(res.data.results);
            })
            .catch(err => console.log(err));
    }, []);



    return (
        <div className="Characters">
            <select defaultValue={'All'} onChange={(e) => handleChange(e.target.value)}>
                <option value="All">ALL</option>
                <option value="Human">HUMAN</option>
                <option value="Alien">ALIEN</option>
            </select>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Species</th>
                        <th>Image</th>
                    </tr>

                </thead>
                <tbody>
                    {characters.map(c =>

                        <tr key={c.id}>
                            <td key={c.id + 'a'}>{c.name}</td>
                            <td key={c.id + 'b'}>{c.species}</td>
                            <td key={c.id + 'c'}><img src={c.image} alt={c.name} /></td>
                        </tr>
                    )}
                </tbody>

            </table>
        </div>
    );
}

export default Characters;