const router =
require("express").Router();

const Message =
require("../models/Message");

const authMiddleware =
require("../middleware/authMiddleware");


// =====================================
// SEND MESSAGE
// =====================================
router.post(
    "/send",

    authMiddleware,

    async (req, res) => {

        try {

            const {
                receiver,
                text
            } = req.body;

            const message =
            new Message({

                sender:
                req.user.id,

                receiver,

                text

            });

            await message.save();

            res.status(201).json({
                message:
                "Message sent",
                data: message
            });

        } catch (error) {

            res.status(500).json({
                message:
                error.message
            });

        }

    }
);


// =====================================
// GET CONVERSATION
// =====================================
router.get(
    "/:receiverId",

    authMiddleware,

    async (req, res) => {

        try {

            const messages =
            await Message.find({

                $or: [

                    {
                        sender:
                        req.user.id,

                        receiver:
                        req.params.receiverId
                    },

                    {
                        sender:
                        req.params.receiverId,

                        receiver:
                        req.user.id
                    }

                ]

            })

            .sort({
                createdAt: 1
            });

            res.status(200).json(
                messages
            );

        } catch (error) {

            res.status(500).json({
                message:
                error.message
            });

        }

    }
);

module.exports = router;