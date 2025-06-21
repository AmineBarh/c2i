const Message = require('../Models/messages');

exports.createMessage = async(req, res) =>{
    try {
        const newMessage = await Message.create(req.body);
        return res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error creating project:", e.message);
    }
}