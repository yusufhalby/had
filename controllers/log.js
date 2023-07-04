/**
 * log.js
 *
 * This file contains the controller functions for log-related operations.
 * It includes functions for fetching all logs, fetching user-specific logs, creating a new log.
 */

// Import required modules
const Log = require('../models/log');
const User = require('../models/user');


// Get all logs
exports.getAiLogs = (req, res, next) => {
    Log.find()
    .then(logs => {
        if(!logs){
            const error = new Error('Could not find logs.');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({message: 'logs fetched.', logs});
    })
    .catch(err=>{
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};

// Get user-specific logs
exports.getLogs = (req, res, next) => {
    const userId= req.params.userId;
    Log.find({userId})
    .then(logs => {
        if(!logs){
            const error = new Error('Could not find logs.');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({message: 'logs fetched.', logs});
    })
    .catch(err=>{
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};

// Create a new log
exports.postLog = (req, res, next) => {
    const { 
        userId,
        heartRate, 
        SystolicBloodPressure, 
        DiastolicBloodPressure,
        heartRateVariability, 
        saturationPerOxygen,
        temperature,
        respirationRate,
        faint,
        sleep
    } = req.body

    let age, sex, height, weight, geneticDiabetes, geneticHeartDiseases, HR, HRV, systolic_BP, diastolic_BP, RR, SpO2;
    let log;

    User
    .findById(userId)
    .then(user =>{
        if(!user){
            const error = new Error('User not found.');
            error.statusCode = 404;
            throw error;
        }
        age = user.age;
        if(user.sex == 'male'){sex = 1}else{sex=0};
        height = user.height*0.0328084;
        weight = user.weight;
        if(user.geneticDiabetes){geneticDiabetes=1}else{geneticDiabetes=0};
        if(user.geneticHeartDiseases){geneticHeartDiseases=1}else{geneticHeartDiseases=0};
        HR = heartRate;
        HRV = heartRateVariability;
        systolic_BP = SystolicBloodPressure;
        diastolic_BP = DiastolicBloodPressure;
        RR = respirationRate;
        SpO2 = saturationPerOxygen;
        log = new Log({
            userId,
            age, 
            sex, 
            height, 
            weight, 
            geneticDiabetes, 
            geneticHeartDiseases, 
            HR, 
            HRV, 
            systolic_BP, 
            diastolic_BP, 
            RR, 
            SpO2,
            temperature,
            faint,
            sleep,
        });
        return log.save()
    })
    .then(result =>{
        res.status(201).json({
            message: 'created successfully',
            log
        });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};





