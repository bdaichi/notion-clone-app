import { Dispatch, SetStateAction } from "react";
import axios from "axios";
import Page from "../entity/Page";

export const baseURL = "http://localhost:3001";

export async function createPage(page: Page) {
  //pageのデータをサーバーにPOSTする
  console.log("createPage page", page.toJson());
  try {
    await axios.post(`${baseURL}/create_page`, {
      page: page.toJson(),
    });
  } catch (e) {
    console.log("createPage error", e);
  }
}

export async function createOriginallyPage(userId: string) {
  try {
    await axios.post(`${baseURL}/create_originally_page`, {
      userId: userId,
    });
  } catch (e) {
    console.log("createPage error", e);
  }
}

export async function fetchOriginallyPages(
  setPages: Dispatch<SetStateAction<Page[]>>,
  userId: string
) {
  await axios
    .post(`${baseURL}/read_originally_pages`, {
      userId: userId,
    })
    .then((results) => {
      console.log(results.data.pages);
      console.log(
        "originallyPagesMap",
        results.data.pages.map((doc: any) => Page.fromJSON(doc.data))
      );
      setPages(results.data.pages.map((doc: any) => Page.fromJSON(doc)));
    })
    .catch((error) => {
      console.log("read_originally_pagesのやろうが通信失敗");
      console.log(error.status);
    });
}

export async function fetchUserPages(
  setPages: Dispatch<SetStateAction<Page[]>>,
  userId: string
) {
  await axios
    .post(`${baseURL}/read_user_pages`, {
      userId: userId,
    })
    .then((results) => {
      console.log(results.data.pages);
      console.log(
        "userPagesMap",
        results.data.pages.map((doc: any) => Page.fromJSON(doc.data))
      );
      setPages(results.data.pages.map((doc: any) => Page.fromJSON(doc)));
    })
    .catch((error) => {
      console.log("read_user_pagesのやろうが通信失敗");
      console.log(error.status);
    });
}
