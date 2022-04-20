import { Button, IconButton, TextField } from "@material-ui/core";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

import { useEffect, useState } from "react";

import CheckBoxContent from "../contents/check_box_content";
import {
  createContent,
  fetchContent,
  fetchContents,
  updateContent,
} from "../../service/content_service";
import Content from "../../entity/Content";
import SelectContentTypeField from "../contents/select_content_type_field";
import TextContent from "../contents/text_content";

type Props = {
  pageId: string;
};

export default function PageContent(props: Props) {
  const [content, setContent] = useState<Content | null>(null);
  const [contents, setContents] = useState<Content[]>([]);
  const [contentId, setContentId] = useState("");
  //↓↓↓　pageを変更したさいにprops.pageIdも変更するのでデータ更新用のpageIdを保存しておいて更新処理がおわったらprops.pageIdをせっとする
  const [currentPageId, setCurrentPageId] = useState(props.pageId);
  //↓↓↓　文字変換を確定した後の2回目のEnterKeyを拾うため
  const [isAddDataEnterKey, setIsAddDataEnterkey] = useState(false);
  const [isReloadContents, setIsReloadContents] = useState(false);
  const [isSelectField, setIsSelectField] = useState(false);
  const [isTextField, setIsTextField] = useState(false);
  const [text, setText] = useState("");

  const addContent = async (type: string) => {
    console.log(type);
    const contentData = Content.createContent(currentPageId, text, type);
    await createContent(contentData);
    await fetchContentsData();
  };

  const chageTextField = (contentId: string) => {
    setContentId(contentId);
    console.log("contentId", contentId);
    setIsTextField(true);
  };

  const fetchContentData = async () => {
    await fetchContent(setContent, contentId);
  };

  const fetchContentsData = async () => {
    await fetchContents(setContents, props.pageId);
    setIsReloadContents(false);
  };

  const openSelectField = () => {
    setIsSelectField(true);
  };

  const updateContentText = async () => {
    if (isAddDataEnterKey) {
      if (content) {
        console.log("enter");
        const updateContentData = content.copyWith(
          contentId,
          currentPageId,
          text,
          null,
          null
        );
        setIsTextField(false);
        setIsAddDataEnterkey(false);
        await updateContent(updateContentData, contentId);
        setText("");
        setIsReloadContents(true);
      }
    } else {
      setIsAddDataEnterkey(true);
    }
  };

  useEffect(() => {
    setIsReloadContents(true);
    if (props.pageId) {
      if (props.pageId != currentPageId) {
        console.log("pageId", currentPageId);
        updateContentText();
        setCurrentPageId(props.pageId);
      }
    }
    console.log("contents", contents);
  }, [props.pageId]);

  useEffect(() => {
    if (isReloadContents) {
      fetchContentsData();
    }
  }, [isReloadContents]);

  useEffect(() => {
    fetchContentData();
  }, [contentId]);

  return (
    <>
      <div>
        {/*　↓↓↓ TextField外を押したらデータを追加or更新します */}
        <Button onClick={() => setIsTextField(false)}>
          <div
            className="flex absolute z-10 left-0 top-0"
            style={{ width: "900%", height: "6600%" }}
          ></div>
        </Button>
        {/* ↑↑↑ */}
        {!(props.pageId == "") ? (
          <div className="pt-8">
            <div className="flex flex-row">
              {!(contents[0] == null) ? (
                <div className="flex flex-col z-10">
                  {contents.map((content) => (
                    <>
                      <div key={content.hostPageId}>
                        {isTextField && content.contentId == contentId ? (
                          <div className="my-2 mx-8 z-10">
                            <TextField
                              variant="standard"
                              inputProps={{ style: { fontSize: "160%" } }}
                              defaultValue={content.text}
                              label={content.text ? "" : "なにかかいてみよう"}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  updateContentText();
                                }
                              }}
                              onChange={(e) => setText(e.target.value)}
                            />
                          </div>
                        ) : (
                          <div className="flex flex-row z-10 m-4">
                            <IconButton onClick={openSelectField}>
                              <AddOutlinedIcon />
                            </IconButton>
                            <div className="flex flex-col items-cneter">
                              {content.contentType == "text" && (
                                <TextContent
                                  onClickMethod={chageTextField}
                                  content={content}
                                />
                              )}
                              {content.contentType == "checkBox" && (
                                <CheckBoxContent
                                  content={content}
                                  onClickMethod={chageTextField}
                                />
                              )}
                              {content.contentType == "taskContent"}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex justify-center z-40"></div>
                    </>
                  ))}
                </div>
              ) : (
                <div className="flex flex-row z-10 m-4">
                  <IconButton onClick={openSelectField}>
                    <AddOutlinedIcon />
                  </IconButton>
                  <p className="flex items-center">なにか書いてみよう</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex mx-48 my-64">
            <p className="text-base">ページを選ぼう</p>
          </div>
        )}
      </div>
      <div className="z-40">
        {isSelectField && (
          <SelectContentTypeField
            setIsSelectField={setIsSelectField}
            addContent={addContent}
          />
        )}
      </div>
    </>
  );
}
