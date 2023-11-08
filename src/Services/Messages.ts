import MessageModel from "../Models/MessageModel";
import { setMessages, updateMessage } from "../Redux/Reducers/messages.slice";
import store from "../Redux/Store";
import globals from "./Globals";
import jwtAxios from "./JwtAxios";
import notify from "./Notify";

class MessagesService{



public async getMessages():Promise<MessageModel[]>{
    try {
        if (store.getState().messagesState.messages.length>0) {
            return store.getState().messagesState.messages;
        }
        const response = await jwtAxios.get<MessageModel[]>(globals.messagesUrl);
        store.dispatch(setMessages(response.data));
        return response.data;
    }
    catch (err) {
        notify.error(err);
        return [];
    }
}
public async updateMessage(message:MessageModel):Promise<MessageModel>{
    try {
        const formData = MessageModel.convertToFormData(message);
        const response = await jwtAxios.post<MessageModel>(globals.messagesUrl,formData);
        store.dispatch(updateMessage(response.data));
        notify.custom('עודכן בהצלחה');
        return response.data;
    }
    catch (err) {
        notify.error(err);
    }
}


}
const messagesService = new MessagesService();
export default messagesService;