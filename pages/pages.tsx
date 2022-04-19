import { Button, IconButton, List, TextField } from "@material-ui/core";
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { createPage } from "../service/page_service";
import OriginallyPageList from "../component/page/originally_page_list";
import PageContent from "../component/page/page_contents";
import Page from "../entity/Page";
import { SignInContext } from "../context/SignInContext";
import UserPageList from "../component/page/user_page_list";

export default function Pages() {
    const { currentUser } = useContext(SignInContext)
    const router = useRouter()

    const [isOpenAddPageField, setIsOpenAddPageField] = useState(false)
    const [isOpenPageList, setIsOpenPageList] = useState(false)
    const [pageId, setPageId] = useState('')
    const [pageName, setPageName] = useState('')

    const addPage = async () => {
        if(currentUser) {
            console.log('userId', currentUser.userId)
            const pageData = Page.createPage(pageName, currentUser.userId)
            await createPage(pageData)
            closeAddPageField()
        }
    }

    const openAddPageField = () => {
        setIsOpenAddPageField(true)
    }

    const closeAddPageField = () => {
        setIsOpenAddPageField(false)
    }

    const openPageList = () => {
            setIsOpenPageList(true)
    }

    const closePageList = () => {
        setIsOpenPageList(false)
    }

    useEffect(() => {
        if(!currentUser) {
            router.push('sign_In')
        }
    })

    return(
        <>
            <div className='flex md:flex-row' style={{ width: '100%' }}>
                <div className='hidden md:grid' style={{ minHeight: '800px', height: '100%', backgroundColor: '#e1f5fe', width: '40%' }}>
                    <List className='flex flex-col z-20'>
                        <div className='flex my-12 mx-12 flex-col'>
                        <OriginallyPageList setPageId={setPageId}/>
                            <div className='flex flex-row'>
                                <IconButton onClick={openAddPageField}>
                                    <AddIcon />
                                </IconButton>
                                <p className='flex items-center mr-8'>ページを追加する</p>
                            </div>
                            <div>{isOpenAddPageField &&
                            /* ページ追加時のTextfieldとButto表示 */
                                <div className='flex flex-col'>
                                    <TextField
                                        variant="outlined"
                                        style={{ backgroundColor: 'white' }}
                                        label='ページ名'
                                        onChange={(e) => setPageName(e.target.value)}
                                    />
                                    <div className='flex flex-row justify-center my-4'>
                                        <Button
                                            variant='contained'
                                            style={{ color: 'white', backgroundColor: 'blue', margin: 4 }}
                                            onClick={addPage}
                                        >
                                            <p className='mx-4'>追加</p>
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            style={{ color: 'bule', backgroundColor: 'white', margin: 4 }}
                                            onClick={closeAddPageField}
                                        >
                                            キャンセル
                                        </Button>
                                    </div>
                                </div>
                            }</div>
                            <UserPageList setPageId={setPageId} />
                        </div>
                    </List>
                </div>
                <div className=''>{!isOpenPageList ?
                    <div className='flex justify-center z-10' style={{ width: '100%', height: '100%',}}>
                            <PageContent pageId={pageId} />
                    </div>
                :
                    <div className='hidden' style={{ width: '100%', }}>
                        <PageContent pageId={pageId} />
                    </div>
                }</div>
            </div>
            {/* sm(スマホ用のドロワー表示 isOpenで表示と非表示を切り替える) */}
            <div className='fixed top-5 left-5 md:hidden z-20'>{!isOpenPageList ?
                <IconButton onClick={openPageList}>
                <ArrowForwardIosIcon /> 
                </IconButton>
                :
                <IconButton>    
                    <ArrowBackIosNewIcon onClick={closePageList}/>
                </IconButton>
            }</div>
            {isOpenPageList &&
                <div className='z-10' style={{ minHeight: '900px', height: '100%', backgroundColor: '#e1f5fe' }}>
                        <List>
                            <div className='flex justify-center items-center my-12 mx-12 flex-col'>
                                <OriginallyPageList setPageId={setPageId}/>
                            </div>
                        </List>
                </div>
            }
        </>
    )
}