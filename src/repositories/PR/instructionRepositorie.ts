import { prisma } from '../../database';

import { getDateBrazil } from '../../utils/getDataBrazil';
import { Stamp } from '../../interfaces/PR/Product/IStamp';
import { IInstructionRepository } from '../../interfaces/PR/IInstructionRepository';

interface User {
  id: string
  name: string
}

interface Product {
  id: string
  sku: string
  version: string
  productName: string
  productLine: string
  productImage: string
  composition: string
  authorId: string
  creationDate: Date
  isActive: boolean
  isValidated: boolean
  qrCodeIsActive: boolean
  Stamps: Stamp[]
}

type ResponseInstruction = {
  id: string
  language: string
  whatIAm: string
  modeOfUse: string
  Precaution: string
  productId: string
  authorId: string
  creationDate: Date
  isActive: boolean
  isValidated: boolean
  whatProduct: Product
  whoCreated: User
}

class InstructionRepository implements IInstructionRepository {

  public async create(
    language: string, 
    whatIAm: string, 
    modeOfUse: string, 
    Precaution: string, 
    idproduct: string, 
    iduser: string
  ): Promise<ResponseInstruction> {
    const date = getDateBrazil();

    const instructionData = await prisma.instructions.create({
      data: {
        language: language,
        modeOfUse: modeOfUse,
        Precaution: Precaution,
        whatIAm: whatIAm,
        isValidated: false,
        isActive: false,
        whatProduct: {
          connect: {
            id: idproduct
          },
        },
        whoCreated: {
          connect: {
            id: iduser
          }
        },
        creationDate: date,
      },
      include: {
        whatProduct: {
          include: {
            Stamps: true,
          }
        },
        whoCreated: {
          select: {
            id: true,
            name: true,
          }
        },
      }
    });

    return instructionData;
  }

  public async copyMany(idproduct: string, newIdProduct: string): Promise<ResponseInstruction[]> {

    const date = getDateBrazil();

    const instructions = await prisma.instructions.findMany({
      where: {
        productId: idproduct
      }
    });

    const NewTreatedInstructionsList = instructions.map((instruction,) => ({
      ...instruction,
      isActive: false,
      isValidated: false,
      creationDate: date,
      productId: newIdProduct
    }));

    const newInstructionsList = NewTreatedInstructionsList.map((instruction) => {
      const { id, ...rest } = instruction;

      return { ...rest };
    });

    const createManyInstructions = await prisma.instructions.createMany({
      data: newInstructionsList
    });

    if (createManyInstructions) {
      const instructionsProduct = await prisma.instructions.findMany({
        where: {
          productId: idproduct
        },
        include: {
          whatProduct: {
            include: {
              Stamps: true,
            }
          },
          whoCreated: {
            select: {
              id: true,
              name: true,
            }
          },
        }
      });

      return instructionsProduct;
    }

  }

  public async registred(): Promise<ResponseInstruction[]> {
    const instructions = await prisma.instructions.findMany({
      where: {
        isActive: true,
        isValidated: true
      },
      include: {
        whatProduct: {
          include: {
            Stamps: true,
          }
        },
        whoCreated: {
          select: {
            id: true,
            name: true,
          }
        },
      }
    });
  
    return instructions;
  }

  public async validation(): Promise<ResponseInstruction[]> {
    const instructions = await prisma.instructions.findMany({
      where: {
        isActive: false,
        isValidated: false
      },
      include: {
        whatProduct: {
          include: {
            Stamps: true,
          }
        },
        whoCreated: {
          select: {
            id: true,
            name: true,
          }
        },
      }
    });
  
    return instructions;
  }

  public async history(): Promise<ResponseInstruction[]> {
    const instructions = await prisma.instructions.findMany({
      where: {
        isActive: false,
        isValidated: true
      },
      include: {
        whatProduct: {
          include: {
            Stamps: true,
          }
        },
        whoCreated: {
          select: {
            id: true,
            name: true,
          }
        },
      }
    });
  
    return instructions;
  }

  public async accept(idinstruction: string, iduser: string): Promise<ResponseInstruction> {
    const date = getDateBrazil();
  
    const validateInstruction = await prisma.instructionsValidate.create({
      data: {
        whoValidated: {
          connect: {
            id: iduser
          }
        },
        whatInstruction: {
          connect: {
            id: idinstruction
          }
        },
        validationDate: date,
        instructionAccept: true
      }
    });

    if (validateInstruction) {

      const alterInstruction = await prisma.instructions.update({
        where: {
          id: idinstruction,
        },
        data: {
          isActive: true,
          isValidated: true
        },
        include: {
          whatProduct: {
            include: {
              Stamps: true,
            }
          },
          whoCreated: {
            select: {
              id: true,
              name: true,
            }
          },
        }
      });

      return alterInstruction;
    }

  }

  public async reject(idinstruction: string, iduser: string): Promise<ResponseInstruction> {
    const date = getDateBrazil();
  
    const validateInstruction = await prisma.instructionsValidate.create({
      data: {
        whoValidated: {
          connect: {
            id: iduser
          }
        },
        whatInstruction: {
          connect: {
            id: idinstruction
          }
        },
        validationDate: date,
        instructionAccept: false
      }
    });
    if (validateInstruction) {

      const alterInstruction = await prisma.instructions.update({
        where: {
          id: idinstruction,
        },
        data: {
          isActive: false,
          isValidated: true
        },
        include: {
          whatProduct: {
            include: {
              Stamps: true,
            }
          },
          whoCreated: {
            select: {
              id: true,
              name: true,
            }
          },
        }
      });

      return alterInstruction;
    }

  }

  public async disable(idinstruction: string, iduser: string, reason: string): Promise<ResponseInstruction> {
    const date = getDateBrazil();
    const disabledInstruction = await prisma.instructions.update({
      where: {
        id: idinstruction
      },
      data: {
        isActive: false,
        isValidated: true
      }
    });
  
    if (disabledInstruction) {
      const reasonDisabledInstruction = await prisma.instructionsDisabled.create({
        data: {
          reason: reason,
          whatInstruction: {
            connect: {
              id: idinstruction
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

      if (reasonDisabledInstruction) {
        const returnInstruction = await prisma.instructions.findFirst({
          where: {
            id: idinstruction
          },
          include: {
            whatProduct: {
              include: {
                Stamps: true,
              }
            },
            whoCreated: {
              select: {
                id: true,
                name: true,
              }
            },
          }
        });

        return returnInstruction;
      }
    }
  
  }

  public async restore(idinstruction: string): Promise<ResponseInstruction> {
    const disabledInstruction = await prisma.instructions.update({
      where: {
        id: idinstruction
      },
      data: {
        isActive: false,
        isValidated: false
      }
    });
  
    if (disabledInstruction) {
      const returnInstruction = await prisma.instructions.findFirst({
        where: {
          id: idinstruction
        },
        include: {
          whatProduct: {
            include: {
              Stamps: true,
            }
          },
          whoCreated: {
            select: {
              id: true,
              name: true,
            }
          },
        }
      });

      return returnInstruction;
    }
  }
}

export {
  InstructionRepository
};