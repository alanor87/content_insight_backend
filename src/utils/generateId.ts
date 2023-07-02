import { createHash } from 'node:crypto';
const generateId = (input: string) => createHash('md5').update(input).digest('hex');

export default generateId;
