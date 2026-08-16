const express = require("express");

const router = express.Router();

const {
  createQueue,
  getQueues,
  getQueueById,
  updateQueue,
  deleteQueue,
  joinQueue,
   serveNextCustomer,
} = require("../controllers/queueController");

// Create Queue
router.post("/", createQueue);

// Get All Queues
router.get("/", getQueues);

// Get Queue By ID
router.get("/:id", getQueueById);

// Join Queue
router.post("/:id/join", joinQueue);

router.put("/:id/next", serveNextCustomer);

// Update Queue
router.put("/:id", updateQueue);

// Delete Queue
router.delete("/:id", deleteQueue);
console.log("✅ Queue routes loaded - joinQueue route registered");
module.exports = router;