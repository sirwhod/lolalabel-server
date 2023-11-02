"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProductRepositorie = void 0;
var _instructionRepositorie = require("./instructionRepositorie");
var _qrcode = _interopRequireDefault(require("qrcode"));
var _getDataBrazil = require("../../utils/getDataBrazil");
var _database = require("../../database");
var _copyManyInstructionService = require("../../service/PR/Instructions/copyManyInstructionService");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class ProductRepositorie {
  async create(idUser, sku, version, productName, productLine, productImage, composition, compositionINCI, Stamps) {
    const date = (0, _getDataBrazil.getDateBrazil)();
    const newProduct = await _database.prisma.products.create({
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
    const newStampsList = Stamps.map(stamp => ({
      ...stamp,
      productId: newProduct.id
    }));
    await _database.prisma.stamps.createMany({
      data: newStampsList
    });
    return newProduct;
  }
  async copy(iduser, idProduct, newVersion, composition, compositionINCI, copyInstruction) {
    const date = (0, _getDataBrazil.getDateBrazil)();
    const productCopied = await _database.prisma.products.findUnique({
      where: {
        id: idProduct
      },
      include: {
        Stamps: true,
        Instructions: true
      }
    });
    if (productCopied !== null) {
      const newProduct = await _database.prisma.products.create({
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
      const NewTreatedStampList = productCopied.Stamps.map(stamp => ({
        ...stamp,
        productId: newProduct.id
      }));
      const NewListStamp = NewTreatedStampList.map(stamp => {
        const {
          id,
          ...rest
        } = stamp;
        return {
          ...rest
        };
      });
      await _database.prisma.stamps.createMany({
        data: NewListStamp
      });
      if (copyInstruction) {
        const copyInstruction = new _copyManyInstructionService.CopyManyInstructionService(new _instructionRepositorie.InstructionRepository());
        await copyInstruction.execute(productCopied.id, newProduct.id);
      }
      const product = await _database.prisma.products.findUnique({
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
              name: true
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
          ProductsDisabled: true
        }
      });
      return product;
    }
  }
  async alter(idproduct, productImage, Stamps) {
    const updateStamps = Stamps.map(async stamp => {
      await _database.prisma.stamps.update({
        data: {
          active: stamp.active
        },
        where: {
          id: stamp.id
        }
      });
    });
    if (updateStamps) {
      const newProductImageAltered = await _database.prisma.products.update({
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
              name: true
            }
          },
          Stamps: true
        }
      });
      const returnProductAltered = await _database.prisma.products.findFirst({
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
              name: true
            }
          },
          Stamps: true,
          ProductsDisabled: true
        }
      });
      return returnProductAltered;
    }
  }
  async registred() {
    const product = await _database.prisma.products.findMany({
      where: {
        isActive: true,
        isValidated: true
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
            name: true
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
        ProductsDisabled: true
      }
    });
    return product;
  }
  async validation() {
    const product = await _database.prisma.products.findMany({
      where: {
        isActive: false,
        isValidated: false
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
            name: true
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
        ProductsDisabled: true
      }
    });
    return product;
  }
  async history() {
    const product = await _database.prisma.products.findMany({
      where: {
        isActive: false,
        isValidated: true
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
            name: true
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
        ProductsDisabled: true
      }
    });
    return product;
  }
  async find(id) {
    const product = await _database.prisma.products.findUnique({
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
            name: true
          }
        },
        Instructions: {
          where: {
            isActive: true,
            isValidated: true
          }
        },
        ProductsDisabled: true
      }
    });
    return product;
  }
  async accept(idproduct, iduser) {
    const date = (0, _getDataBrazil.getDateBrazil)();
    const validateProduct = await _database.prisma.productsValidated.create({
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
      const alterProduct = await _database.prisma.products.update({
        where: {
          id: idproduct
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
              name: true
            }
          },
          Stamps: true,
          ProductsDisabled: true
        }
      });
      return alterProduct;
    }
  }
  async reject(idproduct, iduser) {
    const date = (0, _getDataBrazil.getDateBrazil)();
    const validateProduct = await _database.prisma.productsValidated.create({
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
      const alterProduct = await _database.prisma.products.update({
        where: {
          id: idproduct
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
              name: true
            }
          },
          Stamps: true,
          ProductsDisabled: true
        }
      });
      return alterProduct;
    }
  }
  async disable(idproduct, iduser, reason) {
    const disabledProduct = await _database.prisma.products.update({
      where: {
        id: idproduct
      },
      data: {
        isActive: false,
        isValidated: true
      }
    });
    if (disabledProduct) {
      const date = (0, _getDataBrazil.getDateBrazil)();
      const reasonDisabledProduct = await _database.prisma.productsDisabled.create({
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
        const returnProduct = await _database.prisma.products.findFirst({
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
                name: true
              }
            },
            Stamps: true,
            ProductsDisabled: true
          }
        });
        return returnProduct;
      }
    }
  }
  async restore(idproduct) {
    const restoreProduct = await _database.prisma.products.update({
      where: {
        id: idproduct
      },
      data: {
        isActive: false,
        isValidated: false
      }
    });
    if (restoreProduct) {
      const returnProduct = await _database.prisma.products.findFirst({
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
              name: true
            }
          },
          Stamps: true,
          ProductsDisabled: true
        }
      });
      return returnProduct;
    }
  }
  async qrcode(idproduct) {
    const qrCodeData = `http://label.lolafromrio.com.br/product/${idproduct}`;
    const qrCodeOptions = {
      width: 1000,
      height: 1000
    };
    try {
      const qrCodeFilePath = `./src/qrcode/${idproduct}.svg`;
      await _qrcode.default.toFile(qrCodeFilePath, qrCodeData, qrCodeOptions);
      console.log('QRCode foi criado para o produto de id:', idproduct);
      const activeProdProduct = await _database.prisma.products.update({
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
              name: true
            }
          },
          Stamps: true,
          ProductsDisabled: true
        }
      });
      return activeProdProduct;
    } catch (error) {
      return error;
    }
  }
}
exports.ProductRepositorie = ProductRepositorie;