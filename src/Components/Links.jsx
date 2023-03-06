import { useEffect, useState } from "react";
import { FirebaseDB } from "../Firebase/Firebase";
import LinkForm from "./LinkForm";

const Links = () => {

    const [ links, setLinks ] = useState([]); 

    const addOrEditLink = async ( linkObject ) => {
        await FirebaseDB.collection("Productos").doc().set(linkObject);  
        console.log('New product added');      
    };

    const getLinks = async () => {
        FirebaseDB.collection("Productos").onSnapshot((querySnapshot) => {
            querySnapshot.forEach( ( doc ) => {
                console.log( doc.data() );
            });
        });
    };

    useEffect(() => {
      getLinks();
    }, []);
    

    return <div>
        <LinkForm addOrEditLink={addOrEditLink} />
        <h1>Links</h1>
    </div>
};

export default Links;

