import { useState } from "react";
import { Button, TextField } from '@material-ui/core';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LoginIcon from '@mui/icons-material/Login';

import { useRouter } from 'next/router';
import User from "../entity/User";
import { createUser } from "../service/user_service";

export default function SignIn() {
    const router = useRouter()
    //userIdはemailです
    const [userId, setUserId] = useState('')
    const [password, setPassword] = useState('')
    const [isRevealPassword, setIsRevealPassword] = useState(false);

    const emailHandler = (e: any) => {
        setUserId(e.target.value)
    }

    const passwordHandler = (e: any) => {
        setPassword(e.target.value)
    }

    const logIn = () => {
        localStorage.setItem('userId', userId)
        localStorage.setItem('password', password)
        router.push('/pages')
    }

    const signUp = async () => {
        localStorage.setItem('userId', userId)
        localStorage.setItem('password', password)
        const createUserData = User.createUser(userId, password)
        await createUser(createUserData)
        router.push('/pages')
    }

    return(
        <div className='flex justify-center mt-16'>
                    <div className='flex flex-col '>
                        <h1 className='flex justify-center text-3xl mt-20 font-serif text-black-500'>notionClone</h1>
                        <h1 className='flex justify-center text-1xl mt-8'>ログインまた新規登録をして始めよう</h1>
                        <div className='flex justify-center my-4 mt-16'>
                            <TextField
                                variant="outlined"
                                label="Eメール"
                                onChange={emailHandler}
                            />
                        </div>

                        <div className='flex justify-center my-4'>
                            <TextField
                                variant="outlined"
                                label="パスワード"
                                type={isRevealPassword ? 'text' : 'password'}
                                onChange={passwordHandler}
                            />
                        </div>
                        <div className='flex justify-center mt-8 '>
                            <Button
                                variant='contained'
                                onClick={logIn}
                                style={{ backgroundColor: '#006db3' }}
                            >
                                <p className='flex text-base px-2' style={{ color: 'white', }}>ログイン</p>
                                <LoginIcon style={{ color: 'white', height: 30, width: 30, }} />
                            </Button>
                        </div>
                        <div className='flex justify-center mt-8 '>
                            <Button
                                variant='outlined'
                                onClick={signUp}
                                style={{ borderWidth: 3, color: '#006db3' }}
                            >
                                <p className='text-base px-2' style={{ color: '#006db3', }}>新規登録</p>
                                <AddCircleOutlineIcon style={{ color: '#006db3', height: 30, width: 30, }} />
                            </Button>
                        </div>
                    </div>
                </div>
    )
}