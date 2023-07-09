export default function handler(req, res) {
  const { password } = req.body;
  const sitePassword = process.env.SITE_PASSWORD;
  // Perform password verification here
  if (password === sitePassword) {
    res.redirect(307, "/");
  } else {
    res.status(401).send("Invalid password");
  }
}
