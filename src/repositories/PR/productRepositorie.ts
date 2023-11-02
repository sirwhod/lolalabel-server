import { Products } from '@prisma/client';

import { InstructionRepository } from './instructionRepositorie';
import qrCode from 'qrcode';
import { Stamp } from '../../interfaces/PR/Product/IStamp';
import { User } from '../../interfaces/PR/Product/IUser';
import { Instruction } from '../../interfaces/PR/Product/IInstruction';
import { ProductsDisabled } from '../../interfaces/PR/Product/IProductDisabled';

import { getDateBrazil } from '../../utils/getDataBrazil';
import { prisma } from '../../database';
import { CopyManyInstructionService } from '../../service/PR/Instructions/copyManyInstructionService';
import { IProductRepository } from '../../interfaces/PR/IProductRepository';

type ResponseProduct = {
  id: string
  sku: string
  version: string
  productName: string
  productLine: string
  productImage: string
  composition: string
  Stamps: Stamp[]
  whoCreated: User
  Instructions: Instruction[]
  creationDate: Date
  isActive: boolean
  isValidated: boolean
  qrCodeIsActive: boolean
  ProductsDisabled: ProductsDisabled[]
}

class ProductRepositorie implements IProductRepository {

  public async create(
    idUser: string,
    sku: string,
    version: string,
    productName: string,
    productLine: string,
    productImage: string,
    composition: string,
    compositionINCI: string,
    Stamps: Stamp[]
  ): Promise<Products> {

    const date = getDateBrazil();

    const newProduct = await prisma.products.create({
      data: {
        sku: sku, 
        version: version,
        productName: productName, 
        productLine: productLine, 
        productImage: productImage,
        composition: composition,
        compositionINCI: compositionINCI,
        creationDate: date,
        whoCreated: {
          connect: {
            id: idUser
          }
        }
      }
    });
  
    const newStampsList = Stamps.map((stamp,) => ({
      ...stamp,
      productId: newProduct.id
    }));
  
  
    await prisma.stamps.createMany({
      data: newStampsList
    });

    return newProduct;
  }

  public async copy(
    iduser: string, 
    idProduct: string, 
    newVersion: string, 
    composition: string, 
    compositionINCI: string,
    copyInstruction: boolean
  ): Promise<ResponseProduct> {
    const date = getDateBrazil();

    const productCopied = await prisma.products.findUnique({
      where: {
        id: idProduct
      },
      include: {
        Stamps: true,
        Instructions: true
      }
    });

    if (productCopied !== null) {

      const newProduct = await prisma.products.create({
        data: {
          sku: productCopied.sku, 
          version: newVersion,
          productName: productCopied.productName, 
          productLine: productCopied.productLine, 
          productImage: productCopied.productImage,
          composition: composition,
          compositionINCI: compositionINCI,
          creationDate: date,
          whoCreated: {
            connect: {
              id: iduser
            }
          }
        }
      });
  
      const NewTreatedStampList = productCopied.Stamps.map((stamp,) => ({
        ...stamp,
        productId: newProduct.id
      }));
  
      const NewListStamp = NewTreatedStampList.map((stamp) => {
        const { id, ...rest } = stamp;
  
        return { ...rest };
      });

      await prisma.stamps.createMany({
        data: NewListStamp
      });

      if (copyInstruction) { 
        const copyInstruction = new CopyManyInstructionService(new InstructionRepository());

        await copyInstruction.execute(productCopied.id, newProduct.id);
      }

      const product = await prisma.products.findUnique({
        where: {
          id: newProduct.id
        },
        include: {
          Stamps: {
            select: {
              image: true,
              nameStamp: true,
              active: true
            }
          },
          whoCreated: {
            select: {
              id: true,
              name: true,
            }
          },
          Instructions: {
            select: {
              id: true,
              language: true,
              isActive: true,
              isValidated: true
            }
          },
          ProductsDisabled: true,
        }
      }); 

      return product;
    }
  }

