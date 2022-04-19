import axios from "axios";
import { Dispatch, SetStateAction } from "react";

import SubPage from "../entity/SubPage";

export async function createSubPage(subPage: SubPage) {
    //postでsubPageのデータを渡す
    console.log('createSubPage', subPage)
}

export async function fecthSubPages(setSubPages: Dispatch<SetStateAction<SubPage[]>>, hostPageId: string) {
    //postでhostPageIdを渡す
    await axios
    .get('http://localhost:3001/read_subPages')
    .then((results) => {
        console.log(results.data.pages);
        console.log('originallyPagesMap',results.data.pages.map((doc: any) => SubPage.fromJSON(doc.data)))
        setSubPages(results.data.pages.map((doc: any) => SubPage.fromJSON(doc)))
    })
    .catch((error) => {
        console.log('read_subPagesのやろうが通信失敗');
        console.log(error.status);
    });
}