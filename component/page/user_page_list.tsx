import { Dispatch, SetStateAction, useEffect, useState } from "react";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

import { fetchUserPages } from "../../service/page_service";
import Page from "../../entity/Page";
import PageListTile from "./page_list_tile";

type Props = {
  setPageId: Dispatch<SetStateAction<string>>;
  userId: string;
  isDataReload: boolean;
  setIsDataReload: Dispatch<SetStateAction<boolean>>;
};

export default function UserPageList(props: Props) {
  const [pagesData, setPagesData] = useState<Page[]>([]);

  const fetchPagesData = () => {
    fetchUserPages(setPagesData, props.userId);
  };

  useEffect(() => {
    fetchPagesData();
    props.setIsDataReload(false);
  }, [props.isDataReload]);

  return (
    <>
      {pagesData.map((pageData) => (
        <div key={pageData.pageId}>
          <PageListTile page={pageData} setPageId={props.setPageId} />
        </div>
      ))}
    </>
  );
}