  public async alter(idproduct: string, productImage: string, Stamps: Stamp[]): Promise<ResponseProduct> {
    const updateStamps = Stamps.map(async (stamp) => {
      await prisma.stamps.update({
        data: {
          active: stamp.active
        },
        where: {
          id: stamp.id
        }
      });
    });
  
    if (updateStamps) {
      const newProductImageAltered = await prisma.products.update({
        data: {
          productImage: productImage
        },
        where: {
          id: idproduct
        },
        include: {
          Instructions: {
            select: {
              id: true,
              language: true,
              isActive: true,
              isValidated: true
            }
          },
          whoCreated: {
            select: {
              id: true,
              name: true,
            }
          },
          Stamps: true
        }
      });
      
      const returnProductAltered = await prisma.products.findFirst({
        where: {
          id: newProductImageAltered.id
        },
        include: {
          Instructions: {
            select: {
              id: true,
              language: true,
              isActive: true,
              isValidated: true
            }
          },
          whoCreated: {
            select: {
              id: true,
              name: true,
            }
          },
          Stamps: true,
          ProductsDisabled: true,
        }
      });

      return returnProductAltered;
    }
  
  }

  public async registred(): Promise<ResponseProduct[]> {
    const product = await prisma.products.findMany({
      where: {
        isActive: true,
        isValidated: true,
      },
      include: {
        Stamps: {
          select: {
            id: true,
            image: true,
            nameStamp: true,
            active: true
          }
        },
        whoCreated: {
          select: {
            id: true,
            name: true,
          }
        },
        Instructions: {
          select: {
            id: true,
            language: true,
            isActive: true,
            isValidated: true
          }
        },
        ProductsDisabled: true,
      }
    }); 

    return product;
  }

  public async validation(): Promise<ResponseProduct[]> {
    const product = await prisma.products.findMany({
      where: {
        isActive: false,
        isValidated: false,
      },
      include: {
        Stamps: {
          select: {
            id: true,
            image: true,
            nameStamp: true,
            active: true
          }
        },
        whoCreated: {
          select: {
            id: true,
            name: true,
          }
        },
        Instructions: {
          select: {
            id: true,
            language: true,
            isActive: true,
            isValidated: true
          }
        },
        ProductsDisabled: true,
      }
    }); 

    return product;
  }

  public async history(): Promise<ResponseProduct[]> {
    const product = await prisma.products.findMany({
      where: {
        isActive: false,
        isValidated: true,
      },
      include: {
        Stamps: {
          select: {
            id: true,
            image: true,
            nameStamp: true,
            active: true
          }
        },
        whoCreated: {
          select: {
            id: true,
            name: true,
          }
        },
        Instructions: {
          select: {
            id: true,
            language: true,
            isActive: true,
            isValidated: true
          }
        },
        ProductsDisabled: true,
      }
    }); 

    return product;
  }
    
  public async find(id: string): Promise<ResponseProduct> {
    const product = await prisma.products.findUnique({
      where: {
        id
      },
      include: {
        Stamps: {
          select: {
            id: true,
            image: true,
            nameStamp: true,
            active: true
          }
        },
        whoCreated: {
          select: {
            id: true,
            name: true,
          }
        },
        Instructions: {
          where: {
            isActive: true,
            isValidated: true
          }
        },
        ProductsDisabled: true,
      }
    }); 

    return product;
  }

  public async accept(idproduct: string, iduser: string): Promise<ResponseProduct> {
    const date = getDateBrazil();
  
    const validateProduct = await prisma.productsValidated.create({
      data: {
        whoValidated: {
          connect: {
            id: iduser
          }
        },
        whatProduct: {
          connect: {
            id: idproduct
          }
        },
        validationDate: date,
        productAccepted: true
      }
    });

    if (validateProduct) {
      const alterProduct = await prisma.products.update({
        where: {
          id: idproduct,
        },
        data: {
          isActive: true,
          isValidated: true
        },
        include: {
          Instructions: {
            select: {
              id: true,
              language: true,
              isActive: true,
              isValidated: true
            }
          },
          whoCreated: {
            select: {
              id: true,
              name: true,
            }
          },
          Stamps: true,
          ProductsDisabled: true,
        }
  
      });

      return alterProduct;
    }

  }

