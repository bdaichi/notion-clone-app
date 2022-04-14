import { Dispatch, SetStateAction } from "react";
import axios from 'axios';
import Page from "../entity/Page";

export async function createPage(page: Page) {
    //pageのデータをサーバーにPOSTする
    console.log('createPage page', page)
}

export async function fetchPages(setPages: Dispatch<SetStateAction<Page[]>>) {
    await axios
    .get('http://localhost:3001/read_pages')
    .then((results) => {
        console.log(results.data.pages);
        console.log('PagesMap',results.data.pages.map((doc: any) => Page.fromJSON(doc.data)))
        setPages(results.data.pages.map((doc: any) => Page.fromJSON(doc)))
    })
    .catch((error) => {
        console.log('read_pagesのやろうが通信失敗');
        console.log(error.status);
    });
  }

  export async function fetchPage(setPageData: Dispatch<SetStateAction<Page | null>>){
    await axios
    .get('http://localhost:3001/read_page')
    .then((results) => {
        console.log('fromJson', Page.fromJSON(results.data.pages));
        console.log('results', results.data.pages)
        setPageData(Page.fromJSON(results.data.pages[0]))
    })
    .catch((error) => {
        console.log('read_pagesのやろうが通信失敗');
        console.log(error.status);
    });
  }