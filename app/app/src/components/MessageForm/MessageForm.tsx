import { useState } from 'react'
import { sendMessage } from '../../core/modules/messages/Message.api'
import styles from './MessageForm.module.css'

interface MessageFormProps {
  sellerId: string
  productId: string
  onMessageSent: (message: string) => void
}

const MessageForm = ({
  sellerId,
  productId,
  onMessageSent,
}: MessageFormProps) => {
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await sendMessage(sellerId, message, productId)
      onMessageSent(message)
    } catch (error) {
      console.error('Failed to send message', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.messageForm}>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Write your message..."
        className={styles.textarea}
      />
      <button type="submit" className={styles.sendButton}>
        Send Message
      </button>
    </form>
  )
}

export default MessageForm
