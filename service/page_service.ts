import { Dispatch, SetStateAction } from "react";
import axios from 'axios';
import Page from "../entity/Page";

export default async function fetchPages(setPages: Dispatch<SetStateAction<Page[]>>) {
    await axios
    .get('http://localhost:3001/read_pages')
    .then((results) => {
        console.log(results.data.pages);
        console.log('PagesMap',results.data.pages.map((doc: any) => Page.fromJSON(doc.data)))
        setPages(results.data.pages.map((doc: any) => Page.fromJSON(doc)))
    })
    
  }