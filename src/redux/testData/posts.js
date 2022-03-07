const data = [
  {
    _id: 123,
    authorId: '123456789',
    releaseTime: Date.now(),
    title: 'tytuł wcześniejszego ogłoszenia',
    content: 'jakiś tam tekst',
  },
  {
    _id: 345,
    authorId: '123456789',
    releaseTime: Date.now() + 1000,
    title: 'tytuł późniejszego ogłoszenia',
    content:'jakiś jeszcze inny tekst',
  },
  {
    _id: 567,
    authorId: '1234567',
    releaseTime: Date.now() + 2000,
    title: 'tytuł jeszcze późniejszego ogłoszenia',
    content:'Kto wymyśli jakiś tekst???',
  },
];

export default data;
