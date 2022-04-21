import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import Content from "../entity/Content";
import { baseURL } from "./page_service";

export async function createContent(content: Content) {
  console.log("createcontent", content.toJson());
  try {
    await axios.post(`${baseURL}/create_content`, {
      content: content.toJson(),
    });
  } catch (e) {
    console.log("createcontent error", e);
  }
}

export async function fetchContent(
  setContent: Dispatch<SetStateAction<Content | null>>,
  contentId: string
) {
  //postでcontentIdを渡してから取得
  await axios
    .post(`${baseURL}/read_content`, {
      contentId: contentId,
    })
    .then((results) => {
      console.log("ContentsMap", Content.fromJSON(results.data.content[0]));
      setContent(Content.fromJSON(results.data.content[0]));
    })
    .catch((error) => {
      console.log("read_contentのやろうが通信失敗");
      console.log(error.status);
    });
}

export async function fetchContents(
  setContents: Dispatch<SetStateAction<Content[]>>,
  pageId: string
) {
  await axios
    .post(`${baseURL}/read_contents`, {
      pageId: pageId,
    })
    .then((results) => {
      console.log(results.data.contents);
      console.log(
        "ContentsMap",
        results.data.contents.map((doc: any) => Content.fromJSON(doc.data))
      );
      setContents(
        results.data.contents.map((doc: any) => Content.fromJSON(doc))
      );
    })
    .catch((error) => {
      console.log("read_contentsのやろうが通信失敗");
      console.log(error.status);
    });
}

export async function updateContent(content: Content, contentId: string) {
  console.log("updateContent contentId", contentId);
  await axios
    .post(`${baseURL}/update_content`, {
      content: content.toJson(),
      contentId: contentId,
    })
    .then((results) => {
      console.log(results.data.contents);
    })
    .catch((error) => {
      console.log("read_contentsのやろうが通信失敗");
      console.log(error.status);
    });
}
