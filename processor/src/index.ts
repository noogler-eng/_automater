import prisma from "./db/prisma";

const main = async () => {
  while (1) {
    const pendingRows = await prisma.zapRunOutOfBox.findMany({
      where: {},
      take: 10,
    });

    pendingRows.forEach((item, key)=>{
        
    })
  }
};
