const api = (app) => {
  app.get('/index', function(req, res) {
    res.json({ response: 'Working fine ;)' });
  });
};

export default api;