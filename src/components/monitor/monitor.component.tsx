import ConnectIcon from '@mui/icons-material/LeakAdd'
import DisconnectIcon from '@mui/icons-material/WifiTetheringOff'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import React, { useCallback, useEffect, useState } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import { selectApiKey } from '../../redux/api-key/api-key.selector.ts'
import { useAppSelector } from '../../redux/hooks.ts'
import styles from './monitor.module.scss'

const getConnectionStatusText = (readyState: ReadyState): string => ({
  [ReadyState.CONNECTING]: 'Connecting',
  [ReadyState.OPEN]: 'Open',
  [ReadyState.CLOSING]: 'Closing',
  [ReadyState.CLOSED]: 'Closed',
  [ReadyState.UNINSTANTIATED]: 'Uninstantiated'
}[readyState])

const Monitor: React.FC = () => {
  const apiKey = useAppSelector(selectApiKey)
  const [data, setData] = useState<object>({})
  const [isConnected, setIsConnected] = useState<boolean>(false)

  // const socketUrl = `wss://streamer.cryptocompare.com/v2?api_key=${apiKey}`
  const socketUrl = `wss://data-streamer.cryptocompare.com/v2?api_key=${apiKey}`

  const { readyState, sendJsonMessage, lastJsonMessage, getWebSocket } =
    useWebSocket<object>(
      socketUrl,
      {
        share: true,
        shouldReconnect: () => false,
        onOpen: (event: WebSocketEventMap['open']) => {
          console.log('### onOpen event', event)
        },
        onClose: (event: WebSocketEventMap['close']) => {
          console.log('### onClose event', event)
        },
        onMessage: (event: WebSocketEventMap['message']) => {
          console.log('### onMessage event', event)
        },
        onError: (event: WebSocketEventMap['error']) => {
          console.log('### onError event', event)
        },
        onReconnectStop: (numAttempts: number) => {
          console.log('### onReconnectStop numAttempts', numAttempts)
        },
        heartbeat: {
          interval: 5000
        }
      },
      isConnected
    )
  const connectionStatus: string = getConnectionStatusText(readyState)

  useEffect(() => {
    if (readyState === 1 && lastJsonMessage !== null) {
      console.log('lastJsonMessage', lastJsonMessage)
      setData(lastJsonMessage)
    }
  }, [lastJsonMessage, readyState])

  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      // sendJsonMessage({
      //   action: 'SubAdd',
      //   subs: ['8~Binance~BTC~USDT']
      // })

      sendJsonMessage({
        'action': 'SUBSCRIBE',
        'type': 'index_cc_v1_latest_tick',
        'groups': [
          'VALUE',
          'CURRENT_HOUR'
        ],
        'market': 'cadli',
        'instruments': [
          'BTC-USD'
        ]
      })
    }
  }, [readyState, sendJsonMessage])

  const handleOpenConnection = useCallback(() => {
    setIsConnected(true)
  }, [])

  const handleCloseConnection = useCallback(() => {
    console.log('handleCloseConnection')
    const webSocket = getWebSocket()
    webSocket?.close()
    setIsConnected(false)
  }, [getWebSocket])

  return (
    <div className={styles.monitor}>
      <Paper elevation={10} className={styles.monitor__btn_container}>
        <span>Connection Status is <b>{connectionStatus}</b></span>

        <Stack spacing={2} direction="row">
          <Button
            variant="outlined"
            onClick={handleOpenConnection}
            startIcon={<ConnectIcon />}
            disabled={
              readyState !== ReadyState.CLOSED &&
              readyState !== ReadyState.UNINSTANTIATED
            }
          >
            Open Connection
          </Button>
          <Button
            variant="outlined"
            onClick={handleCloseConnection}
            startIcon={<DisconnectIcon />}
            disabled={
              readyState === ReadyState.CLOSED ||
              readyState === ReadyState.CLOSING ||
              readyState === ReadyState.UNINSTANTIATED
            }
          >
            Close Connection
          </Button>
        </Stack>
      </Paper>

      <Paper elevation={10} className={styles.monitor__data_container}>
        {
          readyState === ReadyState.OPEN
            ? <pre>{JSON.stringify(data, null, 4)}</pre>
            : <span>No data arrived yet...</span>
        }
      </Paper>
    </div>
  )
}

export default Monitor