import axios from "axios";
import { Dispatch, SetStateAction } from "react";

import SubPage from "../entity/SubPage";
import { baseURL } from "./page_service";

export async function createSubPage(subPage: SubPage) {
  console.log("createsubPage page", subPage.toJson());
  try {
    await axios.post(`${baseURL}/create_subPage`, {
      subPage: subPage.toJson(),
    });
  } catch (e) {
    console.log("createsubPage error", e);
  }
}

export async function fecthSubPages(
  setSubPages: Dispatch<SetStateAction<SubPage[]>>,
  hostPageId: string
) {
  console.log("hostPageId", hostPageId);
  await axios
    .post(`${baseURL}/read_subPages`, {
      pageId: hostPageId,
    })
    .then((results) => {
      setSubPages(
        results.data.subPages.map((doc: any) => SubPage.fromJSON(doc))
      );
    })
    .catch((error) => {
      console.log("read_subPagesのやろうが通信失敗");
      console.log(error.status);
    });
}
