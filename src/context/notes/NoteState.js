import noteContext from "./NoteContext";

 const NoteState =(props)=>{
     const state = {
         "name":"monk",
         "sub":"MERN"
                }
        return(
            <noteContext.Provider value={state}>
                {props.children}
            </noteContext.Provider>
        )
 }

 export default NoteState