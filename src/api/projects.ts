import { Router } from "express";
import {filesUploadHandler} from '@/middleware';
import {createProject, deleteKnowledgeBase, deleteProject, editProjectSettings, ingestKnowledgeBase} from '@/controllers/projects'

const router = Router();

router.post('/createProject', createProject);
router.post('/deleteProject', deleteProject);
router.post('/editProjectSettings', editProjectSettings);
router.post('/ingestKnowledgeBase', filesUploadHandler.array('dataFiles'), ingestKnowledgeBase);
router.post('/deleteKnowledgeBase', deleteKnowledgeBase);

export default router;