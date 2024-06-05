import { useEffect, useState } from 'react'
import {
  getMessages,
  sendMessage,
} from '../../core/modules/messages/Message.api'
import { Message } from '../../core/modules/messages/Message.types'
import style from './Messages.module.css'
import { useAuth } from '../../contexts/AuthContext'

const Messages = () => {
  const { user } = useAuth()
  const [groupedMessages, setGroupedMessages] = useState<{
    [key: string]: Message[]
  }>({})
  const [selectedChat, setSelectedChat] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState<string>('')

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const messagesData: Message[] = await getMessages()

        const grouped = messagesData.reduce(
          (acc: { [key: string]: Message[] }, message: Message) => {
            const otherUserId =
              message.receiver._id === user?._id
                ? message.sender._id
                : message.receiver._id
            if (!acc[otherUserId]) {
              acc[otherUserId] = []
            }
            acc[otherUserId].push(message)
            return acc
          },
          {},
        )
        setGroupedMessages(grouped)
      } catch (error) {
        console.error('Failed to fetch messages', error)
      }
    }

    fetchMessages()
  }, [user?._id])

  const handleChatSelect = (otherUserId: string) => {
    setSelectedChat(otherUserId)
  }

  const handleSendMessage = async () => {
    if (newMessage.trim() === '' || !selectedChat) return

    try {
      const receiverId = selectedChat
      const productId = groupedMessages[selectedChat]?.[0]?.productId?._id
      await sendMessage(receiverId, newMessage, productId ?? '') // here we provide an empty string if productId is undefined
      const updatedMessages: Message[] = await getMessages()

      const grouped = updatedMessages.reduce(
        (acc: { [key: string]: Message[] }, message: Message) => {
          const otherUserId =
            message.receiver._id === user?._id
              ? message.sender._id
              : message.receiver._id
          if (!acc[otherUserId]) {
            acc[otherUserId] = []
          }
          acc[otherUserId].push(message)
          return acc
        },
        {},
      )
      setGroupedMessages(grouped)

      setNewMessage('')
    } catch (error) {
      console.error('Failed to send message', error)
    }
  }

  return (
    <div>
      <h1>Chat</h1>
      <div className={style.messagesContainer}>
        <div className={style.messageList}>
          {Object.entries(groupedMessages).map(([otherUserId, messages]) => (
            <div
              key={otherUserId}
              className={`${style.messageItem} ${
                selectedChat === otherUserId ? style.selected : ''
              }`}
              onClick={() => handleChatSelect(otherUserId)}>
              <p className={style.receiver}>
                {messages[0].receiver?._id === user?._id
                  ? messages[0].sender?.name
                  : messages[0].receiver?.name}
              </p>
              <p className={style.preview}>
                {messages[messages.length - 1]?.content.slice(0, 30)}...
              </p>
            </div>
          ))}
        </div>
        <div className={style.chatWindow}>
          {selectedChat ? (
            <>
              <div className={style.chatHeader}>
                <p>
                  {groupedMessages[selectedChat]?.[0]?.receiver?._id ===
                  user?._id
                    ? groupedMessages[selectedChat]?.[0]?.sender?.name
                    : groupedMessages[selectedChat]?.[0]?.receiver?.name}
                </p>
              </div>
              <div className={style.chatBody}>
                {groupedMessages[selectedChat].map((msg, index) => (
                  <div
                    key={index}
                    className={`${style.chatMessage} ${
                      msg.sender._id === user?._id ? style.sent : style.received
                    }`}>
                    <p className={style.senderName}>
                      {msg.sender._id === user?._id ? 'You' : msg.sender.name}
                    </p>
                    <p className={style.messageContent}>{msg.content}</p>
                    <span className={style.timestamp}>
                      {new Date(msg.createdAt).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
              <div className={style.chatFooter}>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                />
                <button onClick={handleSendMessage}>Send</button>
              </div>
            </>
          ) : (
            <p className={style.selectChatMessage}>
              Select a chat to view messages
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Messages
