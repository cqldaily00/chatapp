require("../../db_connect/db");
const messagePersonsController = require("../models/messages_persons");
const contactUser = require("../models/contact");
var mongoose = require("mongoose");
const getMESSAGESPERSONS = async (req, res) => {
  try {
    const to_person = req.body.to_person;
    const from_person = req.body.from_person;

    const result = await messagePersonsController.aggregate([
      {
        $match: {
          $or: [
            {
              from_person: new mongoose.Types.ObjectId(to_person),
              to_person: new mongoose.Types.ObjectId(from_person),
            },
            {
              from_person: new mongoose.Types.ObjectId(from_person),
              to_person: new mongoose.Types.ObjectId(to_person),
            },
          ],
        },
      },
      {
        $lookup: {
          from: "contacts",
          localField: "from_person",
          foreignField: "_id",
          as: "sender",
        },
      },
      {
        $lookup: {
          from: "contacts",
          localField: "to_person",
          foreignField: "_id",
          as: "reciver",
        },
      },

      // {
      //   $addFields: {
      //     senderField: {
      //       $cond: [
      //         {
      //           $or: [
      //             {
      //               $eq: ['$from_person', new mongoose.Types.ObjectId(to_person)],
      //               $eq: ['$to_person', new mongoose.Types.ObjectId(from_person)]
      //             },
      //             {
      //               $eq: ['$from_person', new mongoose.Types.ObjectId(from_person)],
      //               $eq: ['$to_person', new mongoose.Types.ObjectId(to_person)]
      //             }
      //           ]
      //         },
      //         '$to_person',
      //         '$from_person'
      //       ]
      //     },
      //     receiverField: {
      //       $cond: [
      //         {
      //           $or: [
      //             {
      //               $eq: ['$from_person', new mongoose.Types.ObjectId(to_person)],
      //               $eq: ['$to_person', new mongoose.Types.ObjectId(from_person)]
      //             },
      //             {
      //               $eq: ['$from_person', new mongoose.Types.ObjectId(from_person)],
      //               $eq: ['$to_person', new mongoose.Types.ObjectId(to_person)]
      //             }
      //           ]
      //         },
      //         '$from_person',
      //         '$to_person'
      //       ]
      //     }
      //   }
      // },
      // {
      //   $lookup: {
      //     from: 'contacts',
      //     let: {
      //       senderId: { $toObjectId: '$senderField' },
      //       receiverId: { $toObjectId: '$receiverField' }
      //     },
      //     pipeline: [
      //       {
      //         $match: {
      //           $expr: {
      //             $or: [
      //               { $eq: ['$_id', '$$senderId'] },
      //               { $eq: ['$_id', '$$receiverId'] }
      //             ]
      //           }
      //         }
      //       },
      //       {
      //         $project: {
      //           _id: 1,
      //           name: 1,
      //           contact: 1,
      //           joined_date: 1,
      //           account_status: 1,
      //           createdAt: 1,
      //           updatedAt: 1,
      //           __v: 1
      //         }
      //       }
      //     ],
      //     as: 'receiver'
      //   }
      // }
    ]);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getMessageShow = async (req, res) => {
  const id = req.body._id; // Assuming the request body contains a single ID
  const ids = Array.isArray(id) ? id : [id];
  const objectIds = ids.map((id) => new mongoose.Types.ObjectId(id));

  await messagePersonsController
    .find({ from_person: { $in: objectIds } })
    .then((msg) => {
      return res.status(200).json(msg);
    })
    .catch((error) => {
      return res.status(200).json(error);
    });

  // try {

  //   // const ids = [id];
  //   console.log(id);
  //   const objectIds = ids.map(id => mongoose.Types.ObjectId(id));

  //   console.log(result);
  //   // const result = await messagePersonsController.find({ to_person: { $in: objectIds } });

  //   return res.status(200).json(result);
  // } catch (error) {
  //   return res.status(500).json(error);
  // }
};
const postMessagePersonsController = async (req, res) => {
  try {
    const checkContact = await contactUser.find({ _id: req.body.from_person });
    if (checkContact.length <= 0) {
      // return res.status(500).json(checkContact);
      return res.status(404).json({ contact: "this contact number NOT exits" });
    }

    await new messagePersonsController(req.body)
      .save()
      .then((success) => {
        return res.status(200).json(success);
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const updateMessageShow = async (req, res) => {
  // const from_person =req.body.from_person;
  // console.log(from_person);
  // try {
  //   const res = await messagePersonsController.
  //   updateOne( { from_person:new mongoose.Types.ObjectId(from_person)  }, { $set: { text_status: "show" } } )
  //   return res.status(5200).json(res);
  // } catch (error) {
  //   return res.status(500).json(error);
  // }

  const { from_person } = req.body;
  const { to_person } = req.body;

  try {
    const result = await messagePersonsController.aggregate([
      {
        $match: {
          $or: [
            {
              from_person: new mongoose.Types.ObjectId(to_person),
              to_person: new mongoose.Types.ObjectId(from_person),
            },
            {
              from_person: new mongoose.Types.ObjectId(from_person),
              to_person: new mongoose.Types.ObjectId(to_person),
            },
          ],
        },
      },
    ]);
    if (result.length > 0) {
      const updateResult = await messagePersonsController.updateMany(
        { to_person: new mongoose.Types.ObjectId(from_person) },
        { $set: { text_status: "show" } }
      );
      return res.status(200).json(updateResult);
    }

    
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

module.exports = {
  postMessagePersonsController,
  getMESSAGESPERSONS,
  getMessageShow,
  updateMessageShow,
};

// const result = await messagePersonsController.aggregate([
//   {
//     $match: {
//         from_person: new mongoose.Types.ObjectId(from_person),
//         to_person: new mongoose.Types.ObjectId(to_person)
//     }
//   },
//   {
//     $lookup: {
//       from: 'contacts',
//       localField: 'from_person',
//       foreignField: '_id',
//       as: 'from_person_info'
//     }
//   },
//   {
//     $lookup: {
//       from: 'contacts',
//       localField: 'to_person',
//       foreignField: '_id',
//       as: 'to_person_info'
//     }
//   }
// ]);

// const result = await messagePersonsController.aggregate([
//   {
//     $match: {
//       $or: [
//         {
//           from_person: new mongoose.Types.ObjectId(to_person),
//           to_person: new mongoose.Types.ObjectId(from_person)
//         },
//         {
//           from_person: new mongoose.Types.ObjectId(from_person),
//           to_person: new mongoose.Types.ObjectId(to_person)
//         }
//       ]
//     }
//   },
//   {
//     $addFields: {
//       senderField: {
//         $cond: [
//           {
//             $or: [
//               {
//                 $eq: ['$from_person', new mongoose.Types.ObjectId(to_person)],
//                 $eq: ['$to_person', new mongoose.Types.ObjectId(from_person)]
//               },
//               {
//                 $eq: ['$from_person', new mongoose.Types.ObjectId(from_person)],
//                 $eq: ['$to_person', new mongoose.Types.ObjectId(to_person)]
//               }
//             ]
//           },
//           '$to_person',
//           '$from_person'
//         ]
//       },
//       receiverField: {
//         $cond: [
//           {
//             $or: [
//               {
//                 $eq: ['$from_person', new mongoose.Types.ObjectId(to_person)],
//                 $eq: ['$to_person', new mongoose.Types.ObjectId(from_person)]
//               },
//               {
//                 $eq: ['$from_person', new mongoose.Types.ObjectId(from_person)],
//                 $eq: ['$to_person', new mongoose.Types.ObjectId(to_person)]
//               }
//             ]
//           },
//           '$from_person',
//           '$to_person'
//         ]
//       }
//     }
//   },
//   {
//     $lookup: {
//       from: 'contacts',
//       let: {
//         senderId: { $toObjectId: '$senderField' },
//         receiverId: { $toObjectId: '$receiverField' }
//       },
//       pipeline: [
//         {
//           $match: {
//             $expr: {
//               $or: [
//                 { $eq: ['$_id', '$$senderId'] },
//                 { $eq: ['$_id', '$$receiverId'] }
//               ]
//             }
//           }
//         },
//         {
//           $project: {
//             _id: 1,
//             name: 1,
//             contact: 1,
//             joined_date: 1,
//             account_status: 1,
//             createdAt: 1,
//             updatedAt: 1,
//             __v: 1
//           }
//         }
//       ],
//       as: 'receiver'
//     }
//   }
// ]);
