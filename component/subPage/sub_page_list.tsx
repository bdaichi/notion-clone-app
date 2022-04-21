import { Dispatch, SetStateAction } from "react";
import SubPage from "../../entity/SubPage";
import PageListTile from "../page/page_list_tile";

type Props = {
  subPages: SubPage[];
  setPageId: Dispatch<SetStateAction<string>>;
};

export default function SubPageList(props: Props) {
  return (
    <>
      <div>
        {props.subPages.map((subPage) => (
          <div key={subPage.pageId} className="flex flex-col">
            <PageListTile page={subPage} setPageId={props.setPageId} />
          </div>
        ))}
      </div>
    </>
  );
}
