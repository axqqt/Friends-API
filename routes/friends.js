const express = require("express");
const router = express.Router();
const data ={ };
data.users = require("../data/friends");


router.route("/").get((req,res)=>{
    res.json({"Message":"Enter id 1-5 (http://localhost:8000/friends/id) to get details about each of my friends"});
});

router.route("/:id").post(async (req, res) => {
    const { id } = req.params;
  
    if (!id) {
      return res.status(400).json({ Alert: "No ID was found" });
    } else {
      try {
        const parsedId = JSON.parse(id);
  
        if (!parsedId) {
          return res.status(400).json({ Alert: `ID ${id} doesn't match records` });
        }
  
        const finale = data.users.find((friend) => friend.id === parsedId);
  
        if (!finale) {
          return res.status(404).json({ Alert: `Friend with ID ${parsedId} not found` });
        } else {
          return res.status(200).json({ finale });
        }
      } catch (error) {
        return res.status(500).json({ Alert: "Internal Server Error" });
      }
    }
  });
  

module.exports = router;