const Project = require("../models/project")
const Request = require("../models/request")

exports.projectsave = async(req,res,next) => {
    try{
      const userid = req.user.profid
      const { name, desc, tags, professorid } = req.body
      const newProject = new Project({ projectname:name, description: desc, tags:tags, profid:userid });
      if(req.body.studentid){
        const id = req.body.studentid
        console.log(id);
        newProject.studentid = id
      };

      await newProject.save();
      res.json({
        data: newProject
      })
    }catch(err){
      next(err)
    }
   }

   exports.getprojects = async (req, res, next) => {
     const projects = await Project.find({});
     console.log(projects);
    res.status(200).json({
     data: projects
    });
   }

   exports.projectupdate = async (req, res, next) => {
    try {
     const update = req.body
     const pupdatetId = req.params.projectid;
     await Project.findByIdAndUpdate(pupdatetId, update);
     const user = await Project.findById(pupdatetId)
     res.status(200).json({
      data: user,
      message: 'Project has been updated'
     });
    } catch (error) {
     next(error)
    }
   }

   exports.projectdelete = async (req, res, next) => {
    try {
     const pdeleteId = req.params.projectid;
     await Project.findByIdAndDelete(pdeleteId);
     res.status(200).json({
      data: null,
      message: 'Project has been deleted'
     });
    } catch (error) {
     next(error)
    }
   }
   
   exports.sendrequest = async(req, res,next)=>{
    try{

      // const {senderid, recipientid} = req.body
      const senderid = req.user._id;
      const recipientid = profid;
      const projid = projectid;

      const request = new Request({
        sender: senderid,
        recipient: recipientid,
        project: projid,
        status: 'pending', 
      });

      await request.save();
      res.json({
        data:request
      })
    }catch(err){
      next(err)
    }
   }

  //  exports.updaterequest = async (req,res) =>{
  //   try{
  //     const response = req.body
  //     if(response == 'approved'){
  //       Request.findByIdAndUpdate({})
  //     }

  //   }catch(err){
  //     next(err)
  //   }
  //  }

   exports.getrequests = async (req,res,next) =>{
    try{
        const userdata = req.user 
        // console.log(userdata);

        if(userdata.role == 'basic'){
           var data =  await Request.find({sender:userdata._id})
        }
        else if(userdata.role == 'supervisor'){
           var data =  await Request.find({recipient:userdata._id})
        }
        
        res.json({
             data
        })

    }catch(err){
        next(err)
    }
   }

   