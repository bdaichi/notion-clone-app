import { Button, IconButton, TextField } from "@material-ui/core";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

import CreateSubPageField from "../subPage/create_sub_page_field";
import { deleteSubPage, fecthSubPages } from "../../service/subPage_service";
import OpenSubPageListButton from "../subPage/open_sub_page_list";
import Page from "../../entity/Page";
import SubPage from "../../entity/SubPage";
import SubPageList from "../subPage/sub_page_list";
import { deletePage } from "../../service/page_service";

type Props = {
  page: Page | SubPage;
  setPageId: Dispatch<SetStateAction<string>>;
};

export default function PageListTile(props: Props) {
  const [isConfirmation, setIsConfimation] = useState(false);
  const [isOpenSubPageList, setIsOpenSubPageList] = useState(false);
  const [subPages, setSubPages] = useState<SubPage[]>([]);

  const deletePageData = async () => {
    deletePage(props.page.pageId);
    deleteSubPage(props.page.pageId);
  };

  const fetchContentsData = () => {
    props.setPageId(props.page.pageId);
  };

  const fetchSubPageData = async () => {
    await fecthSubPages(setSubPages, props.page.pageId);
  };

  const openConfirmationField = () => {
    setIsConfimation(true);
  };

  useEffect(() => {
    if (!isConfirmation) {
      fetchSubPageData();
    }
  }, [isConfirmation]);

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row">
          <>
            {subPages[0] != null &&
              subPages != [] &&
              props.page.pageId == subPages[0].hostPageId && (
                <OpenSubPageListButton
                  isOpenSubPageList={isOpenSubPageList}
                  setIsOpenSubPageList={setIsOpenSubPageList}
                />
              )}
          </>
          <Button onClick={fetchContentsData}>
            <p
              className="flex items-center text-lg my-4 tracking-wide w-30 truncate"
              style={{ color: "#006db3", fontFamily: "筑紫A丸ゴシック" }}
            >
              {props.page.pageName}
            </p>
          </Button>
          <IconButton onClick={openConfirmationField}>
            <AddBoxOutlinedIcon />
          </IconButton>
          {props.page.pageId != "quickMemo" &&
            props.page.pageId != "tryUsing" &&
            props.page.pageId != "todoList" && (
              <IconButton onClick={deletePageData}>
                <DeleteForeverOutlinedIcon />
              </IconButton>
            )}
        </div>
        <>
          {isOpenSubPageList && (
            <SubPageList subPages={subPages} setPageId={props.setPageId} />
          )}
        </>
      </div>
      {/* サブページ作成フィールド */}
      <div>
        {isConfirmation ? (
          <CreateSubPageField
            hostPageId={props.page.pageId}
            setIsConfimation={setIsConfimation}
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
