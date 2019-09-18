const CONSTANTS = require("../constants");
const express = require("express");
const sampleData = require("../sampleData");

const router = express.Router();

const createRouter = db => {
  /**
   * COFFEESHOPS ENDPOINTS
   */

  // COFFEESHOPS GET Endpoints
  router.get(CONSTANTS.ENDPOINT.COFFEESHOPS, (req, res) => {
    let sql = `SELECT * FROM coffeeshop`;

    db.all(sql, [], (err, rows) => {
      if (err) {
        throw err;
      }
      rows.forEach(row => {
        console.log(row.coffeeshop_name);
      });
      return res.json(rows);
    });
  });

  router.get(CONSTANTS.ENDPOINT.COFFEESHOPS + `/:id`, (req, res) => {
    let id = req.params.id;
    let sql = `SELECT coffeeshop_name FROM coffeeshop WHERE id = ?`;

    db.all(sql, [id], (err, rows) => {
      if (err) {
        throw err;
      }
      rows.forEach(row => {
        console.log(row.coffeeshop_name);
      });
      return res.json(rows);
    });
  });

  // COFFEESHOPS POST Endpoint
  router.post(CONSTANTS.ENDPOINT.COFFEESHOPS, function(req, res) {
    let sql = `INSERT INTO coffeeshop(coffeeshop_name) VALUES(?)`;
    db.run(sql, [req.body.coffeeshop_name], function(err) {
      if (err) {
        return console.log(err.message);
      }
      // get the last insert id
      console.log(`A row has been inserted with rowid ${this.lastID}`);
      return res.json({ ok: true });
    });
  });

  /**
   * DRINKS ENDPOINTS
   */

  // DRINKS GET Endpoint
  router.get(CONSTANTS.ENDPOINT.GRID, (req, res) => {
    res.json(sampleData.textAssets);
  });

  /**
   * LIST ENDPOINTS
   */

  // LIST GET Endpoint
  router.get(CONSTANTS.ENDPOINT.LIST, function(req, res) {
    res.json(sampleData.listTextAssets);
  });

  // LIST POST Endpoint
  router.post(CONSTANTS.ENDPOINT.LIST, function(req, res) {
    let listItem = {
      text: req.body.text,
      _id: sampleData.listID
    };
    sampleData.listTextAssets.unshift(listItem);
    res.json(listItem);
    sampleData.listID++;
  });

  // LIST DELETE Endpoint
  router.delete(CONSTANTS.ENDPOINT.LIST + "/:_id", function(req, res) {
    const { _id } = req.params;
    var index = sampleData.listTextAssets.findIndex(
      listItem => listItem._id === Number(_id)
    );
    if (index > -1) {
      sampleData.listTextAssets.splice(index, 1);
      res.json({ _id: Number(_id), text: "This commented was deleted" });
    } else {
      res.status(404).send("Could not find item with id:" + _id);
    }
  });

  /**
   * ORDER ENDPOINTS
   */

  // ORDER GET Endpoint
  router.get(CONSTANTS.ENDPOINT.ORDER + `/:id`, function(req, res) {
    let id = req.params.id;
    let sql = `SELECT * FROM [order] WHERE coffeeshop_id = ? ORDER BY pickup_time ASC`;

    db.all(sql, [id], (err, rows) => {
      if (err) {
        throw err;
      }
      rows.forEach(row => {
        console.log(row.pickup_time);
      });
      return res.json(rows);
    });
  });

  // ORDER POST Endpoint
  router.post(CONSTANTS.ENDPOINT.ORDER, function(req, res) {
    let sql = `INSERT INTO [order] (customer, coffeeshop_id, pickup_time, drinks) VALUES(?, ?, ?, ?)`;
    db.run(
      sql,
      [
        req.body.customer,
        req.body.coffeeshop_id,
        req.body.pickup_time,
        req.body.drinks
      ],
      function(err) {
        if (err) {
          return console.log(err.message);
        }
        // get the last insert id
        console.log(`A row has been inserted with rowid ${this.lastID}`);
        return res.json({ ok: true });
      }
    );
  });

  /**
   * MASTERDETAIL ENDPOINTS
   */

  // MASTERDETAIL DELETE Endpoint
  router.get(CONSTANTS.ENDPOINT.MASTERDETAIL, (req, res) => {
    res.json(sampleData.textAssets);
  });

  return router;
};

module.exports = createRouter;
