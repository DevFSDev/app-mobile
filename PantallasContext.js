import {createContext, useState} from "react";


const PantallasContext = createContext();

export const PantallasProvider = ({ children }) => {
    const [text, setText] = useState("");
    const [error, setError] = useState("");
    const [name, setName] = useState("");
    const [surnames, setSurnames] = useState("");
    const [email, setemail] = useState("");
    const [location, setLocation] = useState("");
    const [project, setProject] = useState("");
    const [score, setScore] = useState(0);
    const [skill, setSkill] = useState([]);
    const [level, setLevel] = useState([]);


    
    return (
        <PantallasContext.Provider value ={{ text, setText, error, setError, name, setName, surnames, setSurnames, email, setemail, location, setLocation, score, setScore, skill, setSkill, level, setLevel, project, setProject}}>
            {children}
        </PantallasContext.Provider>
    )
}

export default PantallasContext;