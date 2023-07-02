import { model } from "mongoose";
import {projectSchema} from './schemas';

const Project = model('project', projectSchema);

export default Project;