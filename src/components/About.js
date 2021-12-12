import React,{useContext} from "react"
import noteContext from "../context/notes/NoteContext"
const About = () => {
    const a =useContext(noteContext)
    return (
        <div>
            About page{a.name} and sub is {a.sub}
        </div>
    )
}

export default About
