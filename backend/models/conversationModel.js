import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
	{
		participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
		lastMessage: {
			text: String,
			sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
			// implementación de mensajes visibles
			seen: {
				type: Boolean,
				default: false,
			},
		},
	},
	{ timestamps: true }
);

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;