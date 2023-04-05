import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { offerDto } from './dto';
import { OfferService } from './offer.service';
import { JwtAuthGuard } from '../auth/guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { imageUploadFileFilter } from '../imageUpload';

@Controller('offer')
export class OfferController {
  constructor(private offerService: OfferService) {}

  @Get()
  getOffers() {
    return this.offerService.getOffers();
  }

  @Get(':id')
  getOffer(@Param('id') id: string) {
    return this.offerService.getOffer(id);
  }

  @Get('supplier/:id')
  getOffersBySupplier(@Param('id') id: string) {
    return this.offerService.getOffersBySupplier(id);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FilesInterceptor('image', 4, {
      fileFilter: imageUploadFileFilter,
      limits: {
        fileSize: 2 * 1024 * 1024, // 2 MB in bytes
      },
    }),
  )
  @Post('create')
  async createOffer(
    @GetUser() user: any,
    @Body() dto: offerDto,
    @UploadedFiles()
    files: Express.Multer.File[],
  ) {
    return this.offerService.createOffer(dto, user, files);
  }
}
