"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstructionRepository = void 0;
var _database = require("../../database");
var _getDataBrazil = require("../../utils/getDataBrazil");
class InstructionRepository {
  async create(language, whatIAm, modeOfUse, Precaution, idproduct, iduser) {
    const date = (0, _getDataBrazil.getDateBrazil)();
    const instructionData = await _database.prisma.instructions.create({
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
          }
        },
        whoCreated: {
          connect: {
            id: iduser
          }
        },
        creationDate: date
      },
      include: {
        whatProduct: {
          include: {
            Stamps: true
          }
        },
        whoCreated: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });
    return instructionData;
  }
  async copyMany(idproduct, newIdProduct) {
    const date = (0, _getDataBrazil.getDateBrazil)();
    const instructions = await _database.prisma.instructions.findMany({
      where: {
        productId: idproduct
      }
    });
    const NewTreatedInstructionsList = instructions.map(instruction => ({
      ...instruction,
      isActive: false,
      isValidated: false,
      creationDate: date,
      productId: newIdProduct
    }));
    const newInstructionsList = NewTreatedInstructionsList.map(instruction => {
      const {
        id,
        ...rest
      } = instruction;
      return {
        ...rest
      };
    });
    const createManyInstructions = await _database.prisma.instructions.createMany({
      data: newInstructionsList
    });
    if (createManyInstructions) {
      const instructionsProduct = await _database.prisma.instructions.findMany({
        where: {
          productId: idproduct
        },
        include: {
          whatProduct: {
            include: {
              Stamps: true
            }
          },
          whoCreated: {
            select: {
              id: true,
              name: true
            }
          }
        }
      });
      return instructionsProduct;
    }
  }
  async registred() {
    const instructions = await _database.prisma.instructions.findMany({
      where: {
        isActive: true,
        isValidated: true
      },
      include: {
        whatProduct: {
          include: {
            Stamps: true
          }
        },
        whoCreated: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });
    return instructions;
  }
  async validation() {
    const instructions = await _database.prisma.instructions.findMany({
      where: {
        isActive: false,
        isValidated: false
      },
      include: {
        whatProduct: {
          include: {
            Stamps: true
          }
        },
        whoCreated: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });
    return instructions;
  }
  async history() {
    const instructions = await _database.prisma.instructions.findMany({
      where: {
        isActive: false,
        isValidated: true
      },
      include: {
        whatProduct: {
          include: {
            Stamps: true
          }
        },
        whoCreated: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });
    return instructions;
  }
  async accept(idinstruction, iduser) {
    const date = (0, _getDataBrazil.getDateBrazil)();
    const validateInstruction = await _database.prisma.instructionsValidate.create({
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
      const alterInstruction = await _database.prisma.instructions.update({
        where: {
          id: idinstruction
        },
        data: {
          isActive: true,
          isValidated: true
        },
        include: {
          whatProduct: {
            include: {
              Stamps: true
            }
          },
          whoCreated: {
            select: {
              id: true,
              name: true
            }
          }
        }
      });
      return alterInstruction;
    }
  }
  async reject(idinstruction, iduser) {
    const date = (0, _getDataBrazil.getDateBrazil)();
    const validateInstruction = await _database.prisma.instructionsValidate.create({
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
      const alterInstruction = await _database.prisma.instructions.update({
        where: {
          id: idinstruction
        },
        data: {
          isActive: false,
          isValidated: true
        },
        include: {
          whatProduct: {
            include: {
              Stamps: true
            }
          },
          whoCreated: {
            select: {
              id: true,
              name: true
            }
          }
        }
      });
      return alterInstruction;
    }
  }
  async disable(idinstruction, iduser, reason) {
    const date = (0, _getDataBrazil.getDateBrazil)();
    const disabledInstruction = await _database.prisma.instructions.update({
      where: {
        id: idinstruction
      },
      data: {
        isActive: false,
        isValidated: true
      }
    });
    if (disabledInstruction) {
      const reasonDisabledInstruction = await _database.prisma.instructionsDisabled.create({
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
        const returnInstruction = await _database.prisma.instructions.findFirst({
          where: {
            id: idinstruction
          },
          include: {
            whatProduct: {
              include: {
                Stamps: true
              }
            },
            whoCreated: {
              select: {
                id: true,
                name: true
              }
            }
          }
        });
        return returnInstruction;
      }
    }
  }
  async restore(idinstruction) {
    const disabledInstruction = await _database.prisma.instructions.update({
      where: {
        id: idinstruction
      },
      data: {
        isActive: false,
        isValidated: false
      }
    });
    if (disabledInstruction) {
      const returnInstruction = await _database.prisma.instructions.findFirst({
        where: {
          id: idinstruction
        },
        include: {
          whatProduct: {
            include: {
              Stamps: true
            }
          },
          whoCreated: {
            select: {
              id: true,
              name: true
            }
          }
        }
      });
      return returnInstruction;
    }
  }
}
exports.InstructionRepository = InstructionRepository;