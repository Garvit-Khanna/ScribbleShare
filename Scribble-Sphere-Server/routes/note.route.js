import express from "express";
import passport from "passport";

const router=express.Router();

//All request send updated notes as response
//get all notes
router.get("/all",passport.authenticate('jwt',{session:false}), (req,res)=>{
    try{
        const notes=req.user.notes;
        res.status(200).json(notes);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error."});
    }
});

//add notes
router.post("/add",passport.authenticate('jwt',{session:false}),async (req,res)=>{
    const noteData=req.body;
    try{
        const user=req.user;
        user.notes.push(noteData);
        await user.save();
        res.status(200).json(user.notes);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error."});
    }
});

//update note
router.put("/update/:id",passport.authenticate('jwt',{session:false}),async(req,res)=>{
    const noteId=req.params.id;
    const noteData=req.body;
    try{
        const user=req.user;
        const note=user.notes.id(noteId);
        note.set(noteData);
        await user.save();
        res.status(200).json(user.notes);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error."});
    }
});

//delete note
router.delete("/delete/:id",passport.authenticate('jwt',{session:false}),async(req,res)=>{
    const noteId=req.params.id;
    try{
        const user=req.user;
        const note=user.notes.remove(noteId);
        await user.save();
        res.status(200).json(user.notes);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error."});
    }
});

export default router;