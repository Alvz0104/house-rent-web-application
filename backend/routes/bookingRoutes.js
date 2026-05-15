const router = require("express").Router();

const Booking = require("../models/Booking");

const Property = require("../models/Property");

const authMiddleware = require(
    "../middleware/authMiddleware"
);


// =====================================================
// CREATE BOOKING
// =====================================================
router.post(
    "/:propertyId",
    authMiddleware,
    async (req, res) => {

        try {

            const property =
            await Property.findById(
                req.params.propertyId
            );

            if (!property) {

                return res.status(404).json({
                    message: "Property not found"
                });

            }

            const booking = new Booking({

                property: property._id,

                tenant: req.user.id,

                owner: property.owner

            });

            await booking.save();

            res.status(201).json({
                message: "Booking request sent",
                booking
            });

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }

    }
);


// =====================================================
// TENANT BOOKINGS
// =====================================================
router.get(
    "/tenant/my-bookings",
    authMiddleware,
    async (req, res) => {

        try {

            const bookings =
            await Booking.find({
                tenant: req.user.id
            })

            .populate("property")

            .populate("owner", "name email");

            res.status(200).json(bookings);

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }

    }
);


// =====================================================
// OWNER BOOKINGS
// =====================================================
router.get(
    "/owner/bookings",
    authMiddleware,
    async (req, res) => {

        try {

            const bookings =
            await Booking.find({
                owner: req.user.id
            })

            .populate("property")

            .populate("tenant", "name email");

            res.status(200).json(bookings);

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }

    }
);


// =====================================================
// UPDATE BOOKING STATUS
// =====================================================
router.put(
    "/status/:bookingId",
    authMiddleware,
    async (req, res) => {

        try {

            const booking =
            await Booking.findById(
                req.params.bookingId
            );

            if (!booking) {

                return res.status(404).json({
                    message: "Booking not found"
                });

            }

            if (
                booking.owner.toString()
                !== req.user.id
            ) {

                return res.status(403).json({
                    message: "Access denied"
                });

            }

            booking.status = req.body.status;

            await booking.save();

            res.status(200).json({
                message:
                "Booking updated successfully",
                booking
            });

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }

    }
);

module.exports = router;