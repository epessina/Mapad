"use strict";

const express  = require("express"),
      { body } = require("express-validator/check");

const defibrillatorController = require("../controllers/defibrillator"),
      isAuth                  = require("../middleware/is-auth");

const router = express.Router();

const validLocationCategories = ["commercialActivity", "residentialBuilding", "publicPlace", "sportsCentre",
    "transportStation", "educationalEstablishment", "schoolGym", "drugstore", "street", "medicalPracticeClinic",
    "churchOratorio", "shelter", "nursingHomeHospice", "other"];
const validTransportTypes     = ["", "metro", "airport", "trainStation", "busStation", "other"];
const validPresence           = ["yes", "no"];
const validTempAccessibility  = ["h24", "partTime", "notSpecified"];
const validRecovery           = ["", "immediate", "fast", "average", "slow", "verySlow"];
const validSignage            = ["", "great", "visible", "hardToSee", "absent"];

const postValidation = [
    body("coordinates")
        .not().isEmpty().withMessage("You must specify the coordinates of the defibrillator"),
    body("presence")
        .not().isEmpty().withMessage("You must specify if the defibrillator is present.")
        .isIn(validPresence).withMessage("Invalid presence value."),
    body("locationCategory")
        .not().isEmpty().withMessage("You must specify the location category.")
        .isIn(validLocationCategories).withMessage("Invalid location category value."),
    body("transportType")
        .isIn(validTransportTypes).withMessage("Invalid transport type value."),
    body("visualReference")
        .trim()
        .escape(),
    body("floor")
        .not().isEmpty().withMessage("You must specify the floor.")
        .isInt({ gt: -5, lt: 11 }).withMessage("Invalid floor value."),
    body("temporalAccessibility")
        .not().isEmpty().withMessage("You must specify the temporal accessibility.")
        .isIn(validTempAccessibility).withMessage("Invalid temporal accessibility value."),
    body("recovery")
        .isIn(validRecovery).withMessage("Invalid recovery value."),
    body("signage")
        .isIn(validSignage).withMessage("Invalid signage value."),
    body("brand")
        .trim()
        .escape(),
    body("notes")
        .trim()
        .escape()
];

const putValidation = [
    body("presence")
        .not().isEmpty().withMessage("You must specify if the defibrillator is present.")
        .isIn(validPresence).withMessage("Invalid presence value."),
    body("locationCategory")
        .not().isEmpty().withMessage("You must specify the location category.")
        .isIn(validLocationCategories).withMessage("Invalid location category value."),
    body("transportType")
        .isIn(validTransportTypes).withMessage("Invalid transport type value."),
    body("visualReference")
        .trim()
        .escape(),
    body("floor")
        .not().isEmpty().withMessage("You must specify the floor.")
        .isInt({ gt: -5, lt: 11 }).withMessage("Invalid floor value."),
    body("temporalAccessibility")
        .not().isEmpty().withMessage("You must specify the temporal accessibility.")
        .isIn(validTempAccessibility).withMessage("Invalid temporal accessibility value."),
    body("recovery")
        .isIn(validRecovery).withMessage("Invalid recovery value."),
    body("signage")
        .isIn(validSignage).withMessage("Invalid signage value."),
    body("brand")
        .trim()
        .escape(),
    body("notes")
        .trim()
        .escape()
];


// GET /defibrillator/get-all
router.get("/get-all", isAuth, defibrillatorController.getDefibrillators);

// GET /defibrillator/:defibrillatorId
router.get("/:defibrillatorId", isAuth, defibrillatorController.getDefibrillator);

// POST /defibrillator/post
router.post("/post", isAuth, postValidation, defibrillatorController.postDefibrillator);

// PUT /defibrillator/:defibrillatorId
router.put("/:defibrillatorId", isAuth, putValidation, defibrillatorController.updateDefibrillator);

// DELETE /defibrillator/:defibrillatorId
router.delete("/:defibrillatorId", isAuth, defibrillatorController.deleteDefibrillator);


module.exports = router;