import type { NextPage } from 'next'
import ExpressService from '../service/express_service'
import MysqlService from '../service/mysql_service'

const Home: NextPage = () => {
    MysqlService()

  return (
    <>aa</>
  )
}

export default Home
