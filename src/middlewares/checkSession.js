


class CheckSession {
  static async handle(req, res, next) {
    if (!req.session || !req.session.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
  }
}