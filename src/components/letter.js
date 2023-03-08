import { useEffect,useState } from 'react';
export default function Letter(props){
    console.log(props.char);
        return(<div>{props.char}</div>)
}