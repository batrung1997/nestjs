import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { createWriteStream } from 'fs';
import { FileUpload } from 'graphql-upload';
import * as moment from 'moment';
import { Model } from 'mongoose';
import * as path from 'path';
import { v4 } from 'uuid';
import { QueuesService } from '../queues/queues.service';
import { File, FileDocument } from './entities/file.entity';
import { UploadFileRes } from './types';

@Injectable()
export class FilesService {
  constructor(
    @InjectModel(File.name)
    private fileModel: Model<FileDocument>,
    private queueService: QueuesService,
  ) {}

  async uploadFile(file: FileUpload): Promise<File> {
    const saveFile = await this.saveFileToFolder(file);
    if (!saveFile) {
      throw new BadRequestException();
    }
    const createFileDocument = await this.fileModel.create({
      url: saveFile.path,
      name: saveFile.filename,
      mimetype: saveFile.mimetype,
      createdAt: moment().utc().valueOf(),
    });
    if (!createFileDocument) {
      throw new BadRequestException();
    }
    return createFileDocument;
  }

  async saveFileToFolder(file: FileUpload): Promise<UploadFileRes> {
    const newFilename = v4();
    const uploadFolder = path.join('uploads');
    const pathToFile = path.join(
      uploadFolder,
      `${newFilename}-${file.filename}`,
    );
    const absolutePathToFile = path.join(process.cwd(), pathToFile);

    return new Promise((resolve, reject) =>
      file
        .createReadStream()
        .pipe(createWriteStream(absolutePathToFile))
        .on('finish', () =>
          resolve({
            absolutePathToFile,
            filename: file.filename,
            mimetype: file.mimetype,
            path: pathToFile,
          }),
        )
        .on('error', (error) => reject(error)),
    );
  }

  async deleteFile(id: string): Promise<boolean> {
    const action = await this.fileModel.deleteOne({
      _id: id,
    });
    if (action) {
      return true;
    }
    return false;
  }

  async testUploadFile() {
    const queueFile = await this.queueService.testQueueFile();
    console.log('queueFile', queueFile);
    return true;
  }
}
