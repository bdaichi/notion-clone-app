import { Dispatch, SetStateAction } from "react";
import axios from 'axios';
import Page from "../entity/Page";

export async function createPage(page: Page) {
    //pageのデータをサーバーにPOSTする
    console.log('createPage page', page)
}

export async function fetchOriginallyPages(setPages: Dispatch<SetStateAction<Page[]>>) {
    await axios
    .get('http://localhost:3001/read_originally_pages')
    .then((results) => {
        console.log(results.data.pages);
        console.log('originallyPagesMap',results.data.pages.map((doc: any) => Page.fromJSON(doc.data)))
        setPages(results.data.pages.map((doc: any) => Page.fromJSON(doc)))
    })
    .catch((error) => {
        console.log('read_originally_pagesのやろうが通信失敗');
        console.log(error.status);
    });
  }

  export async function fetchUserPages(setPages: Dispatch<SetStateAction<Page[]>>) {
    await axios
    .get('http://localhost:3001/read_user_pages')
    .then((results) => {
        console.log(results.data.pages);
        console.log('userPagesMap',results.data.pages.map((doc: any) => Page.fromJSON(doc.data)))
        setPages(results.data.pages.map((doc: any) => Page.fromJSON(doc)))
    })
    .catch((error) => {
        console.log('read_user_pagesのやろうが通信失敗');
        console.log(error.status);
    });
  }
