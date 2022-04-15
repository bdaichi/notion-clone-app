import axios from 'axios';
import { Dispatch, SetStateAction } from "react";
import Content from '../entity/Content';

export async function fetchContents(setContent: Dispatch<SetStateAction<Content[]>>, contentId: string) {
    await axios
    .get('http://localhost:3001/read_contents')
    .then((results) => {
        console.log(results.data.contents);
        console.log('ContentsMap',results.data.contents.map((doc: any) => Content.fromJSON(doc.data)))
        setContent(results.data.contents.map((doc: any) => Content.fromJSON(doc)))
    })
    .catch((error) => {
        console.log('read_contentsのやろうが通信失敗');
        console.log(error.status);
    });
}