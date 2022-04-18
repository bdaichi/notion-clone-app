import axios from 'axios';
import { Dispatch, SetStateAction } from "react";
import Content from '../entity/Content';

export async function createContent(content: Content) {
    //pageのデータをサーバーにPOSTする
    console.log('createPage page', content)
}

export async function fetchContent(setContent: Dispatch<SetStateAction<Content | null>>, contentId: string) {
    console.log('fetchContent', contentId)
    //postでcontentIdを渡してから取得
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

export async function fetchContents(setContents: Dispatch<SetStateAction<Content[]>>) {
    await axios
    .get('http://localhost:3001/read_contents')
    .then((results) => {
        console.log(results.data.contents);
        console.log('ContentsMap',results.data.contents.map((doc: any) => Content.fromJSON(doc.data)))
        setContents(results.data.contents.map((doc: any) => Content.fromJSON(doc)))
    })
    .catch((error) => {
        console.log('read_contentsのやろうが通信失敗');
        console.log(error.status);
    });
}

export async function updateContent(content: Content, contentId: string) {
    console.log('updateContent contentId', contentId)
    //contentIdを渡してアップデート処理
}