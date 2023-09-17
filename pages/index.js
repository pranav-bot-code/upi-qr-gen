import Image from 'next/image'
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQRCode } from 'next-qrcode';

export default function Home() {
  const { Image } = useQRCode();
  const [data, setData] = useState(null);
  const { register, handleSubmit } = useForm();
  function handleRequest(dataform) {
    console.log(dataform)
    if (dataform.amount === "") dataform.amount = undefined
    setData(dataform);
  }
  return (

    <main className='dark:bg-gray-800 bg-gray-100 w-full flex flex-col h-screen overflow-hidden'>
      <div id="header" className='flex items-center p-3'>
        <h1 className='font-mono text-2xl'>UPI QR Generator</h1>
      </div>
      <div className='flex flex-col items-center justify-center h-full w-full'>
        <p className='text-xl font-sans'>Simple QR Code Generator for <span className='text-orange-400'>UPI</span><span className='text-red-500'>.</span></p>
        <form className='flex flex-col m-10' onSubmit={handleSubmit(handleRequest)}>
          <input className='border-gray-700 p-3 mb-2 rounded-lg border text-gray-900' type='text' name='upiId' placeholder='UPI ID' {...register('upiId')} required></input>
          <input className='border-gray-700 p-3 mb-2 rounded-lg border text-gray-900' type='text' name='name' placeholder='Name' {...register('name')} required></input>
          <input className='border-gray-700 p-3 rounded-lg border text-gray-900' type='number' name='amount' placeholder='Amount' {...register('amount')}></input>
          <button className='bg-blue-400 dark:bg-blue-500 p-2 m-3 rounded-full' type='submit'>Generate QR</button>
        </form>
        {data && (
          <Image
            text={`upi://pay?pa=${data.upiId}&pn=${data.name}&tn=undefined&am=${data.amount}`}
            options={{
              type: 'image/jpeg',
              quality: 0.9,
              errorCorrectionLevel: 'H',
              margin: 3,
              scale: 4,
              width: 200,
              color: {
                dark: '#000',
                light: '#fff',
              },
            }}
          ></Image>
        )}
      </div>
      <p className='text-gray-800 dark:text-gray-200 text-sm font-mono '>No information is stored on any server. We dont sell any data :)</p>
    </main>
  )
}
