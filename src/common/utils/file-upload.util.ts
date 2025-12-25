import * as fs from 'fs/promises';
import * as path from 'path';
import { v4 as uuid } from 'uuid';

export interface UploadResult {
  fileName: string;
  url: string;
}

export async function saveFile(
  file: Express.Multer.File,
  baseUrl: string,
  folder = 'uploads',
): Promise<UploadResult> {
  const uploadsDir = path.join(process.cwd(), folder);

  // Ensure directory exists
  await fs.mkdir(uploadsDir, { recursive: true });

  const ext = path.extname(file.originalname);
  const fileName = `${uuid()}${ext}`;
  const filePath = path.join(uploadsDir, fileName);

  // Write file asynchronously
  await fs.writeFile(filePath, file.buffer);

  return {
    fileName,
    url: `${baseUrl}/${folder}/${fileName}`,
  };
}
