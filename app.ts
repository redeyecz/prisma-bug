import {PrismaClient} from '@prisma/client'
import express from 'express';

const app = express()
const port = 3000

const prisma = new PrismaClient({
  log: ['query', 'info', `warn`, `error`],
})

// @ts-ignore // Typescript definition invalid? query not recognized as a valid string
prisma.$on('query', (e) => {
  console.log(e);
});

app.get('/', async (req: any, res: any) => {
  const all = await prisma.account.findMany({});
  // this produces 3 records just fine
  const seeminglyOk = await prisma.account.findMany({
    take: 3,
    skip: 1,
    cursor: {
      id: 9 //Test3
    },
    orderBy: {
      id: 'desc' //the only change is the order by BigInt column
    }
  });
  // this should return at least 3 records, but results in an empty array. Logged query from prisma.$on('query'...)
  // shows a query that returns correct records :shrugs: :(
  const bugged = await prisma.account.findMany({
    take: 3,
    skip: 1,
    cursor: {
      id: 9 //Test3
    },
    orderBy: {
      externalId: 'desc' // text column
    }
  });

  res.send(`
    Console logs queries from prisma
    
    <br><br>
    All:<br>
        ${all.map(v => toJson(v) + '\n<br>')}
      
    <br><br>  
    For some reason - take 3, skip 1, cursor {id:9}, order by id: 'desc' works:<br>
        ${seeminglyOk.map(v => toJson(v) + '\n<br>')}
        
    
    <br><br>  
    But - take 3, skip 1, cursor {id:9}, order by externalId: 'desc' does not:<br>
        ${bugged.map(v => toJson(v) + '\n<br>')}
        
    <br><br>    
    Expected:<br>
    {"id":8,"name":"Test2","externalId":"2Two","type":"GROUP1","dateInsert":"2021-03-24T08:50:36.922Z"}<br>
    ,{"id":6,"name":"Test1","externalId":"1One","type":"GROUP1","dateInsert":"2021-03-24T08:49:43.804Z"}<br>
    ,{"id":1,"name":"Test0","externalId":"0Zero","type":"GROUP1","dateInsert":"2021-03-23T09:39:01.357Z"}<br>
    
    `)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


// hack for serializing bigint
function toJson(data: any) {
  return JSON.stringify(data, (_, v) => typeof v === 'bigint' ? `${v}n` : v)
    .replace(/"(-?\d+)n"/g, (_, a) => a);
}
