import { Avatar } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import ExistedAccount from '../secondary-screens/ExistedAccount'
import Cookies from 'js-cookie'
import HeaderAdmin from "../components/AdminPanelHeader"
import { useParams } from 'react-router-dom'
import CryptoJS from 'crypto-js'
import axios from 'axios'
import { api } from '../models/config.model'
import NotFound from './404'
import Profile from './Profile'

const Account = ({ user }) => {
  const { _id } = useParams()

  const [data, setData] = useState(null)

  const { VITE_SECRET_KEY } = import.meta.env;

  const parseJSON = (str) => {
    try {
      return JSON.parse(str)
    } catch (e) {
      return str
    }
  }

  useEffect(() => {
      const fetchData = async () => {
        const response = await axios.get(api + "/api/user/?get=" + _id)
        setData(response.data)
        const bytes = CryptoJS.AES.decrypt(response.data.id, VITE_SECRET_KEY);
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

        try {
          const data = JSON.parse(decryptedData);
          setData(data);
        } catch (error) {
          console.error("Error parsing decrypted data:", error);
        }
      }

      fetchData()
  }, [])

  return (
    data && data.statusCode === 404 ? <NotFound user={user} /> : <Profile user={data} account={user} />
  )
}

export default Account