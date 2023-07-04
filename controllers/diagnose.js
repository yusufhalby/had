const diagnose = require('../models/diagnose');
const Diagnose = require('../models/diagnose');

exports.putDiagnose = (req, res, next) => {
    const {userId, diagnose} = req.body;
    let newDiagnose;
    Diagnose.findOne({userId})
    .then(diagnoseLog => {
        if(!diagnoseLog){
            newDiagnose = new Diagnose({
                userId,
                diagnose
            });
            return newDiagnose.save();
        }
    diagnoseLog.diagnose = diagnose;
    diagnoseLog.markModified('diagnose');
    return diagnoseLog.save();
    })
    .then(result=>{
        res.status(201).json({
            message: 'Updated successfully',
            diagnose: result
        });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};


exports.getDiagnose = (req, res, next) => {
    const userId= req.params.userId;
    console.log(userId);
    Diagnose.find({userId})
    .then(diagnose => {
        if(!diagnose){
            const error = new Error('Could not find diagnose.');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({message: 'diagnose fetched.', diagnose});
    })
    .catch(err=>{
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};