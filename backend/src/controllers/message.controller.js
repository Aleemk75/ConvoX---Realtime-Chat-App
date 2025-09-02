import User from "../models/user.model.js"
import Message from "../models/message.model.js"
import cloudinary from "../lib/cloudinary.js"
import { getReceiverSocketId, io } from "../lib/socket.js";
export async function getUsers(req, res) {
    try {
        //all users except current user 
        const filteredUsers = await User.find({ _id: { $ne: req.user._id } }).select("-password");
        res.status(200).json(filteredUsers);

    } catch (error) {
        console.log("error in getUsers controller:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function getMessages(req, res) {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user._id;

        const allMessages = await Message.find({
            $or: [
                { sender: myId, receiver: userToChatId },
                { sender: userToChatId, receiver: myId }
            ]
        }).sort({ createdAt: 1 }); // sort by time (oldest → newest)

        res.status(200).json(allMessages);
    } catch (error) {
        console.log("error in getMessages controller:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }

}

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if (image) {
            // Upload base64 image to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }
        const newMessage = new Message({
            text,
            sender: senderId,
            receiver: receiverId,
            image: imageUrl
        });

        await newMessage.save();

        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};