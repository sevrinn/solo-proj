//import model
const Band = require("../models/band.model");

//get All Bands
module.exports.getAll = (req, res) => {
  console.log("inside of getAll");
  Band.find()
    .then((allBands) => {
      console.log(allBands);
      res.json(allBands);
    })
    .catch((err) => {
      console.log("There's been a problem finding all bands!", err);
      res.json(err);
    });
};
//create bands
module.exports.create = (req, res) => {
  console.log("inside of create");
  console.log(req.body);
  Band.create(req.body)
    .then((newBand) => {
      console.log(newBand);
      res.json(newBand);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};

//get one band
module.exports.getOne = (req, res) => {
  Band.findById(req.params.id)
    .then((oneBand) => {
      console.log(oneBand);
      res.json(oneBand);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};

//update
module.exports.update = (req, res) => {
  Band.findByIdAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  })
    .then((updatedBand) => {
      console.log(updatedBand);
      res.json(updatedBand);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};

//delete
module.exports.delete = (req, res) => {
  Band.findByIdAndDelete(req.params.id)
    .then((deletedBand) => {
      console.log(deletedBand);
      res.json(deletedBand);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};