  public async reject(idproduct: string, iduser: string): Promise<ResponseProduct> {
    const date = getDateBrazil();
  
    const validateProduct = await prisma.productsValidated.create({
      data: {
        whoValidated: {
          connect: {
            id: iduser
          }
        },
        whatProduct: {
          connect: {
            id: idproduct
          }
        },
        validationDate: date,
        productAccepted: false
      }
    });

    if (validateProduct) {
      const alterProduct = await prisma.products.update({
        where: {
          id: idproduct,
        },
        data: {
          isActive: false,
          isValidated: true
        },
        include: {
          Instructions: {
            select: {
              id: true,
              language: true,
              isActive: true,
              isValidated: true
            }
          },
          whoCreated: {
            select: {
              id: true,
              name: true,
            }
          },
          Stamps: true,
          ProductsDisabled: true,
        }
  
      });

      return alterProduct;
    }
  }

  public async disable(idproduct: string, iduser: string, reason: string): Promise<ResponseProduct> {

    const disabledProduct = await prisma.products.update({
      where: {
        id: idproduct
      },
      data: {
        isActive: false,
        isValidated: true
      }
    });
  
    if (disabledProduct) {
      const date = getDateBrazil();
      const reasonDisabledProduct = await prisma.productsDisabled.create({
        data: {
          reason: reason,
          whatProduct: {
            connect: {
              id: idproduct
            }
          },
          whoDisabled: {
            connect: {
              id: iduser
            }
          },
          disabledDate: date
        }
      });
    
      if (reasonDisabledProduct) {
        const returnProduct = await prisma.products.findFirst({
          where: {
            id: idproduct
          },
          include: {
            Instructions: {
              select: {
                id: true,
                language: true,
                isActive: true,
                isValidated: true
              }
            },
            whoCreated: {
              select: {
                id: true,
                name: true,
              }
            },
            Stamps: true,
            ProductsDisabled: true,
          }
        });

        return returnProduct;
      }
    
    }
  
  }

  public async restore(idproduct: string): Promise<ResponseProduct> {
    const restoreProduct = await prisma.products.update({
      where: {
        id: idproduct
      },
      data: {
        isActive: false,
        isValidated: false
      }
    });
  
    if (restoreProduct) {
      const returnProduct = await prisma.products.findFirst({
        where: {
          id: idproduct
        },
        include: {
          Instructions: {
            select: {
              id: true,
              language: true,
              isActive: true,
              isValidated: true
            }
          },
          whoCreated: {
            select: {
              id: true,
              name: true,
            }
          },
          Stamps: true,
          ProductsDisabled: true,
        }
      });

      return returnProduct;
    }
  
  
  }

  public async qrcode(idproduct: string): Promise<ResponseProduct> {
    const qrCodeData = `http://label.lolafromrio.com.br/product/${idproduct}`;
    const qrCodeOptions = {
      width: 1000,
      height: 1000,
    };

    try {
      const qrCodeFilePath = `./src/qrcode/${idproduct}.svg`;

      await qrCode.toFile(qrCodeFilePath, qrCodeData, qrCodeOptions);

      console.log('QRCode foi criado para o produto de id:', idproduct)

      const activeProdProduct = await prisma.products.update({
        where: {
          id: idproduct
        },
        data: {
          qrCodeIsActive: true 
        },
        include: {
          Instructions: {
            select: {
              id: true,
              language: true,
              isActive: true,
              isValidated: true
            }
          },
          whoCreated: {
            select: {
              id: true,
              name: true,
            }
          },
          Stamps: true,
          ProductsDisabled: true,
        }
      });

      return activeProdProduct;
    } catch (error) {
      return error;
    }  
  }
}

export {
  ProductRepositorie
};