import api from '../../network/api';
import { Message } from './Message.types';


export const sendMessage = async (receiverId: string, content: string, productId: string) => {
    const response = await api.post('/messages', { receiverId, content, productId });
    return response.data;
  };

export const getMessages = async () => {
  const response = await api.get('/messages');
  return response.data;
};


export const markAsRead = async (id: string): Promise<Message> => {
  const response = await api.put(`/messages/${id}/read`);
  return response.data;
};

export const deleteMessage = async (id: string): Promise<void> => {
  await api.delete(`/messages/${id}`);
};
