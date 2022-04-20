import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { fetchOriginallyPages } from "../../service/page_service";
import Page from "../../entity/Page";
import PageListTile from "./page_list_tile";

type Props = {
  setPageId: Dispatch<SetStateAction<string>>;
  userId: string;
};

export default function OriginallyPageList(props: Props) {
  const [pagesData, setPagesData] = useState<Page[]>([]);

  const fetchPagesData = () => {
    fetchOriginallyPages(setPagesData, props.userId);
  };

  useEffect(() => {
    if (pagesData[0] == null) {
      fetchPagesData();
    }
  }, []);

  return (
    <div className="border-b-2 border-gray-300 my-4">
      {pagesData.map((pageData) => (
        <div key={pageData.pageId}>
          <PageListTile page={pageData} setPageId={props.setPageId} />
        </div>
      ))}
    </div>
  );
}
