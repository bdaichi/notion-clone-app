import '../styles/globals.css'
import { SignInProvider } from '../context/SignInContext'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SignInProvider>
      <Component {...pageProps} />
    </SignInProvider>
  )
}

export default MyApp
