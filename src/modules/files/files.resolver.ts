import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { File } from './entities/file.entity';
import { FilesService } from './files.service';

@Resolver()
export class FilesResolver {
  constructor(private readonly fileService: FilesService) {}

  @Mutation(() => File)
  uploadFile(
    @Args({ name: 'file', type: () => GraphQLUpload })
    file: FileUpload,
  ) {
    return this.fileService.uploadFile(file);
  }

  @Mutation(() => Boolean)
  deleteFile(@Args('id') id: string) {
    return this.fileService.deleteFile(id);
  }

  @Mutation(() => Boolean)
  testUploadQueue() {
    return this.fileService.testUploadFile();
  }
}
