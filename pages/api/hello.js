// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  res.send(req.body.words);
  // res.statusCode = 200
  // res.json({ name: 'John Doe' })
}
