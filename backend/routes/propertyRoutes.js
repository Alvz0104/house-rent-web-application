const router =
require("express").Router();

const multer =
require("multer");

const Property =
require("../models/Property");

const authMiddleware =
require("../middleware/authMiddleware");

const roleMiddleware =
require("../middleware/roleMiddleware");


// =========================================
// MULTER STORAGE
// =========================================
const storage =
multer.diskStorage({

    destination: (
        req,
        file,
        cb
    ) => {

        cb(null, "uploads");

    },

    filename: (
        req,
        file,
        cb
    ) => {

        cb(

            null,

            Date.now()
            + "-"
            + file.originalname

        );

    }

});

const upload =
multer({
    storage
});


// =========================================
// ADD PROPERTY
// =========================================
router.post(

    "/add",

    authMiddleware,

    roleMiddleware(
        "owner",
        "admin"
    ),

    upload.single("image"),

    async (req, res) => {

        try {

            const {

                title,

                description,

                price,

                location,

                bedrooms,

                bathrooms,

                amenities

            } = req.body;

            const property =
            new Property({

                title,

                description,

                price,

                location,

                bedrooms,

                bathrooms,

                amenities:
                amenities.split(","),

                image:
                req.file.filename,

                owner:
                req.user.id

            });

            await property.save();

            res.status(201).json({

                message:
                "Property added successfully",

                property

            });

        } catch (error) {

            res.status(500).json({

                message:
                error.message

            });

        }

    }
);


// =========================================
// GET ALL PROPERTIES
// =========================================
router.get(
    "/",

    async (req, res) => {

        try {

            const properties =
            await Property.find();

            res.status(200).json(
                properties
            );

        } catch (error) {

            res.status(500).json({

                message:
                error.message

            });

        }

    }
);


// =========================================
// GET SINGLE PROPERTY
// =========================================
router.get(
    "/:id",

    async (req, res) => {

        try {

            const property =
            await Property.findById(
                req.params.id
            );

            if (!property) {

                return res.status(404).json({

                    message:
                    "Property not found"

                });

            }

            res.status(200).json(
                property
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