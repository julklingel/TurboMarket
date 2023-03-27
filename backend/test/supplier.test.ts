import { INestApplication } from '@nestjs/common';
import * as pactum from 'pactum';
import { PrismaService } from '../src/db-module/prisma.service';
import { supplierDto } from '../src/supplier/dto';
import { addressDto } from '../src/address';

export const supplierTests = (app: INestApplication, prisma: PrismaService) => {
  describe('Supplier', () => {
    const supplierdto: supplierDto = {
      companyName: 'jackfruit garden',
      companyLogo: 'jackfruit.png',
      companyPhone: '+491876543',
      supplierImages: ['jackfruit1.png', 'jackfruit2.png'],
      companyBio: 'jack loves fruit',
      featured: false,
    };
    const addressdto: addressDto = {
      streetAddress: 'bergweg 1',
      city: 'jacksonville',
      state: 'jackson',
      country: 'jackland',
      zip: '7474',
    };
    describe('create supplier', () => {
      it('should throw if account is not a supplier', () => {
        return pactum
          .spec()
          .post('/supplier/create')
          .withHeaders({
            Authorization: 'Bearer $S{userToken}',
          })
          .withBody({
            ...supplierdto,
            ...addressdto,
          })
          .expectJson({
            message: 'You are not authorized to create a supplier account',
            statusCode: 400,
          });
      });

      it('should throw if company name is empty', () => {
        return pactum
          .spec()
          .post('/supplier/create')
          .withHeaders({
            Authorization: 'Bearer $S{supplierToken}',
          })
          .withBody({
            companyName: '',
            companyLogo: supplierdto.companyLogo,
            companyPhone: supplierdto.companyPhone,
            companyImage: supplierdto.supplierImages,
            companyBio: supplierdto.companyBio,
            featured: supplierdto.featured,
            ...addressdto,
          })
          .expectJson({
            error: 'Bad Request',
            message: ['companyName should not be empty'],
            statusCode: 400,
          });
      });

      it('should create a new supplier', () => {
        return pactum
          .spec()
          .post('/supplier/create')
          .withHeaders({
            Authorization: 'Bearer $S{supplierToken}',
          })
          .withBody({
            ...supplierdto,
            ...addressdto,
          })
          .expectStatus(201);
      });

      it('should throw if account already has a supplier', () => {
        return pactum
          .spec()
          .post('/supplier/create')
          .withHeaders({
            Authorization: 'Bearer $S{supplierToken}',
          })
          .withBody({
            companyName: 'garden of jackfruit 2',
            companyLogo: supplierdto.companyLogo,
            companyPhone: supplierdto.companyPhone,
            companyImage: supplierdto.supplierImages,
            companyBio: supplierdto.companyBio,
            featured: supplierdto.featured,
            ...addressdto,
          })
          .expectStatus(400);
      });

      it('should throw if company name is already taken', () => {
        return pactum
          .spec()
          .post('/supplier/create')
          .withHeaders({
            Authorization: 'Bearer $S{supplierToken_two}',
          })
          .withBody({
            companyName: 'jackfruit garden',
            companyLogo: supplierdto.companyLogo,
            companyPhone: supplierdto.companyPhone,
            companyImage: supplierdto.supplierImages,
            companyBio: supplierdto.companyBio,
            featured: supplierdto.featured,
            ...addressdto,
          })
          .expectStatus(400);
      });
    });
  });
};
