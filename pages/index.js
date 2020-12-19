import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import io from 'socket.io-client'
import cx from 'classnames'
import ScaleText from 'react-scale-text'

export default function Home() {
  const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL
  const [data, setData] = useState({})
  const [id, setId] = useState('')

  useEffect(() => {
    const socket = io(SERVER_URL)

    socket.on('connect', () => {
      setId(socket.id)
      console.log(`connected: ${socket.id}`)
    })

    socket.on('disconnect', () => {
      console.log(`disconnected: ${socket.id}`)
    })

    socket.on('data', (newData) => {
      console.log(newData)
      setData(newData)
      console.log(data)
    })
  }, [])

  return (
    <div>
      <Head>
        <title>Vizlizer2 client</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        className={cx(
          "w-screen h-screen bg-greenscreen overflow-hidden"
        )}
      >
        {/* <pre>
          Socket ID: {id}
        </pre>
        <pre>
          {JSON.stringify(data)}
        </pre> */}

        <div className="w-full h-full text-center">
          <ScaleText>
            {(data.text1 || data.text2) ? (
              <div className="flex justify-center h-full">
                <span
                  className={cx(
                    `font-${data.font}`,
                    "uppercase flex flex-col justify-center align-middle leading-none p-32",
                    `${data.clientClass}`,
                    `fontColor-${data.fontColor}`,
                  )}
                  style={{
                    WebkitTextStrokeWidth:
                      (data.font === 'bungee' ||
                      data.font === 'freckle-face') &&
                      '5px',
                    WebkitTextStrokeColor: 'white'
                  }}
                >
                  {data.text1 ? data.text1 : data.text2}
                </span>
              </div>
            ) : (
              <span className="opacity-0 font-tiny">.</span>
            )}
          </ScaleText>
        </div>
      </main>
    </div>
  )
}
