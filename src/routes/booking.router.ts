import express from 'express';
const router = express.Router();

router.get('/', (_req, res) => {
  res.json([
    {
      name: 'uno',
      roomId: '1',
    },
  ]);
});

export default router;
