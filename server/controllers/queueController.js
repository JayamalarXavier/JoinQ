const Queue = require("../models/Queue");

// CREATE QUEUE
const createQueue = async (req, res) => {
  try {
    const queue = new Queue(req.body);

    await queue.save();

    res.status(201).json({
      success: true,
      message: "Queue created successfully",
      data: queue,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL QUEUES
const getQueues = async (req, res) => {
  try {
    const queues = await Queue.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: queues.length,
      data: queues,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET SINGLE QUEUE
const getQueueById = async (req, res) => {
  try {
    const queue = await Queue.findById(req.params.id);

    if (!queue) {
      return res.status(404).json({
        success: false,
        message: "Queue not found",
      });
    }

    res.status(200).json({
      success: true,
      data: queue,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE QUEUE
const updateQueue = async (req, res) => {
  try {
    const queue = await Queue.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!queue) {
      return res.status(404).json({
        success: false,
        message: "Queue not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Queue updated successfully",
      data: queue,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE QUEUE
const deleteQueue = async (req, res) => {
  try {
    const queue = await Queue.findByIdAndDelete(req.params.id);

    if (!queue) {
      return res.status(404).json({
        success: false,
        message: "Queue not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Queue deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// JOIN QUEUE
const joinQueue = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone } = req.body;

    const queue = await Queue.findById(id);

    if (!queue) {
      return res.status(404).json({
        success: false,
        message: "Queue not found",
      });
    }

    // Check queue status
    if (queue.status !== "Open") {
      return res.status(400).json({
        success: false,
        message: `Queue is currently ${queue.status.toLowerCase()}.`,
      });
    }

    // Check capacity
    if (queue.peopleWaiting >= queue.maxCapacity) {
      return res.status(400).json({
        success: false,
        message: "Queue is full.",
      });
    }

    // Generate next token
    const newToken = queue.currentToken + queue.peopleWaiting + 1;

    // Add one person to waiting count
    queue.peopleWaiting += 1;

    await queue.save();

    res.status(200).json({
      success: true,
      message: "Joined queue successfully",
      data: {
        queueId: queue._id,
        queueName: queue.queueName,
        token: newToken,
        currentToken: queue.currentToken,
        peopleWaiting: queue.peopleWaiting,
        name,
        phone,
      },
    });

  } catch (error) {
    console.error("Join Queue Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// SERVE NEXT CUSTOMER
const serveNextCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    const queue = await Queue.findById(id);

    if (!queue) {
      return res.status(404).json({
        success: false,
        message: "Queue not found",
      });
    }

    // No one is waiting
    if (queue.peopleWaiting <= 0) {
      return res.status(400).json({
        success: false,
        message: "No customers are waiting.",
      });
    }

    // Move to the next token
    queue.currentToken += 1;

    // One customer has been served
    queue.peopleWaiting -= 1;

    await queue.save();

    res.status(200).json({
      success: true,
      message: `Now serving token #${queue.currentToken}`,
      data: queue,
    });

  } catch (error) {
    console.error("Serve next customer error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createQueue,
  getQueues,
  getQueueById,
  updateQueue,
  deleteQueue,
  joinQueue,
   serveNextCustomer,
};