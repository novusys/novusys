export default (req:any, res:any) => {
    res.statusCode = 200
    res.json({ name: 'John Doe' })
  }