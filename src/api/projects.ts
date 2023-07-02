import { Router } from "express";
import {filesUploadHandler} from '@/middleware';
import {createProject, deleteKnowledgeBase, deleteProject, editProjectMetadata, ingestKnowledgeBase} from '@/controllers/projects'

const router = Router();

router.get('/', (req, res) => {console.log(req.body); res.send('projects route alive')} );
router.post('/createProject', createProject);
router.post('/deleteProject', deleteProject);
router.post('/editProjectMetadata', editProjectMetadata);
router.post('/ingestKnowledgeBase', filesUploadHandler.array('dataFiles'), ingestKnowledgeBase);
router.post('/deleteKnowledgeBase', deleteKnowledgeBase);

export default router;