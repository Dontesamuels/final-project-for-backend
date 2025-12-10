// middleware/authorize.js
// usage: authorize('admin') or authorize('admin','user')
module.exports = function authorize(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'Not authenticated' });

    if (allowedRoles.length === 0) return next(); // no roles specified = allow authenticated users

    if (allowedRoles.includes(req.user.role)) return next();

    return res.status(403).json({ message: 'Forbidden - insufficient permissions' });
  };
};
