import Image from 'next/image'
import styles from './page.module.css'
import { DatePicker } from 'antd';
import App from './App';

export default function Home() {
  return (
    <div style={{
      backgroundColor: '#C8E3BA',
      minHeight: '100vh'
    }}>
      <App />

    </div>
  )
}
