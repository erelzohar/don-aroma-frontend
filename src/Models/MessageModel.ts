
class MessageModel {
    _id: string;
    type: string;
    message: string;



    public static convertToFormData(message: MessageModel): FormData {
        const formData = new FormData();
        if (message._id) formData.append("_id", message._id);
        formData.append("type", message.type);
        formData.append("message", message.message);

        return formData;
    }






}

export default MessageModel;